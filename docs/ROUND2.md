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
- 3D Logo（shader-flight）：vector SVG 挤出成立体，材质锁死品牌黑 `#000000`＋X 红 `#fa1c18`，能见度只靠 studio 灯光（主光＋酸绿轮廓光＋clearcoat 高光）；借鉴 `web-lab/mindx-logo-interactive-202609/06` 展厅： procedural PMREM 环境反射＋鼠标跟随聚光灯（光标即影棚灯）；三站 footer 统一加 logo 落款。
- 店招文案定稿：独立站表述统一为ロボット事業の直営店「Mobility & Robotics」（日文页内零中文混用；ROUND2 文档本身是中文，保留“独立站”说法）。
- Logo 用量原则：3D Logo 只做两处——玩耍室（logo-lab）＋旗舰 Hero 背景（已收敛缩小东移）；三站联系区末统一加白底品牌带大 Logo 落款，nav 徽章只做功能性存在。
- r-logo-lab：源自 web-lab logo 展厅 06，three r128 等 4 个 CDN 库已 vendor 本地化，零外部依赖；定位 PLAYGROUND（非官方面）。
- r-quantum-particles / r-liquid-chrome：同展厅 07/08，同 vendor 方案入库，同 PLAYGROUND。
- 玩耍页参数面板：3 页统一加 idle 自动隐藏（2.8s 无操作淡出，动鼠标/触摸即回，左下 ◌ 常驻唤出＋首次提示），看效果时屏幕干净。
- 目录页改按博尔赫斯式重写：后台词（LIVE/ROUTE 编号/tags/COMING）下掉，换成本編三話＋余白；玩耍三页收进 r-logo Hub 单入口，切换器隐藏子项。
- 文案事实：全站删掉美式 (MindX Inc.)；店招统一为ロボット事業直営店「Mobility & Robotics」（日文零中文混用）。
- R2 标题断行：其逐字动画 JS 会吃掉 br，改成分行保留写法；GPU 标题行距 .82→1.04 治重叠；GPU 导航改黑；三站页脚后台话全清。
- 移动端基线：目录/hub 卡片防溢出、旗舰 900px 断点收紧、三玩耍页窄屏 fov 自适应；390px 三屏截图确认。
- 待补：移动端基线截图、回到顶部控件（长页）、SEO meta/OG、sitemap/robots。

## R2 Batch 2（2026-09-11）

- 上游 agy PR #5/#6：Route 04 product-suite（含 Fuji/05 实验）已由上游撤回，本仓合流接受删除（对应 tagline 修正一并失效，如路线回归可从 git 历史取回）。
- 已验证：未知路径统一回门面（root index 回退），死入口自动回大厅，无需逐个 404 处理。

## Backlog

- owner 下一批选路 → 按“加一路”公约接入。
- 每路 mobile + website-qa.md 验收后才标 STABLE。
- 收敛到唯一正式站后，落选路线归档回 web-lab，arena 只留正选 + 门面退役。
