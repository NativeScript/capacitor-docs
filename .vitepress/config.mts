import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  lang: 'en-US',
  title: 'NativeScript Capacitor',
  description: 'NativeScript for Capacitor',

  cleanUrls: true,
  lastUpdated: true,
  // the site's styling is light-designed (matching docs.nativescript.org)
  appearance: false,

  head: [
    ['link', { rel: 'stylesheet', href: '/styles.css' }],

    // SEO
    ['meta', { property: 'og:image', content: 'https://capacitor.nativescript.org/assets/images/og_banner.png' }],
    ['meta', { name: 'og:title', content: 'NativeScript for Capacitor' }],
    ['meta', { name: 'og:url', content: 'https://capacitor.nativescript.org/' }],
    ['meta', { name: 'og:site_name', content: 'capacitor.nativescript.org' }],

    // SEO:twitter
    ['meta', { property: 'twitter:account_id', content: '44608081' }],
    ['meta', { name: 'twitter:title', content: 'NativeScript for Capacitor' }],
    ['meta', { name: 'twitter:url', content: 'https://capacitor.nativescript.org/' }],
    ['meta', { name: 'twitter:site', content: '@nativescript' }],
    ['meta', { name: 'twitter:creator', content: '@nativescript' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://capacitor.nativescript.org/assets/images/og_banner.png' }],
  ],

  vite: {
    plugins: [
      llmstxt({
        domain: 'https://capacitor.nativescript.org',
        title: 'NativeScript for Capacitor',
        description:
          'Full native platform API access for Capacitor apps, powered by the NativeScript runtime. Write iOS and Android native code in TypeScript next to your web code.',
        excludeIndexPage: false,
      }),
    ],
  },

  themeConfig: {
    // the logo image carries the full wordmark; don't repeat the title as text
    logo: '/assets/images/nativescript-for-capacitor.png',
    siteTitle: false,

    editLink: {
      pattern: 'https://github.com/NativeScript/capacitor-docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/NativeScript/capacitor' }],

    nav: [
      {
        text: 'v8.0.0',
        link: '#',
        activeMatch: '^nomatch$',
      },
      {
        text: 'Introduction',
        link: '/introduction',
        activeMatch: '^/introduction',
      },
      {
        text: 'Setup',
        link: '/installation',
        activeMatch: '^/(installation|getting-started)',
      },
      {
        text: 'Docs',
        link: '/explaining-the-examples',
        activeMatch: '^/(?!installation|introduction|getting-started|capacitor-proposals|solution-)',
      },
      {
        text: 'Solutions',
        link: '/capacitor-proposals',
        activeMatch: '^/(capacitor-proposals|solution-)',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        link: '/introduction',
      },
      {
        text: 'Setup',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Docs',
        items: [
          { text: 'Examples', link: '/explaining-the-examples' },
          {
            text: 'Development Workflow',
            items: [{ text: 'Iterating on native code', link: '/using-dev-nativescript' }],
          },
          {
            text: 'Building',
            items: [
              { text: 'Building with nscap', link: '/using-build-mobile' },
              { text: 'Production Tips', link: '/production-tips' },
            ],
          },
          {
            text: '@nativescript/capacitor',
            items: [{ text: "What is 'native'?", link: '/what-is-native' }],
          },
          {
            text: '@nativescript/capacitor/bridge',
            items: [
              { text: "What is the 'bridge'?", link: '/what-is-the-bridge' },
              { text: 'API Reference', link: '/bridge-api' },
            ],
          },
          {
            text: 'Creating your own helpers',
            items: [
              { text: 'What is native-custom.d.ts?', link: '/native-custom' },
              { text: 'Custom helpers vs direct native?', link: '/custom-v-direct' },
            ],
          },
          {
            text: 'Event communication',
            items: [{ text: 'Notify and listen to events', link: '/event-communication' }],
          },
          {
            text: 'AI & agents',
            items: [{ text: 'MCP server & llms.txt', link: '/ai' }],
          },
          {
            text: 'Updating',
            items: [
              { text: 'Migrating v5 to v8', link: '/migration-guide-v5-v8' },
              { text: 'Migrating v4 to v5', link: '/migration-guide-v4-v5' },
              { text: 'Migrating v2 to v4', link: '/migration-guide-v2-v4' },
            ],
          },
        ],
      },
      {
        text: 'Solutions',
        items: [
          { text: 'Capacitor Proposals', link: '/capacitor-proposals' },
          { text: 'Brightness - #77', link: '/solution-77' },
          { text: 'Power Mode - #79', link: '/solution-79' },
          { text: 'Zip - #145', link: '/solution-145' },
        ],
      },
      {
        text: 'Uninstall',
        items: [{ text: 'npm uninstall', link: '/uninstall' }],
      },
    ],
  },
})
