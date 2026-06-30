import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const stylusDist = path.join(rootDir, "dist", "stylus", "bilibili-minimal-search.user.css");
const greasyForkDist = path.join(rootDir, "dist", "greasyfork", "bilibili-minimal-search.user.js");

test("Stylus distribution file exists with UserStyle metadata", () => {
  assert.equal(existsSync(stylusDist), true, "expected Stylus dist file to exist");

  const content = readFileSync(stylusDist, "utf8");
  assert.match(content, /==UserStyle==/);
  assert.match(content, /@name\s+bilibili 首页简洁搜索/);
  assert.match(content, /@-moz-document regexp\("\^https:\/\/www\\\\\.bilibili\\\\\.com/);
  assert.match(content, /@-moz-document regexp\("\^https:\/\/search\\\\\.bilibili\\\\\.com/);
});

test("Stylus homepage CSS keeps the native logo centered above the search form", () => {
  const content = readFileSync(stylusDist, "utf8");
  const bannerRule = content.match(/\.bili-header__banner\s*\{[\s\S]*?\n  \}/)?.[0] ?? "";
  const searchContainerBeforeRule = content.match(/\.center-search-container::before\s*\{[\s\S]*?\n  \}/)?.[0] ?? "";
  const searchFormRule = content.match(/#nav-searchform\s*\{[\s\S]*?\n  \}/)?.[0] ?? "";
  const focusRule = content.match(/#nav-searchform\.is-focus,[\s\S]*?\.center-search__bar\.is-actived\s*\{[\s\S]*?\n  \}/)?.[0] ?? "";

  assert.match(bannerRule, /display: none !important;/);
  assert.match(searchContainerBeforeRule, /content: "" !important;/);
  assert.match(searchContainerBeforeRule, /display: block !important;/);
  assert.match(searchContainerBeforeRule, /background-color: #00a1d6 !important;/);
  assert.match(searchContainerBeforeRule, /-webkit-mask-image: url\("https:\/\/i1\.hdslb\.com\/bfs\/archive\/f7f80ffd6c7d96c6c8bb9ad7f2e6ea71cf16622c\.png"\) !important;/);
  assert.match(searchFormRule, /position: static !important;/);
  assert.match(searchFormRule, /border: 0 !important;/);
  assert.match(focusRule, /box-shadow: none !important;/);
});

test("Homepage search input hides dynamic placeholder recommendation text", () => {
  const stylusContent = readFileSync(stylusDist, "utf8");
  const greasyForkContent = readFileSync(greasyForkDist, "utf8");
  const placeholderRule = stylusContent.match(/\.nav-search-input::placeholder\s*\{[\s\S]*?\n  \}/)?.[0] ?? "";

  assert.match(placeholderRule, /color: transparent !important;/);
  assert.match(placeholderRule, /opacity: 0 !important;/);
  assert.match(greasyForkContent, /\.nav-search-input::placeholder\s*\{\\n  color: transparent !important;\\n  opacity: 0 !important;\\n\}/);
});

test("Distribution CSS no longer contains local extension-specific overlays", () => {
  const stylusContent = readFileSync(stylusDist, "utf8");
  const greasyForkContent = readFileSync(greasyForkDist, "utf8");
  const forbiddenPatterns = [
    /doubao-ai-translate-image-assistant/,
    /#doubao-ai-assistant/,
    /#youmind-content-root/,
    /plasmo-csui/,
    /doubao-ai-vocabruary-popup-card/,
    /knowledegepie-extension/,
    /#csui-app/,
    /tongyi-web-extension/,
    /\.browser-tip/,
    /\.extension-tips-v2/
  ];

  for (const pattern of forbiddenPatterns) {
    assert.doesNotMatch(stylusContent, pattern);
    assert.doesNotMatch(greasyForkContent, pattern);
  }
});

test("Greasy Fork distribution file exists with UserScript metadata", () => {
  assert.equal(existsSync(greasyForkDist), true, "expected Greasy Fork dist file to exist");

  const content = readFileSync(greasyForkDist, "utf8");
  assert.match(content, /==UserScript==/);
  assert.match(content, /@name\s+Bilibili 首页极简搜索 \/ Bilibili Minimal Search/);
  assert.match(content, /@match\s+https:\/\/www\.bilibili\.com\//);
  assert.match(content, /@match\s+https:\/\/www\.bilibili\.com\/index\.html/);
  assert.match(content, /@match\s+https:\/\/search\.bilibili\.com\//);
  assert.match(content, /@license\s+MIT/);
});
