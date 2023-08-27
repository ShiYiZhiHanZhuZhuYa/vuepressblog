import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { componentsPlugin } from "vuepress-plugin-components";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

export default defineUserConfig({
  title: "Alpha Blog",
  description: "为所有人服务的学习网站",
  head:[
    ["link", {rel: "icon", href: "/hero.svg"}]
  ],
  plugins:[
    mdEnhancePlugin(
      {
        mermaid: true,
        card: true,
        align: true,
      }
    ),
    componentsPlugin(
      {
        components: ["Replit"]
      }),
    sitemapPlugin({
        // 配置选项
        hostname: "https://alphaalist.xyz"
      }),
  ],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/hero.svg",
    author: "SmallPigPig",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/ShiYiZhiHanZhuZhuYa/vuepressblog",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // autoSetSeries: true,
    // series 为原 sidebar

    series: {
      '/docs/document/': [
          {
            text: '文档的说明',
            children: ['/docs/document/beforeread.html', '/docs/document/rule.html', '/docs/document/use.html'] 
          },
          {
            text: '七年级资料',
            children: ['/docs/document/7/7a.html', '/docs/document/7/7b.html']
          },
          {
              text: '八年级资料',
              children: ['/docs/document/8/8a.html', '/docs/document/8/8b.html']
          },
          {
              text: "九年级资料",
              children: ['/docs/document/9/9a.html', '/docs/document/9/9b.html']
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
            text: '七年级资料',
            children: [
              { text: '七年级上册', link: '/docs/document/7/7a.md' },
              { text: '七年级下册', link: '/docs/document/7/7b.md' },
            ],
          },
          {
            text: '八年级资料',
            children: [
              { text: '八年级上册', link: '/docs/document/8/8a.md' },
              { text: '八年级下册', link: '/docs/document/8/8b.md' },
            ],
          },
          {
            text: '九年级资料',
            children: [
              { text: '九年级上册', link: '/docs/document/9/9a.md' },
              { text: '九年级下册', link: '/docs/document/9/9b.md' },
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
      { text: '音乐', link: '/docs/heomusic.html', icon: 'Music' },
    ],

    algolia: {
      appId: 'LWU5H2OL7G',
      apiKey: 'd2ee206ad9f95580681f586ec28f267d',
      indexName: 'alphaalist',
      inputSelector: '搜索',
      algoliaOptionos: { 'facetFilters': ["lang:$LANG"] },
      debug: false
    }

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
  },)
  
  // debug: true,
});
