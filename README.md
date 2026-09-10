# mindx-arena

MindX 公司官网的多路线发布面（ROUND2）。`/` 是选路门面，每条 owner 入选的路线是 `/r/<slug>/` 下的完整网站，持续优化、独立回滚。

- 公开域：`https://mindx.distributor.co.jp/`（Cloudflare Pages，main 自动发布）
- 当前 live：`r-shader-flight`（Three.js 滚动飞行，after shader.se）
- 迭代记录：[`docs/ROUND2.md`](docs/ROUND2.md)

## 本地运行

```text
npm run build        # portal + 全路线 → dist/
npx serve dist       # 或任意静态服务器，看 dist/
```

单路线开发（以 shader-flight 为例）：

```text
cd routes/r-shader-flight && npm install && npm run dev   # http://localhost:5199/
```

## 加一路

`routes/<new-slug>/` 里放成品静态（含 `index.html`）或 Vite 工程（含 `package.json`），构建脚本自动收录并发布到 `/r/<new-slug>/`。门面卡片在 `portal/index.html` 手工加一张。
