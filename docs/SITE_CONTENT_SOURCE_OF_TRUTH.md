# MindX Website Content Source of Truth

> Status: Draft for route competition
> Updated: 2026-09-14
> Primary language: 日本語
> Internal notes: 中文
> Repository: `ai-native-life/mindx-arena`

---

## 0. この文書の目的 / 用途

这份文档是 **MindX 官网下一阶段多路线设计的 Content Source of Truth**。

后续无论做 20 / 50 / 100 路 HTML、WebGL、Three.js、极简、实验性互动或传统 Corporate Site，**视觉可以完全不同，事实与核心内容不能漂移**。

目标：

- 先把「MindX 是谁、做什么、为什么值得联系」讲清楚。
- 允许不同路线自由改变信息密度、顺序、动效、版式与交互。
- 不为了视觉效果编造客户、奖项、认证、数字或技术能力。
- 最终可以从多路中选出 1 路，也可以把各路精华融合成最终官网。

### Route Competition 基本规则

**固定事实 / Locked facts**

- 公司名、公司信息、业务事实、公开案例、联系方式。
- 三大核心事业：自社开发 / 咨询与工程 / 机器人事业。
- 人与 AI 协作、数据驱动、实际业务落地的基本立场。

**可自由变化 / Flexible presentation**

- Section 顺序。
- Hero 的构图与动效。
- 日英文字比例。
- 是否使用 3D / WebGL / Shader / Video / Editorial Layout。
- 案例呈现方式、行业呈现方式、流程呈现方式。

**禁止 / Do not invent**

- 未公开的大客户 Logo。
- 未确认的安全认证、合作伙伴、员工人数、营收、融资额。
- 未核实的项目数量、满意度、奖项数量。
- “日本第一”“行业领先”等无法证明的比较性表述。

---

# 1. Brand Core

## Company

**MindX株式会社**

Japan-based global IT / AI solutions company.

## Core Proposition

### AIを、業務と社会に実装する。

AIを「試す」だけで終わらせず、実際の業務、サービス、プロダクト、そしてロボティクスへつなげる。

## Brand Line

### 無限の可能性を、AIの力で。

公式サイト既存のブランドメッセージを継承する。

### Optional legacy phrase

**新しい世界と逢いましょう！**

これは Hero の主見出しとして必須ではない。情緒的な Opening / Transition / Closing copy として使用可能。

---

# 2. Hero / First View

## Recommended Hero Copy

**Eyebrow**

`GLOBAL AI SOLUTIONS — TOKYO, JAPAN`

**Headline**

# AIを、業務と社会に実装する。

**Lead**

AIエージェント、業務システム、データ・ナレッジ活用、ロボティクス。
MindXは、課題整理から検証、本番実装、運用改善までをつなぎ、AIを現場で使われ続ける仕組みへ変えていきます。

**Brand support line**

無限の可能性を、AIの力で。

**Primary CTA**

`AI・システム開発を相談する`

**Secondary CTA**

`事業内容を見る`

### Short Hero Variant

# 無限の可能性を、AIの力で。

AIを中核に、業務システムからロボティクスまで。
未来の課題を見据え、使われ続けるテクノロジーを実装します。

> Route 可以选 Recommended Hero 或 Short Hero，但不要另行编造完全不同的公司定位。

---

# 3. What MindX Does / 事業内容

MindX 的业务不要堆成“什么都做的 IT 公司”。网站应始终围绕下面三个核心事业组织。

## 01 — 自社開発 / AI Products & R&D

### 自社開発

独自の技術力を基盤に、産業と社会に新たな価値を生み出すAIエージェントやシステムの研究開発を進めています。

**Keywords**

`AI Agent` / `AI Systems` / `Product R&D` / `Data-driven Innovation`

---

## 02 — コンサルティング & エンジニアリング

### コンサルティング

ソフトウェア・ハードウェアの企画、研究、開発、販売、保守、リリース、コンサルティングまで、課題に応じたシステムづくりを支援します。

単にツールを導入するのではなく、業務課題を整理し、必要なデータや運用条件を確認した上で、検証から本番実装へつなげます。

**Keywords**

`Consulting` / `System Development` / `Business Systems` / `Implementation`

---

## 03 — ロボット事業 / Robotics & Automation

### ロボット事業

各種ロボットおよび関連機器の企画、開発、設計、販売、導入支援、輸出入を通じて、業務効率化と社会課題の解決に取り組みます。

デジタル空間だけでなく、AIとロボティクスが現実世界で価値を生む領域まで扱うことが、MindXの事業の広がりです。

**Keywords**

`Robotics` / `Automation` / `Mobility` / `Physical AI`

> `Physical AI` は未来方向を示す Keyword として使用可。ただし具体的な自社製品・研究成果として断定しない。

---

# 4. Customer Problem / AI導入が止まる場所

