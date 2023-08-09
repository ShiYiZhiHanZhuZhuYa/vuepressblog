import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Alpha Blog",
  description: "为所有人服务的学习网站",
  theme: recoTheme({
    autoSetSeries: true,
    colormode: "dark",
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "SmallPigPig",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      '/docs/document/': [
          {
              text: '八年级',
              children: ['/docs/document/八年级/8A.html', '/docs/document/八年级/8B.html']
          },
          {
              text: "九年级",
              children: ['/docs/document/九年级/9A.html', '/docs/document/九年级/9B.html']
          }
      ],

      '/docs/about/': [
        {
          text: "关于文档",
          children: ['/docs/about/关于文档/关于网站.html', '/docs/about/关于文档/关于作者.html']
        },
        {
          text: "文档优势",
          children: ['/docs/about/文档优势/标准的语法.html', '/docs/about/文档优势/简洁的代码.html', '/docs/about/文档优势/清晰的目标.html', '/docs/about/文档优势/整齐的分类.html']
        }
      ]
    },
    navbar: [
      {
        text: '文档',
        icon: 'Document',
        children: [
          {
            text: '八年级',
            children: [
              { text: '八年级上册', link: '/docs/document/八年级/8A.md' },
              { text: '八年级下册', link: '/docs/document/八年级/8B.md' },
            ],
          },
          {
            text: '九年级',
            children: [
              { text: '九年级上册', link: '/docs/document/九年级/9A.md' },
              { text: '九年级下册', link: '/docs/document/九年级/9B.md' },
            ],
          },
        ],
      },

      {
        text: '关于',
        icon: 'Account',
        children: [
          {
            text: '关于文档',
            children: [
              { text: '关于网站', link: '/docs/about/关于文档/关于网站.md' },
              { text: '关于作者', link: '/docs/about/关于文档/关于作者.md' },
            ],
          },
          {
            text: "文档优势",
            children: [
              { text: '标准的语法', link: '/docs/about/文档优势/标准的语法.md' },
              { text: '简洁的代码', link: '/docs/about/文档优势/简洁的代码.md' },
              { text: '清晰的目标', link: '/docs/about/文档优势/清晰的目标.md' },
              { text: '整齐的分类', link: '/docs/about/文档优势/整齐的分类.md' },
            ]
          }
        ]
      },
    ],

//
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
