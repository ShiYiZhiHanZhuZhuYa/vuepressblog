export const searchIndex = [
  {
    "title": "",
    "headers": [
      {
        "level": 2,
        "title": "符合 PEP8 语法规范的清晰易懂的语法",
        "slug": "符合-pep8-语法规范的清晰易懂的语法",
        "link": "#符合-pep8-语法规范的清晰易懂的语法",
        "children": []
      },
      {
        "level": 2,
        "title": "由 Vue 强势驱动",
        "slug": "由-vue-强势驱动",
        "link": "#由-vue-强势驱动",
        "children": []
      }
    ],
    "path": "/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "关于项目",
    "headers": [],
    "path": "/guide/About.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "八年级上学期",
    "headers": [
      {
        "level": 2,
        "title": "开始之前",
        "slug": "开始之前",
        "link": "#开始之前",
        "children": []
      },
      {
        "level": 2,
        "title": "1 Python 编程基础",
        "slug": "_1-python-编程基础",
        "link": "#_1-python-编程基础",
        "children": [
          {
            "level": 3,
            "title": "1.1 注释语句",
            "slug": "_1-1-注释语句",
            "link": "#_1-1-注释语句",
            "children": []
          },
          {
            "level": 3,
            "title": "1.2 输入和输出",
            "slug": "_1-2-输入和输出",
            "link": "#_1-2-输入和输出",
            "children": []
          },
          {
            "level": 3,
            "title": "1.3 数据类型及其转换函数",
            "slug": "_1-3-数据类型及其转换函数",
            "link": "#_1-3-数据类型及其转换函数",
            "children": []
          }
        ]
      }
    ],
    "path": "/python_group/8A.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "八年级下学期",
    "headers": [
      {
        "level": 2,
        "title": "Hello Python",
        "slug": "hello-python",
        "link": "#hello-python",
        "children": []
      }
    ],
    "path": "/python_group/8B.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Python 教程首页",
    "headers": [],
    "path": "/python_group/Home.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/404.html",
    "pathLocale": "/",
    "extraFields": []
  }
]

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  })
}
