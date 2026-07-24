/**
 * NativeScript for Capacitor docs MCP server — a stateless Model Context
 * Protocol endpoint served as a Netlify Function at
 * https://capacitor.nativescript.org/mcp
 *
 * Implements the MCP Streamable HTTP transport (JSON responses, no SSE —
 * every tool call is a simple request/response, so streaming is unnecessary).
 *
 * Ported from the docs.nativescript.org Cloudflare Pages Function; search is
 * self-contained (scored full-text over llms-full.txt) since this site has no
 * external search index — the docs are small enough that this is instant.
 *
 * Tools:
 * - search_docs   full-text search over the docs (llms-full.txt)
 * - get_page      fetch any docs page as raw markdown (the ".md twin")
 * - get_sitemap   the llms.txt index of all documentation pages
 */

export const config = { path: '/mcp' }

const SERVER_INFO = {
  name: 'nativescript-capacitor-docs',
  title: 'NativeScript for Capacitor Docs',
  version: '1.0.0',
}

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']

const TOOLS = [
  {
    name: 'search_docs',
    title: 'Search NativeScript for Capacitor docs',
    description:
      'Full-text search across the @nativescript/capacitor documentation (installation, the native proxy, the bridge API, nscap CLI, migration guides). Returns matching pages with snippets. Fetch a result with get_page for full content.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query, e.g. "custom metadata" or "openNativeModalView"',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_page',
    title: 'Get docs page as markdown',
    description:
      'Fetch a documentation page as raw markdown. Pass the page path, e.g. "/installation" or "/bridge-api" (with or without a .md suffix).',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Docs page path, e.g. "/installation" or "/migration-guide-v5-v8"',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'get_sitemap',
    title: 'Get docs sitemap (llms.txt)',
    description:
      'Returns the llms.txt index of the docs: every page with its title and URL, grouped by section. Useful for orientation before searching or fetching pages.',
    inputSchema: { type: 'object', properties: {} },
  },
]

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Expose-Headers': 'Mcp-Session-Id',
    },
  })
}

function rpcResult(id: unknown, result: unknown) {
  return { jsonrpc: '2.0', id, result }
}

function rpcError(id: unknown, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } }
}

function textContent(text: string, isError = false) {
  return { content: [{ type: 'text', text }], isError }
}

function fetchAsset(req: Request, path: string): Promise<Response> {
  return fetch(new URL(path, req.url).toString())
}

interface DocSection {
  url: string
  title: string
  content: string
}

// llms-full.txt layout (vitepress-plugin-llms):
//   ---
//   url: 'https://capacitor.nativescript.org/<page>.md'
//   ---
//   <markdown…>
function parseSections(fullText: string): DocSection[] {
  const sections: DocSection[] = []
  const parts = fullText.split(/^---\s*\nurl:\s*'([^']+)'\s*\n---\s*$/m)
  // parts = [preamble, url1, content1, url2, content2, …]
  for (let i = 1; i < parts.length - 1; i += 2) {
    const url = parts[i].trim()
    const content = parts[i + 1].trim()
    const heading = content.split('\n').find((line) => line.startsWith('# '))
    sections.push({
      url,
      title: heading ? heading.replace(/^#\s*/, '') : url,
      content,
    })
  }
  return sections
}

