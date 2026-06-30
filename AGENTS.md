# AGENTS.md

本项目用于精简 bilibili 首页与搜索页，并同时生成 Stylus / UserStyles 与 Greasy Fork 两个分发版本。

## Do

- 保持样式简洁、通用、可维护。
- 首页 LOGO 放在搜索框上方居中显示。
- LOGO 使用 `.center-search-container::before` 渲染。
- LOGO 使用 bilibili 原始图源：
  - `https://i1.hdslb.com/bfs/archive/f7f80ffd6c7d96c6c8bb9ad7f2e6ea71cf16622c.png`
- LOGO 颜色保持为 `#00a1d6`。
- 首页 banner 保持隐藏，避免背景图重新出现。
- `#nav-searchform` 保持 `border: 0 !important;`。
- 聚焦态保持 `box-shadow: none !important;`，避免两侧横向白带。
- 修改版本号时，更新 `scripts/build.mjs` 中的 `metadata.version`，并重新生成 `dist`。

## Don't

- 不要重新启用 `.bili-header__banner` 来取 LOGO。
- 不要依赖 banner 可见性来显示 LOGO。
- 不要加入仅针对个人本地扩展的屏蔽规则。
- 不要重新引入这类规则：
  - `#doubao-ai-assistant`
  - `#youmind-content-root`
  - `plasmo-csui`
  - `#csui-app`
  - `tongyi-web-extension`
  - `.browser-tip`
  - `.extension-tips-v2`

## Verify

每次修改后必须执行：

1. 版本号 `+1`
2. `npm run build`
3. `npm test`

版本号更新位置：

- `scripts/build.mjs` 中的 `metadata.version`

执行命令：

```bash
npm run build
npm test
```

测试应继续保障：

- 分发文件元信息正确
- 首页 logo 规则存在
- `#nav-searchform` 无边框
- 聚焦态无遗留 `box-shadow`
- 分发文件中不含本地扩展专用规则

如改动首页布局，手动检查：

- 首页不显示顶部 banner 背景图
- LOGO 在搜索框上方且保持居中
- 点击搜索框时不出现多余竖线或两侧横向白带
