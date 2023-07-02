import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "学习文档",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "八年级",
        prefix: "八年级/",
        children: ["8B"],
      },
      {
        text: "九年级",
        prefix: "九年级/",
        children: ["9A", "9B"],
      },
    ],
  },

  {
    text: "关于博客",
    icon: "list",
    prefix: "/about/",
    children: [
      {
        text: "关于文档",
        prefix: "关于文档/",
        children: ["关于作者", "关于网站"]
      },
      {
        text: "了解更多",
        prefix: "我们的优势/",
        children: ["标准的语法", "简洁的代码", "清晰的目标", "整齐的分类"]
      }

    ]
  }
  
]);
