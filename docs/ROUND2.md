# ROUND2 记录

## R1（蓝图竞赛，web-lab，非生产）

- `web-lab/experiments/mindx-renewal-202609/`：他 AI lane，10 路单文件 HTML + 画廊。
- `web-lab/experiments/mindx-renewal-opencode-20260910/`：opencode lane，11 路单文件 HTML + 画廊。
- 外部调查：`knowledge-base/research/mindx-website-renewal-archetypes-20260910-opencode.md`。

## R2 Batch 1（2026-09-11，首批发布）

- 入选：`r-shader-flight`（源自 opencode lane Route 11，Three.js + UnrealBloom + 滚动运镜重写版）。
- 入选（owner 追加）：`r-shader-flight-r2`（源自 `web-lab/R2/11-shader-scroll3d.html`，星云 shader 版）、`r-shader-gpu`（源自 `web-lab/R2/11-shader.html`，复古 CRT 终端版）。两路入库前均截图确认正常渲染。
- 内容：mindx.co.jp 2026-09-10 核对原文，0 删减。
- 验收：桌面端 hero / services / cases / cases-轮播变色 / contact 五张截图已看，修过曝/断词/列塌 3 bug，控制台零报错。
- 发布：`https://mindx.distributor.co.jp/` LIVE（Cloudflare Pages 项目 `mindx-arena`，本批为 wrangler direct-upload；Git 自动发布待装 Cloudflare GitHub App 后切换）。
- Logo：`Downloads/MindX_Logo_HD_Asset_Package_v1.0` の vector SVG を各面に vendor（`logo.svg`：門面 header＋全3路線の nav＋全頁 favicon）。黒ロゴのため暗背景では白チップ表示、gpu 路線のベージュ header は直置き。
- 独立站入口：三路线联系区直前统一加 Mobility & Robotics 店招 banner（介绍文案取自独立站原文，外跳 `_blank`）。门面不设卡（最终只留一个网站，门面只是过渡）。
- 3D Logo（shader-flight）：vector SVG 挤出成立体，材质锁死品牌黑 `#000000`＋X 红 `#fa1c18`，能见度只靠 studio 灯光（主光＋酸绿轮廓光＋clearcoat 高光）；三站 footer 统一加 logo 落款。
- 待补：移动端基线截图、回到顶部控件（长页）、SEO meta/OG、sitemap/robots。

## R2 Batch 2（2026-09-11，实机产品对战路线）

- 入选：`r/product-suite/`（Route 04：Product Interactive Suite — 実機プロダクト対話型，Vite 现代化工程架构）。
- 定位：彻底打破“纯视觉背景/空洞滚动文字”局限，将 MindX 4大公开事例做成全画幅高精度可把玩的实机控制台（Cockpit）：
  1. ゴルフスタジオ無人運営：3D 运动学骨骼分析仪（自由视角旋转/时间轴/慢放/运动链与足压重心）+ IoT 门店无人化门锁与环境联动。
  2. 中学受験 AI コンシェルジュ：东京都真实地理交通等时线（Isochrone Map）水波辐射沙盘 + AI 4科配点雷达与合格概率动态推演。
  3. 教育機関向け240万問AI問題バンク：力导向知识星系トポロジー探索 + IRT 項目応答理論自適応出題・新規類題生成・誤答誘因分析。
  4. 宿泊業向けマルチモーダルAI接客：日式奢华酒店 AI 礼宾终端（实时声波可视化）+ OS 级 Agent 思考链与 PMS 中枢调度管线。
- 内容：mindx.co.jp 2026-09-10 核对原文，代表取締役ご挨拶全文、3大事業、4大業務領域、会社概要 0 删减，100% 完整保留。
- 门面：`portal/index.html` 注册 ROUTE 04 卡片，生成 1262x568 实机预览缩略图，顺延 ROUTE 05+。
- 验收：`npm run build` 全仓构建通过，Playwright 截图实机验证完成。

## Backlog

- owner 下一批选路 → 按“加一路”公约接入。
- 每路 mobile + website-qa.md 验收后才标 STABLE。

