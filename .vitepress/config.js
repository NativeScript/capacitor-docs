module.exports = {
  lang: "en-US",
  title: "NativeScript Capacitor",
  description: "NativeScript for Capacitor",

  head: [
    ['link', { rel: 'stylesheet', href:'styles.css' }]
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
        
        { text: "custom-native-api.d.ts", link: "/custom-native-api" },
        { text: "Production Tips", link: "/production-tips" },
      ],
    },
    {
      text: "Solutions",
      children: [
        { text: "Capacitor Proposals", link: "/capacitor-proposals" },
        { text: "Brightness - #77", link: "/solution-77" },
        { text: "Power Mode - #79", link: "/solution-79" },
      ],
    },
  ];
}
