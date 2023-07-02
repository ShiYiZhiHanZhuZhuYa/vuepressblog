import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from '@vuepress/plugin-search'
import { getDirname, path } from "@vuepress/utils";

export default defineUserConfig({
  base: "/",  
  lang: "zh-CN",
  title: "AlphaBlog",
  description: "AlphaBlog 是为所有人提供的学习网站",
  head: [
    // 导入相应链接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap",
        rel: "stylesheet",
      },
    ],

    // 导入相应链接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  theme,
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});