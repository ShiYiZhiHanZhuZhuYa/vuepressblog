import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",  
  lang: "zh-CN",
  title: "AlphaBlog",
  description: "AlphaBlog 是为所有人提供的学习网站",
  
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
