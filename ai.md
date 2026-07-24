# AI & agents

These docs are built for AI tools as much as for people. Three machine-friendly surfaces are published alongside the site:

## llms.txt

- [`/llms.txt`](https://capacitor.nativescript.org/llms.txt) — an index of every documentation page with titles and links, following the [llms.txt convention](https://llmstxt.org).
- [`/llms-full.txt`](https://capacitor.nativescript.org/llms-full.txt) — the entire documentation in a single markdown file, ideal for dropping into a model's context.

## Markdown twins

Every page is also published as raw markdown at the same path with a `.md` suffix — for example [`/installation.md`](https://capacitor.nativescript.org/installation.md). Point an agent at any docs URL and swap `.html` (or no extension) for `.md` to get clean markdown.

## MCP server

A [Model Context Protocol](https://modelcontextprotocol.io) endpoint is available at:

```
https://capacitor.nativescript.org/mcp
```

It speaks the MCP Streamable HTTP transport and exposes three tools:

| Tool | What it does |
|---|---|
| `search_docs` | Full-text search across the documentation, returns matching pages with snippets |
| `get_page` | Fetch any docs page as raw markdown |
| `get_sitemap` | The `llms.txt` index, for orientation |

### Connect from Claude Code

```bash
claude mcp add nativescript-capacitor --transport http https://capacitor.nativescript.org/mcp
```

### Connect from other MCP clients

Use the Streamable HTTP transport with the URL above — the server is stateless (no sessions, no SSE), so any spec-compliant client works.
