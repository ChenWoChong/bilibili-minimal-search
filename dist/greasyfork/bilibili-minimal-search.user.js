// ==UserScript==
// @name         Bilibili 首页极简搜索 / Bilibili Minimal Search
// @namespace    https://github.com/wochong/bilibili-minimal-search
// @version      1.7.2
// @description  精简 B 站首页与搜索页，只保留搜索框并屏蔽常见扩展浮层。
// @author       wochong
// @license      MIT
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/index.html
// @match        https://search.bilibili.com/*
// @run-at       document-start
// ==/UserScript==

(() => {
  const homeCss = "html,\nbody {\n  margin: 0 !important;\n  width: 100% !important;\n  min-height: 100% !important;\n  background: radial-gradient(circle at top, #ffffff 0%, #f7f8fb 55%, #eef1f6 100%) !important;\n}\n\n#app,\n.bili-feed4,\n.bili-header {\n  width: 100vw !important;\n  max-width: none !important;\n  margin: 0 !important;\n}\n\nbody {\n  overflow-x: hidden !important;\n}\n\n#app > :not(.bili-feed4),\n.bili-feed4 > :not(.bili-header),\n.bili-header__channel,\n.bili-header__bar > *:not(.left-entry):not(.center-search-container) {\n  display: none !important;\n}\n\n.bili-feed4 {\n  display: block !important;\n}\n\n.bili-header {\n  min-height: 100vh !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  padding: 0 !important;\n  box-sizing: border-box !important;\n}\n\n.bili-header__banner {\n  display: none !important;\n}\n\n.header-banner__inner {\n  display: none !important;\n}\n\n.header-banner__inner > *:not(.inner-logo) {\n  display: none !important;\n}\n\n.bili-header__bar {\n  position: static !important;\n  inset: auto !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  gap: 0 !important;\n  width: 100% !important;\n  max-width: none !important;\n  padding: 0 !important;\n  background: transparent !important;\n  border: 0 !important;\n  box-shadow: none !important;\n  backdrop-filter: none !important;\n}\n\n.left-entry {\n  display: none !important;\n}\n\n.center-search-container,\n.center-search__bar {\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  justify-content: center !important;\n  width: 100% !important;\n  max-width: none !important;\n  margin: 0 !important;\n}\n\n.center-search-container::before {\n  content: \"\" !important;\n  display: block !important;\n  flex: 0 0 auto !important;\n  width: min(162px, calc(100vw - 96px)) !important;\n  aspect-ratio: 220 / 105 !important;\n  margin: 0 0 18px !important;\n  background-color: #00a1d6 !important;\n  -webkit-mask-image: url(\"https://i1.hdslb.com/bfs/archive/f7f80ffd6c7d96c6c8bb9ad7f2e6ea71cf16622c.png\") !important;\n  mask-image: url(\"https://i1.hdslb.com/bfs/archive/f7f80ffd6c7d96c6c8bb9ad7f2e6ea71cf16622c.png\") !important;\n  -webkit-mask-position: center !important;\n  mask-position: center !important;\n  -webkit-mask-repeat: no-repeat !important;\n  mask-repeat: no-repeat !important;\n  -webkit-mask-size: contain !important;\n  mask-size: contain !important;\n}\n\n#nav-searchform {\n  display: flex !important;\n  align-items: center !important;\n  justify-content: space-between !important;\n  gap: 0 !important;\n  position: static !important;\n  left: auto !important;\n  top: auto !important;\n  transform: none !important;\n  z-index: 10 !important;\n  box-sizing: border-box !important;\n  width: min(480px, calc(100vw - 48px)) !important;\n  height: 44px !important;\n  padding: 5px !important;\n  background: #f6f7f8 !important;\n  border: 1px solid #f1f2f3 !important;\n  border-radius: 6px !important;\n  box-shadow: none !important;\n}\n\n#nav-searchform.is-focus,\n#nav-searchform.is-actived,\n.center-search__bar.is-focus,\n.center-search__bar.is-actived {\n  border-radius: 6px !important;\n}\n\n.nav-search-content,\n.nav-search-input {\n  flex: 1 !important;\n  width: auto !important;\n  min-width: 0 !important;\n  background: transparent !important;\n}\n\n.nav-search-content {\n  display: flex !important;\n  align-items: center !important;\n  flex: 1 !important;\n  height: 34px !important;\n  min-height: 34px !important;\n  padding: 0 15px !important;\n  border: 0 !important;\n  border-radius: 6px !important;\n  background: transparent !important;\n}\n\n.nav-search-input {\n  height: 34px !important;\n  line-height: 34px !important;\n  padding: 0 !important;\n  font-size: 18px !important;\n  font-weight: 400 !important;\n  color: #18191c !important;\n}\n\n.nav-search-input::placeholder {\n  color: #9499a0 !important;\n}\n\n.nav-search-btn {\n  flex: 0 0 auto !important;\n  position: static !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  width: 100px !important;\n  height: 34px !important;\n  margin: 0 !important;\n  padding: 0 20px !important;\n  border: 1px solid #00aee8 !important;\n  border-radius: 8px !important;\n  background: #00aee8 !important;\n  color: #fff !important;\n  box-shadow: none !important;\n}\n\n.nav-search-btn svg {\n  display: none !important;\n}\n\n.nav-search-btn::after {\n  content: \"搜索\" !important;\n  font-size: 16px !important;\n  font-weight: 700 !important;\n  line-height: 16px !important;\n  margin-left: 0 !important;\n}\n\n.search-panel,\n.search-suggestions,\n.suggest-wrap,\n.trending {\n  display: none !important;\n}";
  const searchCss = "html,\nbody {\n  background: #f7f8fb !important;\n}";

  const css = location.hostname === "search.bilibili.com" ? searchCss : homeCss;
  const style = document.createElement("style");
  style.id = "bilibili-minimal-search-style";
  style.textContent = css;

  const attachStyle = () => {
    const parent = document.head || document.documentElement;
    if (!parent || document.getElementById(style.id)) {
      return;
    }
    parent.appendChild(style);
  };

  if (document.head || document.documentElement) {
    attachStyle();
    return;
  }

  const observer = new MutationObserver(() => {
    if (!document.head && !document.documentElement) {
      return;
    }
    attachStyle();
    observer.disconnect();
  });

  observer.observe(document, { childList: true, subtree: true });
})();
