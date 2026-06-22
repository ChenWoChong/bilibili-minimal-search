# Bilibili Minimal Search

一个用于精简 B 站首页与搜索页的小项目。

这个仓库把同一套核心样式分发为两种版本：

- `Stylus / UserStyles` 版本
- `Greasy Fork` 版本

这样后续只维护一份源码，就能同时发布到两个平台。

## 目录结构

```text
src/
  home.css
  search.css
dist/
  stylus/
    bilibili-minimal-search.user.css
  greasyfork/
    bilibili-minimal-search.user.js
scripts/
  build.mjs
tests/
  build.test.mjs
```

## 功能

- 精简 `https://www.bilibili.com/` 首页
- 支持 `https://www.bilibili.com/index.html`
- 保留并居中展示搜索框
- 尽量复用 bilibili 原生搜索样式
- 屏蔽部分常见扩展注入的悬浮层
- 兼容 `https://search.bilibili.com/` 搜索页的基础样式

## 开发方式

核心样式源码放在：

- [src/home.css](./src/home.css)
- [src/search.css](./src/search.css)

修改源码后运行：

```bash
npm run build
```

构建结果会生成到：

- [dist/stylus/bilibili-minimal-search.user.css](./dist/stylus/bilibili-minimal-search.user.css)
- [dist/greasyfork/bilibili-minimal-search.user.js](./dist/greasyfork/bilibili-minimal-search.user.js)

## 测试

运行：

```bash
npm run build
npm test
```

测试会检查：

- Stylus 分发文件是否生成
- Greasy Fork 分发文件是否生成
- 两份文件是否包含预期的元信息

## 发布说明

### UserStyles / Stylus

发布文件：

- `dist/stylus/bilibili-minimal-search.user.css`

适合：

- UserStyles.world
- GitHub Raw 安装
- 手动导入 Stylus

### Greasy Fork

发布文件：

- `dist/greasyfork/bilibili-minimal-search.user.js`

这是一个 userscript 包装版本，用 JavaScript 注入同一套 CSS，避免 Greasy Fork 把纯 `.user.css` 当成 JavaScript 校验时报错。

## 适用页面

- `https://www.bilibili.com/`
- `https://www.bilibili.com/index.html`
- `https://search.bilibili.com/`

## 说明

- 这是一个持续调整中的个人样式项目
- 如果 bilibili 页面结构改版，样式可能需要同步更新
- 对外发布前，建议同步更新版本号和更新说明
