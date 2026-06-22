# Bilibili Minimal Search

一个用于 Stylus 的 UserCSS 样式，用来精简 B 站首页与搜索页。

它的目标是尽量保留 bilibili 自带的搜索框体验，同时把首页变成一个更干净的搜索入口，减少推荐流、导航干扰和部分扩展浮层带来的视觉噪音。

## 功能

- 精简 `https://www.bilibili.com/` 首页
- 支持 `https://www.bilibili.com/index.html`
- 保留并居中展示搜索框
- 尽量复用 bilibili 原生搜索样式
- 屏蔽部分常见扩展注入的悬浮层
- 兼容 `https://search.bilibili.com/` 搜索页的基础样式

## 安装

推荐使用 Stylus 安装：

1. 安装浏览器扩展 Stylus
2. 打开 [`bilibili-minimal-search.user.css`](./bilibili-minimal-search.user.css)
3. 将内容导入 Stylus，或在 Stylus 中新建样式后粘贴保存

上传到 GitHub 后，也可以直接通过 `.user.css` 的原始链接安装。

## 适用页面

- `https://www.bilibili.com/`
- `https://www.bilibili.com/index.html`
- `https://search.bilibili.com/`

## 说明

- 这是一个持续调整中的个人样式项目
- 如果 bilibili 页面结构改版，样式可能需要同步更新
- 如果你要发布到 Greasy Fork / UserStyles.world，建议同步维护版本号和更新说明
