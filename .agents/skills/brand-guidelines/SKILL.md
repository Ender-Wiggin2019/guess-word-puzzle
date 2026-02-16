---
name: brand-guidelines
description: 中文猜词游戏的品牌设计指南。浅色典雅主题，融合minimal设计与水墨意境。适用于需要遵循游戏视觉风格的界面设计、组件开发等场景。
license: Complete terms in LICENSE.txt
---

# 猜字解底 - 品牌设计指南

## 设计理念

以「留白」为核心理念，融合传统水墨意境与现代极简设计。界面如宣纸般素雅，文字如墨迹般灵动。追求「少即是多」的东方美学，让用户在猜词的过程中感受文字之美。

**关键词**: 水墨、留白、典雅、极简、自然、意境

## 色彩系统

### 主色调

以水墨为灵感，建立从浓到淡的灰阶体系：

| 名称 | 色值 | 用途 |
|------|------|------|
| 浓墨 | `#1a1a1a` | 标题、重点文字 |
| 中墨 | `#3d3d3d` | 正文文字 |
| 淡墨 | `#666666` | 次要文字、说明 |
| 浅灰 | `#999999` | 辅助文字、placeholder |
| 痕迹 | `#cccccc` | 分割线、边框 |

### 背景色

| 名称 | 色值 | 用途 |
|------|------|------|
| 宣纸 | `#faf8f5` | 主背景 |
| 米白 | `#f5f2ed` | 卡片背景 |
| 象牙 | `#f0ebe3` | hover状态、强调区域 |
| 暖灰 | `#e8e4dc` | 禁用状态、次级背景 |

### 点缀色

取自自然，用于交互反馈与状态提示：

| 名称 | 色值 | 用途 |
|------|------|------|
| 青瓷 | `#486e6c` | 主题色、按钮、链接 |
| 青浅 | `#8eaaa5` | 次要点缀、页脚 |
| 墨绿 | `#4a5d4a` | 成功状态、正确答案 |
| 朱砂 | `#c45c48` | 错误提示、重要警示 |
| 靛蓝 | `#4a5c6d` | 辅助色 |
| 金茶 | `#8b7355` | 特殊成就、奖励 |

## 字体规范

### 中文字体

```
标题: "Noto Serif SC", "Source Han Serif SC", "思源宋体", serif
正文: "Noto Sans SC", "Source Han Sans SC", "思源黑体", sans-serif
```

- **标题**: 宋体风格，体现传统印刷之美，笔画有书法韵味
- **正文**: 黑体风格，保证阅读舒适度，现代感与可读性兼具

### 字体大小

```css
--font-size-xs: 12px;    /* 辅助信息 */
--font-size-sm: 14px;    /* 次要文字 */
--font-size-base: 16px;  /* 正文 */
--font-size-lg: 18px;    /* 小标题 */
--font-size-xl: 24px;    /* 标题 */
--font-size-2xl: 32px;   /* 大标题 */
--font-size-3xl: 48px;   /* 展示标题 */
```

### 行高与间距

```css
--line-height-tight: 1.4;   /* 标题 */
--line-height-normal: 1.6;  /* 正文 */
--line-height-loose: 1.8;   /* 长文本 */
```

## 设计原则

### 1. 留白至上

- 元素间距充足，呼吸感强
- 内容区域占屏幕60-70%，余为留白
- 避免信息过载，每个界面聚焦一个任务

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### 2. 水墨意境

- 使用柔和的阴影而非硬边框
- 渐变过渡自然，如墨水晕染
- 适当使用半透明效果营造层次

```css
/* 水墨阴影 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);

/* 晕染效果 */
.ink-wash {
  background: radial-gradient(ellipse at center,
    rgba(26, 26, 26, 0.02) 0%,
    transparent 70%);
}
```

### 3. 宣纸质感

背景添加微妙的噪点纹理，模拟宣纸的斑驳质感：

```css
/* 全局宣纸纹理 */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,..."); /* SVG 噪点 */
}

/* 卡片局部纹理 */
.paper-texture::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.25;
  background-image: url("data:image/svg+xml,..."); /* SVG 噪点 */
}
```

### 4. 动韵流转

动画应如笔势流动，自然流畅：

```css
/* 缓动曲线 - 模拟运笔 */
--ease-brush: cubic-bezier(0.4, 0, 0.2, 1);
--ease-ink-spread: cubic-bezier(0, 0, 0.2, 1);

/* 动画时长 */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

## 组件规范

### 按钮

```css
/* 主按钮 - 墨韵风格 */
.btn-primary {
  background: var(--ink-dark);
  color: var(--paper);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: 2px;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  transition: all var(--duration-normal) var(--ease-brush);
}

.btn-primary:hover {
  background: var(--ink-medium);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* 次要按钮 - 线条风格 */
.btn-secondary {
  background: transparent;
  color: var(--ink-dark);
  border: 1px solid var(--trace);
  /* ... */
}
```

### 卡片

```css
.card {
  background: var(--rice-white);
  border: none;
  border-radius: 4px;
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
}
```

### 输入框

```css
.input {
  background: var(--paper);
  border: 1px solid var(--trace);
  border-radius: 2px;
  padding: var(--spacing-sm) var(--spacing-md);
  transition: border-color var(--duration-fast);
}

.input:focus {
  outline: none;
  border-color: var(--indigo);
  box-shadow: 0 0 0 2px rgba(74, 92, 109, 0.1);
}
```

## 图标与装饰

- 使用线性图标，线条粗细1.5px
- 圆角适度，避免过于圆润
- 可适当使用印章、水墨点等装饰元素

## 响应式断点

```css
--breakpoint-sm: 640px;   /* 手机横屏 */
--breakpoint-md: 768px;   /* 平板竖屏 */
--breakpoint-lg: 1024px;  /* 平板横屏/小桌面 */
--breakpoint-xl: 1280px;  /* 桌面 */
```

## 无障碍

- 文字与背景对比度至少4.5:1
- 交互元素最小点击区域44x44px
- 支持键盘导航与屏幕阅读器

## CSS变量汇总

```css
:root {
  /* 色彩 */
  --ink-dark: #1a1a1a;
  --ink-medium: #3d3d3d;
  --ink-light: #666666;
  --gray: #999999;
  --trace: #cccccc;

  --paper: #faf8f5;
  --rice-white: #f5f2ed;
  --ivory: #f0ebe3;
  --warm-gray: #e8e4dc;

  --cyan: #486e6c;
  --cyan-light: #8eaaa5;
  --green: #4a5d4a;
  --vermilion: #c45c48;
  --indigo: #4a5c6d;
  --gold: #8b7355;

  /* 字体 */
  --font-serif: "Noto Serif SC", "Source Han Serif SC", serif;
  --font-sans: "Noto Sans SC", "Source Han Sans SC", sans-serif;

  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* 动画 */
  --ease-brush: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
}
```
