import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { componentsPlugin } from "vuepress-plugin-components";

export default defineUserConfig({
  base: "/",
<<<<<<< HEAD
  title: "枫-WIKI",
=======
  title: "AlphaBlog",
>>>>>>> bd4349293c4154e9a88297c6bfc49d2ea6f897b2
  head: [["link", { rel: "icon", href: "/icons/logo.ico" }]],
  shouldPrefetch: false,
  markdown: {
    code: {
      lineNumbers: false
    }
  },
  
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  
  theme: recoTheme({
    primaryColor: "#0076FF",
    logo: "/icons/logo.png",
<<<<<<< HEAD
    author: "YOUZAI",
    authorAvatar: "/icons/logo.png",
    docsRepo: "https://github.com/qian-shen/FengWIKI",
    docsBranch: "main",
    docsDir: "",
    catalogTitle: "此页内容 🖨️",

    algolia: {
      appId: "D6UKD30D1V",
      apiKey: "09591f0e0e4f5c763797f4fcf961fddc",
      indexName: "qian-shenio",
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    },

    commentConfig: {
      type: "valine",
      options: {
        appId: "x1TGn4mEkWBNuAIoqBnc6kPU-gzGzoHsz",
        appKey: "KuSjIOnnBxvjB6Uf08PjZUb9",
        recordIP: true,
        // visitor: true,
        hideComments: true,
      }
    },

    series: {
      "/docs/NetworkSecurity/": [
        {
          text: "WEB安全",
          icon: "/icons/WEB安全.svg",
          collapsible: true,
          children: [
            {
              text: "常见漏洞",
              icon: "/icons/常见漏洞.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/bruteForce",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/logicalVulnerability",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/XSS",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/CSRF",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/RCE",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/deserialize",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/LFR",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/LFU",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/SQLI",
                "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/XXE"
              ]
            },
            {
              text: "安全技术",
              icon: "/icons/安全技术.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/WebSecurity/SecurityTechnology/informationGathering",
                "/docs/NetworkSecurity/WebSecurity/SecurityTechnology/socialEngineering",
                "/docs/NetworkSecurity/WebSecurity/SecurityTechnology/bounceTrojan"
              ]
            },
            {
              text: "基础知识",
              icon: "/icons/基础知识.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/WebSecurity/BasicKnowledge/cookie"
              ]
            },
            {
              text: "网络协议",
              icon: "/icons/网络协议.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/WebSecurity/NetworkProtocol/HTTP"
              ]
            },
          ]
        },
        {
          text: "内网安全",
          icon: "/icons/内网安全.svg",
          collapsible: true,
          children: [
            {
              text: "Linux",
              icon: "/icons/Linux.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/IntranetSecurity/Linux/permissionEscalation"
              ]
            },
            {
              text: "Windows",
              icon: "/icons/Windows.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/IntranetSecurity/Windows/informationGathering",
                "/docs/NetworkSecurity/IntranetSecurity/Windows/permissionEscalation"
              ]
            }
          ]
        },
        {
          text: "运营安全",
          icon: "/icons/运营安全.svg",
          collapsible: true,
          children: [
            "/docs/NetworkSecurity/OperationalSecurity/SDLC",
            "/docs/NetworkSecurity/OperationalSecurity/riskAssessment",
            "/docs/NetworkSecurity/OperationalSecurity/equalProtectionEvaluation"
          ]
        },
        {
          text: "数据库安全",
          icon: "/icons/数据库安全.svg",
          collapsible: true,
          children: [
            {
              text: "MySQL",
              icon: "/icons/MySQL.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/DatabasesSecurity/MySQL/install",
                "/docs/NetworkSecurity/DatabasesSecurity/MySQL/basicKnowledge"
              ]
            },
            {
              text: "MsSQL",
              icon: "/icons/MsSQL.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/DatabasesSecurity/MsSQL/basicKnowledge"
              ]
            },
            {
              text: "Reids",
              icon: "/icons/Redis.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/DatabasesSecurity/Redis/install",
                "/docs/NetworkSecurity/DatabasesSecurity/Redis/basicKnowledge"
              ]
            }
          ]
        },
        {
          text: "云原生安全",
          icon: "/icons/云原生安全.svg",
          collapsible: true,
          children: [
            {
              text: "云原生技术",
              icon: "/icons/云原生技术.svg",
              collapsible: true,
              children: [
                "/docs/NetworkSecurity/CloudNativeSecurity/CloudNativeTechnology/containerTechnology",
                "/docs/NetworkSecurity/CloudNativeSecurity/CloudNativeTechnology/microServices",
              ]
            }
          ]
        }
      ],
      "/docs/SecurityTools/": [
        {
          text: "暴力破解",
          icon: "/icons/暴力破解.svg",
          collapsible: true,
          children: [
            "/docs/SecurityTools/BruteForce/burpSuite"
          ]
        },
        {
          text: "端口扫描",
          icon: "/icons/端口扫描.svg",
          collapsible: true,
          children: [
            "/docs/SecurityTools/PortScan/nmap",
            "/docs/SecurityTools/PortScan/arpscan",
            "/docs/SecurityTools/PortScan/masscan",
          ]
        },
        {
          text: "脚本挖掘",
          icon: "/icons/脚本挖掘.svg",
          collapsible: true,
          children: [
            "/docs/SecurityTools/ScriptExploring/JSFinder",
            "/docs/SecurityTools/ScriptExploring/LinkFinder"
          ]
        },
        {
          text: "漏洞扫描",
          icon: "/icons/漏洞扫描.svg",
          collapsible: true,
          children: [
            "/docs/SecurityTools/VulnerabilityScan/WESuggester"
          ]
        },
        {
          text: "漏洞利用",
          icon: "/icons/漏洞利用.svg",
          collapsible: true,
          children: [
            "/docs/SecurityTools/VulnerabilityExp/searchsploit"
          ]
        }
      ],
      "/docs/ProgrammingLearning/": [
        {
          text: "Golang",
          icon: "/icons/Golang.svg",
          collapsible: true,
          children: [
            {
              text: "环境搭建",
              icon: "/icons/环境搭建.svg",
              collapsible: true,
              children: [
                "/docs/ProgrammingLearning/Golang/EnvironmentConstruction/environmentConstruction",
              ]
            },
            {
              text: "语法基础",
              icon: "/icons/语法基础.svg",
              collapsible: true,
              children: [
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/variable",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/const",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/type",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/process",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/function",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/method",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/structure",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/interface",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/goroutine",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/channel",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/sync",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/socket",
                "/docs/ProgrammingLearning/Golang/GrammaticalBasic/encode",
              ]
            },
            {
              text: "代码实例",
              icon: "/icons/代码实例.svg",
              collapsible: true,
              children: [
                "/docs/ProgrammingLearning/Golang/CodeExample/http",
                "/docs/ProgrammingLearning/Golang/CodeExample/flag",
                "/docs/ProgrammingLearning/Golang/CodeExample/typeChange",
                "/docs/ProgrammingLearning/Golang/CodeExample/reflect",
                "/docs/ProgrammingLearning/Golang/CodeExample/unicode",
              ]
            }
          ]
        },
        {
          text: "PHP",
          icon: "/icons/PHP.svg",
          collapsible: true,
          children: [
            {
              text: "环境搭建",
              icon: "/icons/环境搭建.svg",
              collapsible: true,
              children: [
                "/docs/ProgrammingLearning/PHP/EnvironmentConstruction/environmentConstruction",
              ]
            },
            {
              text: "语法基础",
              icon: "/icons/语法基础.svg",
              collapsible: true,
              children: [
                "/docs/ProgrammingLearning/PHP/GrammaticalBasic/variable",
                "/docs/ProgrammingLearning/PHP/GrammaticalBasic/type",
                "/docs/ProgrammingLearning/PHP/GrammaticalBasic/echo",
                "/docs/ProgrammingLearning/PHP/GrammaticalBasic/EOF",
                "/docs/ProgrammingLearning/PHP/GrammaticalBasic/namespace",
              ]
            }
          ]
        },
        {
          text: "Python",
          icon: "/icons/Python.svg",
          collapsible: true,
          children: [
            {
              text: "代码实例",
              icon: "/icons/代码实例.svg",
              collapsible: true,
              children: [
                "/docs/ProgrammingLearning/Python/CodeExample/http",
                "/docs/ProgrammingLearning/Python/CodeExample/socket",
                "/docs/ProgrammingLearning/Python/CodeExample/ssh",
                "/docs/ProgrammingLearning/Python/CodeExample/time",
                "/docs/ProgrammingLearning/Python/CodeExample/thread",
                "/docs/ProgrammingLearning/Python/CodeExample/file",
                "/docs/ProgrammingLearning/Python/CodeExample/regex",
                "/docs/ProgrammingLearning/Python/CodeExample/iter",
                "/docs/ProgrammingLearning/Python/CodeExample/random",
                "/docs/ProgrammingLearning/Python/CodeExample/json",
                "/docs/ProgrammingLearning/Python/CodeExample/hostScan",
              ]
            }
          ]
        }
      ],
      "/docs/CodeAudit/": [
        {
          text: "PHP",
          icon: "/icons/PHP.svg",
          collapsible: true,
          children: [
            "/docs/CodeAudit/PHP/environmentConstruction"
          ]
        }
      ],
      "/docs/VulnerabilityLibrary/": [
        {
          text: "WEB中间件",
          icon: "/icons/WEB中间件.svg",
          collapisible: true,
          children: [
            {
              text: "Nginx",
              icon: "/icons/Nginx.svg",
              collapsible: true,
              children: [
                "/docs/VulnerabilityLibrary/WebMiddleware/Nginx/1",
                "/docs/VulnerabilityLibrary/WebMiddleware/Nginx/2",
                "/docs/VulnerabilityLibrary/WebMiddleware/Nginx/3"
              ]
            },
            {
              text: "Tomcat",
              icon: "/icons/Tomcat.svg",
              collapsible: true,
              children: [
                "/docs/VulnerabilityLibrary/WebMiddleware/Tomcat/1",
                "/docs/VulnerabilityLibrary/WebMiddleware/Tomcat/2"
              ]
            },
            {
              text: "Weblogic",
              icon: "/icons/Weblogic.svg",
              collapsible: true,
              children: [
                "/docs/VulnerabilityLibrary/WebMiddleware/Weblogic/1"
              ]
            }
          ]
        }
      ],
    },

    navbar: [
      { text: "网络安全", iconE: "/icons/网络安全.svg", link: "/docs/NetworkSecurity/"},
      // { text: "安全工具", iconE: "/icons/安全工具.svg", link: "/docs/SecurityTools/", },
      // { text: "编程学习", iconE: "/icons/编程学习.svg", link: "/docs/ProgrammingLearning/" },
      // { text: "代码审计", iconE: "/icons/代码审计.svg", link: "/docs/CodeAudit/"},
      // { text: "漏洞文库", iconE: "/icons/漏洞文库.svg", link: "/docs/VulnerabilityLibrary/"},
      // { text: "留言板块", iconE: "/icons/留言板块.svg", link: "/docs/MessageSection/" },
      // {
      //   text: "网络安全",
      //   iconE: "/icons/网络安全.svg",
      //   children: [
      //     {
      //       text: "WEB安全",
      //       children: [
      //         {
      //           text: "常见漏洞",
      //           iconE: "/icons/常见漏洞.svg",
      //           link: "/docs/NetworkSecurity/WebSecurity/CommonVulnerabilities/"
      //         },
      //         {
      //           text: "安全技术",
      //           iconE: "/icons/安全技术.svg",
      //           link: "/docs/NetworkSecurity/WebSecurity/SecurityTechnology/"
      //         },
      //         {
      //           text: "基础知识",
      //           iconE: "/icons/基础知识.svg",
      //           link: "/docs/NetworkSecurity/WebSecurity/BasicKnowledge/"
      //         },
      //         {
      //           text: "网络协议",
      //           iconE: "/icons/网络协议.svg",
      //           link: "/docs/NetworkSecurity/WebSecurity/NetworkProtocol/"
      //         }
      //       ]
      //     },
      //     {
      //       text: "内网安全",
      //       children: [
      //         {
      //           text: "Liunx",
      //           iconE: "/icons/Linux.svg",
      //           link: "/docs/NetworkSecurity/IntranetSecurity/Linux/"
      //         },
      //         {
      //           text: "Windows",
      //           iconE: "/icons/Windows.svg",
      //           link: "/docs/NetworkSecurity/IntranetSecurity/Windows/"
      //         }
      //       ]
      //     },
      //     {
      //       text: "运营安全",
      //       children: [
      //         {
      //           text: "运营安全",
      //           iconE: "/icons/运营安全.svg",
      //           link: "/docs/NetworkSecurity/OperationalSecurity/"
      //         }
      //       ]
      //     },
      //     {
      //       text: "数据库安全",
      //       children: [
      //         {
      //           text: "MySQL",
      //           iconE: "/icons/MySQL.svg",
      //           link: "/docs/NetworkSecurity/DatabasesSecurity/mySQL"
      //         },
      //         {
      //           text: "MsSQL",
      //           iconE: "/icons/MsSQL.svg",
      //           link: "/docs/NetworkSecurity/DatabasesSecurity/msSQL"
      //         },
      //         {
      //           text: "Redis",
      //           iconE: "/icons/Redis.svg",
      //           link: "/docs/NetworkSecurity/DatabasesSecurity/Redis"
      //         }
      //       ]
      //     },
      //     {
      //       text: "云原生安全",
      //       children: [
      //         {
      //           text: "云原生技术",
      //           iconE: "/icons/云原生技术.svg",
      //           link: "/docs/NetworkSecurity/CloudNativeSecurity/CloudNativeTechnology/"
      //         }
      //       ]
      //     }
      //   ]
      // },
      
      {
        text: "代码审计",
        iconE: "/icons/代码审计.svg",
        children: [
          {
            text: "编程语言",
            children: [
              {
                text: "PHP",
                iconE: "/icons/PHP.svg",
                link: "/docs/CodeAudit/PHP/"
              },
              {
                text: "JAVA",
                iconE: "/icons/JAVA.svg",
                link: "/docs/CodeAudit/JAVA/"
              }
            ]
          },
        ]
      },
      { text: "留言板块", iconE: "/icons/留言板块.svg", link: "/docs/MessageSection/" },
      // { text: "安全工具", iconE: "/icons/安全工具.svg", link: "/docs/SecurityTools/", },
      
      // {
      //   text: "漏洞文库",
      //   iconE: "/icons/漏洞文库.svg",
      //   children: [
      //     {
      //       text: "WEB中间件",
      //       children: [
      //         {
      //           text: "Nginx",
      //           iconE: "/icons/Nginx.svg",
      //           link: "/docs/VulnerabilityLibrary/WebMiddleware/Nginx/"
      //         },
      //         {
      //           text: "Tomcat",
      //           iconE: "/icons/Tomcat.svg",
      //           link: "/docs/VulnerabilityLibrary/WebMiddleware/Tomcat/"
      //         },
      //         {
      //           text: "Weblogic",
      //           iconE: "/icons/Weblogic.svg",
      //           link: "/docs/VulnerabilityLibrary/WebMiddleware/Weblogic/"
      //         }
      //       ]
      //     }
      //   ]
      // },
    ],
  }),

  plugins: [
    mdEnhancePlugin({
      mark: true,
      footnote: true
    }),
    componentsPlugin({
      rootComponents: {
        backToTop: {
          progress: true
        },
      },
=======
    author: "SmallPigPig",
    authorAvatar: "/icons/logo.png",
    docsRepo: "https://github.com/ShiYiZhiHanZhuZhuYa",
    docsBranch: "main",
    docsDir: "",
    catalogTitle: "此页内容 🖨️",

    algolia: {
      appId: "LWU5H2OL7G",
      apiKey: "d2ee206ad9f95580681f586ec28f267d",
      indexName: "alphaalist",
      inputSelector: '搜索',
      algoliaOptionos: { 'facetFilters': ["lang:$LANG"] },
      debug: false,
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    },

    commentConfig: {
      type: "valine",
      options: {
        appId: "sGmPQ8D3h1utFk3GegemG9be-gzGzoHsz",
        appKey: "ncl8w5Ty8yZdXdvlTy19hwhx",
        recordIP: true,
        // visitor: true,
      }
    },

    series: {
      '/docs/document/': [
        {
          collapsible: true,
          text: '文档的说明',
          children: ['/docs/document/beforeread.html', '/docs/document/rule.html', '/docs/document/use.html', '/docs/document/pull.html'] 
        },
        {
          collapsible: true,
          text: '七年级资料',
          children: ['/docs/document/7/7a.html', '/docs/document/7/7b.html']
        },
        {
          collapsible: true,
          text: '八年级资料',
          children: ['/docs/document/8/8a.html', '/docs/document/8/8b.html']
        },
        {
          collapsible: true,
          text: "九年级资料",
          children: ['/docs/document/9/9a.html', '/docs/document/9/9b.html']
        }
    ],

    '/docs/about/': [
      {
        collapsible: true,
        text: "关于文档",
        children: ['/docs/about/关于文档/关于网站.html', '/docs/about/关于文档/关于作者.html']
      },
      {
        collapsible: true,
        text: "文档优势",
        children: ['/docs/about/文档优势/标准的语法.html', '/docs/about/文档优势/简洁的代码.html', '/docs/about/文档优势/清晰的目标.html', '/docs/about/文档优势/整齐的分类.html']
      }
    ]
    },

    navbar: [
      { text: '博客', link: '/posts', icon: 'Compass' },
      { text: '分类', link: '/categories/gengxingonggao/1/', icon: 'Folder' },
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
        ]
      },
      { text: '日志', link: '/timeline', icon: 'Box' },
    ],
  }),

  plugins: [
    mdEnhancePlugin({
      mark: true,
      footnote: true,
      mermaid: true,
      align: true,
    }),
    componentsPlugin({
      components: ["Replit", "BiliBili"],
      rootComponents: {
        backToTop: {
          progress: true
        },
      },
>>>>>>> bd4349293c4154e9a88297c6bfc49d2ea6f897b2
      locales: {
        backToTop: {
          "/": {
            backToTop: "返回顶部"
          }
        }
      }
    }),
  ]
  // debug: true,
});
