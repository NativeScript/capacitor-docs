module.exports = {
  lang: "en-US",
  title: "NativeScript for Capacitor",
  description: "NativeScript for Capacitor docs",

  themeConfig: {
    repo: "NativeScript/capacitor-docs",
    docsDir: ".",

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
        activeMatch: "^/",
      },
      {
        text: "Docs",
        link: "/installation",
        activeMatch: "^/",
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
  ];
}
