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

## Backlog

- owner 下一批选路 → 按“加一路”公约接入。
- 每路 mobile + website-qa.md 验收后才标 STABLE。
