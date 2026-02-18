# 第一课：从零开始使用 AI 搭建猜词游戏

欢迎来到 AI 编程入门课程！本课程将带你从零开始，使用 AI 工具（如 OpenCode、Trae、Cursor）搭建一个完整的中文猜词游戏项目。

## 目录

1. [环境准备](#1-环境准备)
2. [API Key 申请](#2-api-key-申请)
3. [项目初始化](#3-项目初始化)
4. [理解项目规则](#4-理解项目规则)
5. [AI 生成 UI 设计](#5-ai-生成-ui-设计)
6. [实现游戏功能](#6-实现游戏功能)

---

## 1. 环境准备

在开始之前，我们需要安装一些必要的软件。请根据你的操作系统选择对应的安装方式。

### 1.1 安装 Node.js

Node.js 是 JavaScript 的运行环境，我们的项目需要它来运行。

#### macOS

**方式一：使用官方安装包（推荐新手）**

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS（长期支持）版本，目前推荐 20.x 或更高版本
3. 双击下载的 `.pkg` 文件，按提示完成安装

**方式二：使用 Homebrew（如果你已经安装了 Homebrew）**

打开「终端」应用，输入：

```bash
brew install node@20
```

#### Windows

**方式一：使用官方安装包（推荐新手）**

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS（长期支持）版本的 Windows 安装包（.msi 文件）
3. 双击安装包，按提示完成安装
4. 安装完成后，**重启电脑**以确保环境变量生效

**方式二：使用 winget（Windows 11 自带）**

打开「命令提示符」或「PowerShell」，输入：

```powershell
winget install OpenJS.NodeJS.LTS
```

### 1.2 验证 Node.js 安装

安装完成后，打开终端（macOS）或命令提示符/PowerShell（Windows），输入以下命令验证安装：

```bash
node --version
npm --version
```

如果看到版本号（如 `v20.11.0` 和 `10.2.4`），说明安装成功。

### 1.3 安装 pnpm

pnpm 是一个快速、节省磁盘空间的包管理器，我们的项目使用它来管理依赖。

#### macOS

```bash
npm install -g pnpm
```

#### Windows

打开 PowerShell（以管理员身份运行），输入：

```powershell
npm install -g pnpm
```

验证安装：

```bash
pnpm --version
```

### 1.4 安装 Git

Git 是版本控制工具，用于下载和管理代码。

#### macOS

**方式一：安装 Xcode 命令行工具（推荐）**

```bash
xcode-select --install
```

会弹出一个对话框，点击「安装」即可。

**方式二：使用 Homebrew**

```bash
brew install git
```

#### Windows

1. 访问 [Git 官网](https://git-scm.com/download/win)
2. 下载 Windows 安装包
3. 运行安装程序，大部分选项保持默认即可
4. 安装完成后重启终端

验证安装：

```bash
git --version
```

### 1.5 安装 AI 编程工具

选择以下任一工具：

| 工具 | 下载地址 | 特点 |
|------|----------|------|
| **OpenCode** | [github.com/opencode](https://github.com/opencode-ai/opencode) | 命令行工具，轻量级 |
| **Cursor** | [cursor.sh](https://cursor.sh) | VS Code 增强版，功能丰富 |
| **Trae** | [trae.ai](https://trae.ai) | 字节跳动出品，中文友好 |

**推荐新手使用 Cursor**，因为它有完整的图形界面，上手更简单。

---

## 2. API Key 申请

AI 编程工具需要连接大语言模型（LLM）才能工作。你需要申请一个 API Key。

### 2.1 选择模型提供商

| 提供商 | 特点 | 价格 |
|--------|------|------|
| **OpenAI** | GPT-4，能力强 | 按量付费 |
| **Anthropic** | Claude，代码能力强 | 按量付费 |
| **DeepSeek** | 国产，性价比高 | 按量付费，较便宜 |
| **硅基流动** | 多模型聚合 | 按量付费 |

### 2.2 申请 API Key（以 DeepSeek 为例）

1. 访问 [DeepSeek 官网](https://platform.deepseek.com/)
2. 注册并登录账号
3. 进入「API Keys」页面
4. 点击「创建 API Key」
5. 复制生成的 Key（**注意：Key 只会显示一次，请妥善保存**）

### 2.3 配置 AI 工具

#### Cursor 配置

1. 打开 Cursor
2. 按 `Cmd + Shift + J`（macOS）或 `Ctrl + Shift + J`（Windows）打开设置
3. 找到「Models」或「API」设置
4. 粘贴你的 API Key
5. 选择你要使用的模型

#### OpenCode 配置

在项目根目录创建 `.env` 文件：

```bash
# macOS/Linux
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env

# Windows PowerShell
"ANTHROPIC_API_KEY=your-api-key-here" | Out-File -FilePath .env -Encoding utf8
```

---

## 3. 项目初始化

### 3.1 创建项目文件夹

首先，创建一个存放项目的文件夹：

#### macOS

```bash
# 进入文档目录
cd ~/Documents

# 创建项目文件夹
mkdir guess-word-puzzle

# 进入项目文件夹
cd guess-word-puzzle
```

#### Windows

打开 PowerShell 或命令提示符：

```powershell
# 进入文档目录
cd $HOME\Documents

# 创建项目文件夹
mkdir guess-word-puzzle

# 进入项目文件夹
cd guess-word-puzzle
```

### 3.2 克隆项目脚手架

我们提供了一个预配置好的项目模板，包含了 React、Hono、SQLite 等技术栈：

```bash
git clone git@github.com:Ender-Wiggin2019/full-stack-starter.git .
```

> **注意**：末尾的 `.` 表示克隆到当前目录。如果提示目录不为空，可以先删除现有文件或选择新目录。

### 3.3 安装依赖

```bash
pnpm install
```

这个过程可能需要几分钟，取决于你的网络速度。

### 3.4 初始化数据库

```bash
pnpm db:push
```

### 3.5 启动开发服务器

```bash
pnpm dev
```

启动成功后，你会看到类似输出：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

打开浏览器访问 `http://localhost:5173`，你应该能看到项目首页。

---

## 4. 理解项目规则

### 4.1 项目架构

这是一个 **Monorepo**（单一仓库）项目，包含三个层级：

| 层级 | 路径 | 用途 |
|------|------|------|
| **common** | `packages/common/` | 共享类型、验证规则、常量 |
| **server** | `packages/server/` | 后端 API、数据库操作 |
| **client** | `packages/client/` | 前端页面、UI 组件 |

### 4.2 技术栈一览

| 类别 | 技术 |
|------|------|
| 语言 | TypeScript |
| 包管理 | pnpm (workspace) |
| 前端 | React 18 + React Router 7 + Vite |
| 后端 | Hono |
| 数据库 | SQLite |
| ORM | Drizzle |
| 样式 | Tailwind CSS + shadcn/ui |
| 状态管理 | Zustand |
| 数据请求 | TanStack Query (React Query) |
| 数据验证 | Zod |

### 4.3 开发规范

项目有一个 `AGENTS.md` 文件，定义了开发规则。当你使用 AI 编程时，AI 会自动读取这些规则。

**核心规则**：

1. **共享内容放 common**：类型定义、验证规则、常量
2. **后端逻辑放 server**：API 端点、数据库操作
3. **前端逻辑放 client**：UI 组件、Hooks、状态
4. **API 请求流程**：先在 server 创建端点 → 在 client 创建 service → 在 hooks 中使用

---

## 5. AI 生成 UI 设计

现在，让我们开始使用 AI 来设计界面。

### 5.1 设计主题

在 AI 工具中输入以下 prompt：

```
参考一下 .agents/skills/frontend-design/，先为我实现一个网页的主题设计。写入到 .agents/skills/brand-guidelines/。这是一个中文的猜词游戏，我希望是浅色典雅主题，参考 minimal 的设计，可以有点文字的水墨感觉。
```

AI 会为你生成一个完整的品牌设计指南，包括：

- **设计理念**：水墨、留白、典雅、极简
- **色彩系统**：墨色系 + 宣纸背景色 + 青瓷点缀
- **字体规范**：宋体标题 + 黑体正文
- **组件规范**：按钮、卡片、输入框样式

### 5.2 应用设计

```
我觉得可以，你先应用到目前的项目看看效果
```

AI 会将设计指南应用到 Tailwind 配置和全局样式中。

### 5.3 细化设计

如果需要调整，可以继续与 AI 对话：

```
看看背景能不能有一点点斑驳的质感，就像宣纸一样？另外，主题色稍微加一点青绿色点缀
```

---

## 6. 实现游戏功能

### 6.1 定义数据类型

首先，在 common 层定义游戏数据结构：

```
接下来我希望你在 common 里面实现一个 GuessGameItem 的类型定义，和 OfficialGuessGameCollection 的常量数组，规则如下：

## Game

这是一个猜词游戏，一局游戏的 Game 设定是:

1. 一个独立 ID，例如"A001"
2. 一个中文单字A，唯一对应这个 ID
3. 一个对象列表，每个对象包括：
   - 一个独立ID，规则应该是"A001_1"，即独立ID+数组ID
   - 一个中文单字B (规则上这个单字必须要可以和上面的中文单字可以组成一个二字词汇，也就是A+B或者B+A)
   - 一个可选数组，数组中也是一系列单字[C, D]，规则是这里面的单字必须和单字B组成二字词汇，如BC,BD

为我实现一下类型定义，一个合法的 Item 应该是：

{
  id: 'A001',
  char: '问',
  relatedChars: [
    {
      id: 'A001_1',
      char: '号',
      concatChars: ['码', '编'], // 号码, 编号
    },
    // ...
  ]
}
```

### 6.2 创建挑战页面

```
接下来为我新增一个 challenges 页面，这是一个列表页面，每个页面对应一个 OfficialGuessGameCollection 的题目。每个题目有三种显示模式：简单难度，中等难度，困难难度...

[详细描述页面布局和交互逻辑]
```

### 6.3 添加游戏规则弹窗

```
另外你需要在 challenges 页面加一个 info Icon（使用 font awesome），点击会展示弹窗，方便用户了解游戏规则...
```

### 6.4 生成游戏题目

```
生成一个猜词的题目，放在 common 层的 AIGuessGameCollection 里面。规则是：

1. 先构想一个中心字，这个字必须是目前没有出现过的中心字
2. 对于这个中心字，构想5个可以与它组成二字词汇的词汇
3. 对于第二步生成的每个字，再构想两个字...
```

---

## 常见问题

### Q: pnpm install 报错怎么办？

**macOS**: 可能是权限问题，尝试：
```bash
sudo chown -R $(whoami) ~/.pnpm-store
```

**Windows**: 以管理员身份运行 PowerShell

### Q: 数据库初始化失败？

确保你已经在项目根目录执行了 `pnpm db:push`。

### Q: AI 生成的代码有错误？

告诉 AI 具体的错误信息，它会帮你修复。例如：
```
运行 pnpm build 报错了，错误信息是：[粘贴错误信息]
```

### Q: 如何查看项目的完整代码？

项目已上传到 GitHub：[guess-word-puzzle](https://github.com/your-repo/guess-word-puzzle)

---

## 下一步

完成第一课后，你已经：

- [x] 配置好了开发环境
- [x] 理解了项目架构
- [x] 学会了使用 AI 生成 UI 设计
- [x] 实现了基本的游戏功能

**第二课预告**：接入 Cloudflare D1 数据库，实现用户登录和成绩保存。

---

## 附录：常用命令速查

| 命令 | 说明 | macOS | Windows |
|------|------|-------|---------|
| 查看当前目录 | 显示所在文件夹路径 | `pwd` | `cd` |
| 列出文件 | 显示当前目录内容 | `ls` | `dir` |
| 进入目录 | 切换到指定目录 | `cd 目录名` | `cd 目录名` |
| 返回上级 | 返回上一级目录 | `cd ..` | `cd ..` |
| 创建目录 | 新建文件夹 | `mkdir 文件夹名` | `mkdir 文件夹名` |
| 删除文件 | 删除指定文件 | `rm 文件名` | `del 文件名` |
| 清屏 | 清空终端显示 | `clear` | `cls` |
