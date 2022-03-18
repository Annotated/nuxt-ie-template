# nuxt-ie-template

## 前言

使用nuxt+ts+装饰器，兼容ie的的nuxt项目模板

> 注：如果不需要兼容ie可使用 [npx create-nuxt-app](https://www.nuxtjs.cn/guide/installation) 创建，为以后更好的升级到nuxt3.x

## 部署教程

### 1.启动

- 确保已安装 node 模块

```bash
# node 14.x
npm i
```

- 运行

```bash
npm run dev
```

```bash
npm run build:dev   # 开发环境
npm run build:test  # 测试环境
npm run build:prod  # 生产环境
```

## 基本介绍

### 项目结构

```
├── .nuxt                     # 项目构建(webpack)相关代码
├── api                       # 后端的url地址
├── assets                    # 资源目录 用于组织未编译的静态资源
│   └── styles                # 样式目录
│   │   ├── index.scss              # 样式的入口，用来引入其他样式文件方便统一管理
│   │   ├── reset.scss              # 重置浏览器的默认样式
│   │   ├── transition.scss         # 动画
│   │   └── variables.scss          # 全局颜色
├── components                # 公共组件
├── node_modules              # npm 加载的项目依赖模块
├── pages                     # 页面目录 pages 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置
├── plugins                   # 插件目录 plugins 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
├── static                    # 此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下
├── store                     # store 目录用于组织应用的 Vuex 状态树 文件
├── test                      # 单元测试的目录
├── types                     # 第三方插件的全局类型配置
├── utils                     # 工具类
```