module.exports = {
  content: ["./.vitepress/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      keyframes: {
        "move-bg": {
          to: {
            backgroundPosition: "400% 0",
          },
        },
      },
      animation: {
        "move-bg": "move-bg 20s infinite linear",
      },
    },
  },
  plugins: [],
  options: {
    safelist: ['html', 'body'],
  },
  corePlugins: {
    preflight: false
  }
};
