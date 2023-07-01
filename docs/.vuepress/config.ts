import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'


export default{
    lang: 'zh-CN',
    title: 'Alpha Blog',
    description: '为所有人提供的学习网站',
    theme: defaultTheme({
        // contributors: false,
        logo: "https://v2.vuepress.vuejs.org/images/hero.png",
        // 默认主题配置
        navbar: [
        {
            text: '首页',
            link: '/',
        },
        {
            text: '学习',
            children: ['/python_group/8B.md', '/python_group/9A.md', '/python_group/9B.md'],
        },
        ],}),
        
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
  
}