这一节不是公司“业绩”，而是帮助访问者迅速产生共鸣的 Problem Statement。多路线可以删减，但内容方向建议保留。

## AIを使いたい。けれど、どこから実装するかが難しい。

AI導入の難しさは、モデルを選ぶことだけではありません。

- どの業務を変えるべきか分からない。
- PoCまでは動いたが、本番業務につながらない。
- 社内のデータやナレッジが分散している。
- 権限、運用、既存システムとの接続が整理できていない。
- AIを導入しても、現場で継続的に使われない。

MindXは、技術だけではなく、業務・データ・システム・運用を一つの流れとして考えます。

---

# 5. Implementation Flow / 実装プロセス

## Issue → Production → Learning

AIを導入すること自体をゴールにせず、実際の業務で使われ、改善が続く状態までつなげる。

### 01 Scope — 変える業務を定義する

現状の業務と課題を整理し、AIやシステムを使うべき範囲を決めます。

### 02 Verify — データと条件を確認する

必要なデータ、権限、既存システム、運用上の制約を確認します。

### 03 Prove — 使える条件で検証する

小さく検証し、技術的に動くかだけでなく、実際の業務で価値が出るかを確かめます。

### 04 Build — 本番システムへ接続する

検証結果をもとに、業務フローや既存システムと接続し、本番環境へ実装します。

### 05 Run — 運用から改善する

利用状況や現場のフィードバックをもとに改善し、使われ続ける仕組みに育てます。

---

# 6. Why MindX / 私たちの考え方

## Human + AI

### AIのために人が変わるのではなく、人がより価値ある仕事に集中できるAIへ。

MindXは、AIが人の仕事を単純に置き換える未来ではなく、人が判断、創造、対話、責任ある仕事により集中できる環境を目指します。

AIと人がそれぞれの強みを活かして働くことで、事業と社会の可能性を広げていきます。

---

## Data + Wisdom

### データを、判断と新しい価値へ。

膨大なデータを処理するだけではなく、そこから得られる知見を業務やサービスへ還元する。

MindXは、データとAIを使って現在の課題を解決すると同時に、将来起こりうる課題まで見据えた仕組みづくりを目指します。

---

## Digital + Physical

### ソフトウェアから、現実世界へ。

AIエージェントや業務システムだけでなく、ロボットや関連機器の導入まで扱うことで、デジタルと現実世界の双方でテクノロジーを実装します。

---

# 7. Selected Work / 公開事例

> 以下は MindX 公式サイトで公開されている事例。Route 可以重新设计呈现，但不能自行添加不存在的客户名、成果数字或 Logo。

## 01 — インドアゴルフシステム

**Category**

`AI / IoT / Booking / Payment`

**Copy**

多言語予約、自動解錠、決済、AIによるスイング改善機能を組み合わせたインドアゴルフ予約システムを開発しました。

---

## 02 — 240種類の過去問題練習サイト

**Category**

`Education / AI Learning Support`

**Copy**

240種類の資格試験に対応する過去問題練習サイトを開発。学習状況をAIが分析し、学習計画の提案まで支援します。

---

## 03 — 中学受験AIコンシェルジュ

**Category**

`Education / AI Concierge / Map`

**Copy**

自宅周辺の学校を地図で可視化し、学校の特徴、偏差値、試験傾向、相性診断、学校イベントなどの情報をAIが整理。学校選びを支援するツールです。

---

## 04 — AIコンシェルジュサービス

**Category**

`AI Concierge / 24h Support`

**Copy**

利用者からの質問や困りごとに24時間対応するAIコンシェルジュサービスを開発。必要な情報をリアルタイムに提供し、サポート体験の向上を目指します。

---

# 8. Fields / 業務領域

行业不是网站的主轴，不要做成“我们什么行业都能做”的空泛列表。建议作为案例与能力的辅助导航。

## Healthcare / 医療

患者ポータル、予約、電子医療記録（EMR）など、医療プロセスを支えるアプリケーション領域。

## Education / 教育

学習支援、試験対策、情報提供など、より個別化された学習体験をつくる教育テクノロジー領域。

## Retail / 小売

決済、商品管理、EC、顧客体験など、小売・オンライン販売を支えるシステム領域。

## Finance / 金融

データ処理、投資リサーチ、分析支援など、AIを活用した金融・クオンツ関連領域。

## Robotics & Mobility / ロボティクス・モビリティ

ロボット、モビリティ機器、搬送・支援機器など、現実世界の業務や生活を支える領域。

> 最后这一项由「ロボット事業」与 MindX 直营 Robotics Store 的公开业务延伸而来，建议新站保留。

---

# 9. About MindX / ご挨拶

## Short Version

MindX株式会社は、日本を拠点にグローバルな視点でAI・ITソリューションを提供する企業です。

