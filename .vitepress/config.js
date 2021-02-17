module.exports = {
  lang: "en-US",
  title: "NativeScript Capacitor",
  description: "NativeScript for Capacitor",

  head: [
    ['link', { rel: 'stylesheet', href: 'styles.css' }],

    // SEO
    ['meta', { property: 'og:image', content: "https://capacitor.nativescript.org/assets/images/og_banner.png" }],
    ['meta', { name: 'og:title', content: "NativeScript for Capacitor" }],
    ['meta', { name: 'og:url', content: "https://capacitor.nativescript.org/" }],
    ['meta', { name: 'og:site_name', content: "capacitor.nativescript.org" }],

    // SEO:twitter
    ['meta', { property: 'twitter:account_id', content: "44608081" }],
    ['meta', { name: 'twitter:title', content: "NativeScript for Capacitor" }],
    ['meta', { name: 'twitter:url', content: "https://capacitor.nativescript.org/" }],
    ['meta', { name: 'twitter:site', content: "@nativescript" }],
    ['meta', { name: 'twitter:creator', content: "@nativescript" }],
    ['meta', { name: 'twitter:card', content: "summary_large_image" }],
    ['meta', { name: 'twitter:image', content: "https://capacitor.nativescript.org/assets/images/og_banner.png" }],
  ],

  themeConfig: {
    repo: "NativeScript/capacitor-docs",
    docsDir: ".",
    logo: "assets/images/nativescript-for-capacitor.png",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    //   algolia: {
    //     apiKey: 'xxx',
    //     indexName: 'xxx'
    //   },

    nav: [
      {
        text: "v1.0.0-beta.0",
        link: "#",
        activeMatch: '^nomatch$'
      },
      {
        text: "Introduction",
        link: "/introduction",
        activeMatch: "^/introduction",
      },
      {
        text: "Setup",
        link: "/installation",
        activeMatch: "^/(installation|getting-started)",
      },
      {
        text: "Docs",
        link: "/explaining-the-examples",
        activeMatch: "^/(?!installation|introduction|getting-started|capacitor-proposals|solution-)",
      },
      {
        text: "Solutions",
        link: "/capacitor-proposals",
        activeMatch: "^/(capacitor-proposals|solution-)",
      },
    ],

    sidebar: {
      "/": getSidebar(),
    },
  },
};

function getSidebar() {
  return [
    {
      text: "Introduction",
      link: "/introduction"
    },
    {
      text: "Setup",
      children: [
        { text: "Installation", link: "/installation" },
        { text: "Getting Started", link: "/getting-started" },
      ],
    },
    {
      text: "Docs",
      children: [
        { text: "Examples", link: "/explaining-the-examples" },
        { 
          text: "@nativescript/capacitor", 
          children: [
            { text: "What is 'native'?", link: "/what-is-native" },
          ]
        },
        { 
          text: "@nativescript/capacitor/bridge", 
          children: [
            { text: "What is the 'bridge'?", link: "/what-is-the-bridge" },
            { text: "API Reference", link: "/bridge-api" },
          ]
        },
        { 
          text: "Creating your own helpers", 
          children: [
            { text: "What is native-custom.d.ts?", link: "/native-custom" },
            { text: "Custom helpers vs direct native?", link: "/custom-v-direct" },
          ]
        },
        { text: "Production Tips", link: "/production-tips" },
      ],
    },
    {
      text: "Solutions",
      children: [
        { text: "Capacitor Proposals", link: "/capacitor-proposals" },
        { text: "Swag Contest!", link: "/swag-contest" },
        { text: "Brightness - #77", link: "/solution-77" },
        { text: "Power Mode - #79", link: "/solution-79" },
      ],
    },
  ];
}
