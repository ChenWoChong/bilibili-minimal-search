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