async function searchDocs(req: Request, query: string) {
  const res = await fetchAsset(req, '/llms-full.txt')
  if (!res.ok) {
    return textContent('Search index unavailable. Try get_sitemap instead.', true)
  }
  const sections = parseSections(await res.text())
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1)
  if (!terms.length) {
    return textContent('Query too short.', true)
  }

  const scored = sections
    .map((section) => {
      const haystack = section.content.toLowerCase()
      let score = 0
      for (const term of terms) {
        let idx = -1
        while ((idx = haystack.indexOf(term, idx + 1)) !== -1) score++
        if (section.title.toLowerCase().includes(term)) score += 5
      }
      // snippet: first line containing any term
      const line = section.content
        .split('\n')
        .find((l) => terms.some((t) => l.toLowerCase().includes(t)))
      return { section, score, snippet: line?.trim().slice(0, 200) }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  if (!scored.length) {
    return textContent(`No results for "${query}". Try a broader query or get_sitemap.`)
  }
  const lines = scored.map(
    (s) => `- ${s.section.title}\n  ${s.section.url}${s.snippet ? `\n  ${s.snippet}` : ''}`
  )
  return textContent(`Results for "${query}":\n\n${lines.join('\n')}`)
}

async function getPage(req: Request, path: string) {
  let clean = path.trim()
  clean = clean.replace(/^https?:\/\/[^/]+/, '')
  clean = clean.split(/[?#]/)[0]
  if (!clean.startsWith('/')) clean = '/' + clean
  if (clean.includes('..')) {
    return textContent('Invalid path.', true)
  }
  if (!clean.endsWith('.md')) {
    clean = clean.replace(/\/$/, '') || '/index'
    clean += '.md'
  }

  const res = await fetchAsset(req, clean)
  if (!res.ok) {
    return textContent(
      `Page not found: ${clean}. Use search_docs or get_sitemap to find valid paths.`,
      true
    )
  }
  return textContent(await res.text())
}

async function getSitemap(req: Request) {
  const res = await fetchAsset(req, '/llms.txt')
  if (!res.ok) {
    return textContent('Sitemap unavailable.', true)
  }
  return textContent(await res.text())
}

async function handleMessage(req: Request, message: any) {
  const { id, method, params } = message

  switch (method) {
    case 'initialize': {
      const requested = params?.protocolVersion
      const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
        ? requested
        : SUPPORTED_PROTOCOL_VERSIONS[1]
      return rpcResult(id, {
        protocolVersion,
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
        instructions:
          'NativeScript for Capacitor documentation server. Use search_docs to find guides, get_page to read any page as markdown, and get_sitemap for a full index.',
      })
    }
    case 'ping':
      return rpcResult(id, {})
    case 'tools/list':
      return rpcResult(id, { tools: TOOLS })
    case 'tools/call': {
      const name = params?.name
      const args = params?.arguments ?? {}
      try {
        switch (name) {
          case 'search_docs':
            return rpcResult(id, await searchDocs(req, String(args.query ?? '')))
          case 'get_page':
            return rpcResult(id, await getPage(req, String(args.path ?? '')))
          case 'get_sitemap':
            return rpcResult(id, await getSitemap(req))
          default:
            return rpcError(id, -32602, `Unknown tool: ${name}`)
        }
      } catch (err: any) {
        return rpcResult(id, textContent(`Tool error: ${err?.message ?? err}`, true))
      }
    }
    default:
      return rpcError(id, -32601, `Method not found: ${method}`)
  }
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    })
  }

  // Stateless server: no SSE stream to resume, no session to delete
  if (req.method === 'GET') {
    return jsonResponse(
      {
        name: SERVER_INFO.name,
        description:
          'NativeScript for Capacitor docs MCP server. Connect with an MCP client using the Streamable HTTP transport at this URL.',
        docs: 'https://capacitor.nativescript.org/ai',
      },
      405
    )
  }
  if (req.method === 'DELETE') {
    return new Response(null, { status: 204 })
  }
  if (req.method !== 'POST') {
    return jsonResponse(rpcError(null, -32600, 'Method not allowed'), 405)
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return jsonResponse(rpcError(null, -32700, 'Parse error'), 400)
  }

  const messages = Array.isArray(body) ? body : [body]

  // Notifications/responses only → acknowledge with 202, no body
  const requests = messages.filter((m) => m && m.method && m.id !== undefined)
  if (!requests.length) {
    return new Response(null, {
      status: 202,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  }

  const responses = await Promise.all(requests.map((m) => handleMessage(req, m)))
  return jsonResponse(Array.isArray(body) ? responses : responses[0])
}
