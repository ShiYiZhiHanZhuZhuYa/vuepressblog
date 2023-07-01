import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "学习",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "八年级",
        icon: "lightbulb",
        prefix: "八年级/",
        children: ["8B"],
      },
      {
        text: "九年级",
        icon: "lightbulb",
        prefix: "九年级/",
        children: ["9A", "9B"],
      },
    ],
  },
]);