AIを中核とした製品開発、システム開発、コンサルティング、ロボット事業を通じて、企業や社会の課題をテクノロジーで解決し、新しい価値を実装します。

私たちが重視するのは、技術そのものではなく、それが実際の業務や生活の中で役に立ち、使われ続けることです。

---

## Long Version

MindX株式会社は、日本を拠点にグローバルな視点を持つITソリューション企業です。

最先端のAI・IT技術を活用し、現在見えている課題だけでなく、将来起こりうる課題まで見据えた製品開発と情報サービスを提供しています。

私たちの中心にあるのは、データを新しい価値へ変える「データ駆動型イノベーション」と、人とAIがそれぞれの強みを活かす「Human + AI」という考え方です。

AIによって知的な反復作業を軽くし、人が判断、創造、対話、責任ある仕事に集中できる環境をつくる。そして、ソフトウェアだけでなくロボティクスまで含めて、テクノロジーを現実の業務と社会へ実装していきます。

---

# 10. Philosophy / 経営理念

## データと知恵の力で、人と事業の可能性を最大化する。

MindXは、AIを単なる効率化の道具としてではなく、新しい価値を生み出すための基盤だと考えています。

データから知見を引き出し、人の判断や創造力と組み合わせることで、ビジネスと社会の課題を解決し、より良い未来を実装する。

お客様と共に考え、つくり、改善を続けるパートナーとして、AIと人が協調する社会を目指します。

---

# 11. Robotics Direct Store / 事業連携

## Mobility & Robotics

MindX ロボット事業の直営ストア。

モビリティロボット、階段搬送機などの販売、製品選定、導入、購入相談を日本語でサポートします。

**CTA**

`Mobility & Robotics 公式ストアを見る ↗`

**URL**

`https://mobility.distributor.co.jp/`

> Corporate Site 主流程里不要把“商城”压过公司主体。适合作为 Robotics 事业的 proof / related business link。

---

# 12. Company Information / 会社概要

| Item | Content |
|---|---|
| 会社名 | MindX株式会社 |
| 設立 | 2025年1月 |
| 資本金 | 2,000万円 |
| 代表取締役 | 越智 伸司 |
| 所在地 | 〒103-0014 東京都中央区日本橋蛎殻町1丁目36-3 東洋ビル6F |
| Email | info@mindx.co.jp |
| Phone | +81-3-6821-6158 |
| 取引銀行 | 三井住友銀行 |

---

# 13. Contact / お問い合わせ

## 仕様になる前の業務課題から、ご相談ください。

AIを使うべきか。
どこからシステム化するか。
必要なデータは何か。

まだ要件が固まっていない段階でも、現在の業務と課題を確認し、最初に検証する範囲から一緒に整理します。

**Primary CTA**

`AI・システム開発を相談する`

**Contact**

- `info@mindx.co.jp`
- `+81-3-6821-6158`

---

# 14. Navigation Recommendation

后续多路不强制同一导航形式，但信息架构建议统一到下面这些概念。

```text
Home
Business / 事業内容
Process / 実装プロセス
Work / 公開事例
About / 私たちについて
Company / 会社情報
Contact / お問い合わせ
```

Compact version:

```text
Business
Work
About
Contact
```

---

# 15. Page Structure Recommendation

这不是视觉模板，只是内容优先级。

## Recommended Core

```text
01 Hero
02 What We Do / 3 Businesses
03 Customer Problem
04 Implementation Flow
05 Selected Work
06 Why MindX / Philosophy
07 Fields
08 Robotics Direct Store
09 Company
10 Contact
```

## Minimum Viable Corporate Site

极端实验路线、单页互动路线至少必须表达清楚：

```text
Hero
3 Businesses
Selected Work
About / Philosophy
Company + Contact
```

不能因为做 Shader / 3D / Experimental route，就只剩视觉而看不出公司是做什么的。

---

# 16. Metrics Policy / 数字使用规则

旧版 `mindx.co.jp` 当前公开：

- 12件 成功プロジェクト
- 2回 分析レポート
- 5回 受賞
- 90% 満足顧客度

这些数字虽然出现在官方页面，但目前缺少公开解释、计算口径或可核验依据。

## Recommendation

**下一版官网默认不使用这四个数字。**

如果未来确认了来源和口径，可以再恢复。

禁止为了做视觉上的 Counter / Stats section 而改成其他数字或用 `0` 填充。

更好的 Social Proof 顺序：

1. 真实公开案例。
2. 真实产品 / 直营业务。
3. 可公开的合作项目。
4. 有明确口径的数字。
5. 最后才是抽象的品牌宣言。

---

# 17. Copy Style Guide

## Tone

- 清晰。
- 技术感，但不写“AI 味很重”的空话。
- 有未来感，但不夸大。
- 企业可信度优先于广告腔。
- 一句话尽量只表达一个意思。

