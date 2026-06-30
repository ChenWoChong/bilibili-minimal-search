import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");
const stylusDir = path.join(distDir, "stylus");
const greasyForkDir = path.join(distDir, "greasyfork");

const homeSource = await readFile(path.join(srcDir, "home.css"), "utf8");
const searchSource = await readFile(path.join(srcDir, "search.css"), "utf8");

const metadata = {
  stylusName: "bilibili 首页简洁搜索",
  greasyForkName: "Bilibili 首页极简搜索 / Bilibili Minimal Search",
  namespace: "https://github.com/wochong/bilibili-minimal-search",
  version: "1.7.3",
  stylusDescription: "B站首页与搜索页的简洁搜索样式",
  greasyForkDescription: "精简 B 站首页与搜索页，只保留搜索框并屏蔽常见扩展浮层。",
  author: "wochong",
  license: "MIT"
};

const indentBlock = (content) =>
  content
    .trim()
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

const stylusContent = `/* ==UserStyle==
@name         ${metadata.stylusName}
@namespace    ${metadata.namespace}
@version      ${metadata.version}
@description  ${metadata.stylusDescription}
@author       ${metadata.author}
==/UserStyle== */

@-moz-document regexp("^https://www\\\\.bilibili\\\\.com/(?:index\\\\.html)?(?:[?#].*)?$") {
${indentBlock(homeSource)}
}

@-moz-document regexp("^https://search\\\\.bilibili\\\\.com/.*$") {
${indentBlock(searchSource)}
}
`;

const greasyForkContent = `// ==UserScript==
// @name         ${metadata.greasyForkName}
// @namespace    ${metadata.namespace}
// @version      ${metadata.version}
// @description  ${metadata.greasyForkDescription}
// @author       ${metadata.author}
// @license      ${metadata.license}
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/index.html
// @match        https://search.bilibili.com/*
// @run-at       document-start
// ==/UserScript==

(() => {
  const homeCss = ${JSON.stringify(homeSource.trim())};
  const searchCss = ${JSON.stringify(searchSource.trim())};

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
`;

await mkdir(stylusDir, { recursive: true });
await mkdir(greasyForkDir, { recursive: true });

await writeFile(
  path.join(stylusDir, "bilibili-minimal-search.user.css"),
  stylusContent,
  "utf8"
);
await writeFile(
  path.join(greasyForkDir, "bilibili-minimal-search.user.js"),
  greasyForkContent,
  "utf8"
);
