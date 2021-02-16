module.exports = {
  lang: "en-US",
  title: " ",
  description: "NativeScript for Capacitor docs",

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
        text: "Introduction",
        link: "/introduction",
        activeMatch: "^/introduction",
      },
      {
        text: "Docs",
        link: "/installation",
        activeMatch: "^/installation",
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
      text: "Docs",
      children: [
        { text: "Installation", link: "/installation" },
        { text: "Getting Started", link: "/getting-started" },
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