## Prefer

- `実装する`
- `業務につなぐ`
- `使われ続ける`
- `課題を整理する`
- `検証する`
- `改善する`
- `Human + AI`
- `Data + Wisdom`

## Avoid

- 革新的な / 圧倒的な / 世界最高 / 次世代 / 最先端 を每段反复使用。
- “AIで何でもできます”式表达。
- 只有抽象理念，没有 Business / Work / Contact。
- 英文装饰词多到妨碍日本用户理解。

---

# 18. SEO Baseline

## Recommended Title

`MindX株式会社｜AIを業務と社会に実装する` 

## Recommended Meta Description

`MindX株式会社は、AIエージェント、業務システム、コンサルティング、ロボット事業を通じて、AIを実際の業務と社会へ実装するITソリューション企業です。課題整理から検証、本番開発、運用改善まで支援します。`

## Core Keywords

```text
MindX株式会社
AI開発
AIエージェント
生成AI
システム開発
AIコンサルティング
業務システム
ロボット
ロボティクス
AI導入
DX
東京
```

> Keyword stuffing 不要做。关键词只用于信息架构、title、description、heading 的自然表达。

---

# 19. Content Invariants for 20–100 Routes

未来批量生成多路线时，每个 Route 的 prompt 应附带本段规则：

```text
CONTENT SOURCE OF TRUTH:
Use docs/SITE_CONTENT_SOURCE_OF_TRUTH.md.

You may radically change visual language, interaction, layout, motion,
typography, section order, and information density.

You may shorten copy, but must preserve its meaning.

Do not invent clients, awards, certifications, project metrics,
partnerships, revenue, employee counts, technologies, or results.

The visitor must understand within the first screen or immediately after it:
1. MindX is an AI / IT solutions company in Japan.
2. It works across AI products, consulting/system development, and robotics.
3. It focuses on implementation into real business and society.

Every route must retain a usable path to Contact.
```

---

# 20. What We Learned from Comparable Sites

本次内容优化不是复制某一家，而是吸收同类优秀企业官网常见的有效结构。

## LayerX

值得吸收：

- Mission / core message 非常短。
- Business 被压缩成少数清晰业务块。
- 产品和真实业务比抽象技术词更靠前。

MindX 对应做法：三事业明确，不再把官网写成能力清单。

## PKSHA Technology

值得吸收：

- Vision → Business → Proof 的顺序清晰。
- 清楚解释 AI Solution 和实际业务之间的关系。
- Social Proof 建立在真实导入与业务上。

MindX 对应做法：公开案例优先于不透明的 Stats Counter。

## Preferred Networks

值得吸收：

- 一句话把技术定位讲透。
- 技术能力与现实行业应用连接紧密。
- Corporate philosophy 与 business architecture 是同一套故事。

MindX 对应做法：把 `Human + AI / Data + Wisdom / Digital + Physical` 统一成同一个品牌世界观。

## Third Scope / AI implementation companies

值得吸收：

- 从 Requirement / PoC / Build 到 Operation 的 end-to-end 过程表达。
- 不是单纯卖“AI”，而是告诉客户怎么把 AI 接进业务。

MindX 对应做法：加入 `Scope → Verify → Prove → Build → Run` 实装流程。

## AI Japan / implementation-first sites

值得吸收：

- 用真实业务场景来解释 AI，而不是大段解释 AI 本身。
- CTA 更接近客户问题，例如 adoption / development consultation。

MindX 对应做法：CTA 统一到 `AI・システム開発を相談する`，不使用模糊的 `Learn More` 作为主行动。

---

# 21. Source Notes

本文件基于 2026-09-14 时点公开信息与本仓当前官网路线整理。

## Primary Sources

- MindX 公式サイト: `https://www.mindx.co.jp/`
- MindX Arena / current publishing surface: `https://mindx.distributor.co.jp/`
- Mobility & Robotics: `https://mobility.distributor.co.jp/`

## Comparable References

- LayerX: `https://layerx.co.jp/`
- PKSHA Technology: `https://www.pkshatech.com/`
- Preferred Networks: `https://www.preferred.jp/`
- Third Scope: `https://third-scope.com/`
- AI Japan: `https://ai-ja.jp/`

---

# 22. Final Content Principle

## 未来感は、言葉を難しくすることではない。

MindX の次期サイトで最も重要なのは、3秒で「AIっぽい会社」に見えることではなく、短時間で次のことが伝わること。

**何をしている会社か。**

AI・IT・ロボティクスを、実際の業務と社会に実装する会社。

**どう進める会社か。**

課題整理 → 検証 → 本番実装 → 運用改善までつなぐ。

**何を大切にしているか。**

人とAIが協調し、人がより価値ある仕事に集中できる未来。

この骨格を固定した上で、次の Arena ではデザインを思い切り振る。
