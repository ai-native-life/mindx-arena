# mindx-arena 入口

本仓是 MindX 公司官网多路线发布面（ROUND2）。门面在 `/`，每条入选路线是 `/r/<slug>/` 下独立可发布的完整网站。

## Startup

```text
1. AGENTS.md（本文）
2. README.md
3. package.json（`npm run build` → `dist/`）
```

## Role

```text
repository_identity: mindx-arena
workspace_placement_class: ordinary_concrete_project
project_collection: projects
remote_identity:
  host: github.com
  namespace: ai-native-life
  repository: mindx-arena
canonical_domain: mindx.distributor.co.jp
```

## Truth Relations

```text
portal_and_routes: this repository
content_mirror: https://www.mindx.co.jp/（各路线内容以入选核对日的官网原文为准，不自行编造业绩）
exploration_not_source: web-lab 各 mindx lane 只做灵感与蓝图输入，不与本仓同步
related_but_not_this:
  - mindx-os   # MindX OS 产品壳，与公司官网无关
```

## Layout

```text
directory/       入口一览（过渡期目录，/directory/；最终收敛后退役）
routes/<slug>/  一路一目录（route.json 登记编号与名称）：
                   - 静态路线：目录内即成品（index.html + 资产），构建时拷贝
                   - Vite 路线：含 package.json，构建时 install + build，产物进 dist
switcher/        全站入口切换器（/_arena/，各页自动注入）
arena.json       defaultRoute：/ 直接呈现哪一路（可调）
docs/ROUND2.md   每批入选、优化与验收记录
dist/            构建产物（gitignored），Cloudflare Pages 发布源
```

## Deploy

```text
provider: Cloudflare Pages（Git 直连 main，push 自动发布）
build command: npm run build
output directory: dist
custom domain: mindx.distributor.co.jp（需 distributor.co.jp zone 的 DNS 授权）
default route: / 由 arena.json defaultRoute 经 _redirects 200 改写直接呈现（URL 保持 /）
switcher: 各页右下 ◉ 入口 切换全站路线，数据来自 /routes.json
```

## Boundary

- 不持有生产 secret 或客户私密材料；route 内只许出现官网已公开的事实。
- 小改（文案、间距、单链接、单路线内样式）直接 main 验证后 push 即发布；结构性改动走 task branch → PR → merge。
- 一路一回滚：坏一路 revert 该路线目录，不动门面与其他路线。
