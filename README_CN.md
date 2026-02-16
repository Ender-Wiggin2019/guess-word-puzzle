# Starter

简体中文 | [English](./README.md)

一个全栈 TypeScript monorepo 脚手架模板。

## 技术栈

| 类别 | 技术 |
|------|------|
| 语言 | TypeScript |
| 包管理器 | pnpm (workspace) |
| 前端 | React 18 + React Router 7 + Vite |
| 后端 | Hono |
| 数据库 | SQLite |
| ORM | Drizzle |
| 样式 | Tailwind CSS + shadcn/ui |
| 状态管理 | Zustand |
| 数据请求 | TanStack Query (React Query) |
| 校验 | Zod |
| 代码规范 | ESLint 9 (flat config) |

## 项目结构

```
├── packages/
│   ├── common/          # 共享类型、Zod schemas、常量
│   │   └── src/
│   │       └── index.ts
│   ├── server/          # 后端 API
│   │   ├── src/
│   │   │   ├── db/      # Drizzle schema & 连接
│   │   │   └── index.ts # Hono 入口
│   │   └── drizzle.config.ts
│   └── client/          # 前端应用
│       └── src/
│           ├── components/ui/  # shadcn 组件
│           ├── hooks/          # 自定义 hooks
│           ├── lib/            # 工具函数
│           ├── routes/         # 路由组件
│           ├── services/       # API 服务函数
│           ├── store/          # Zustand 状态
│           └── main.tsx
├── pnpm-workspace.yaml
└── package.json
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装

```bash
pnpm install
```

### 数据库初始化

```bash
pnpm db:push    # 推送 schema 到 SQLite
```

### 开发

```bash
pnpm dev
```

- 前端: http://localhost:5173
- 后端: http://localhost:3000

### 构建

```bash
pnpm build
```

## 脚本命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（前后端并行） |
| `pnpm dev:client` | 仅启动前端开发服务器 |
| `pnpm dev:server` | 仅启动后端开发服务器 |
| `pnpm build` | 构建所有包 |
| `pnpm lint` | 对所有包运行 ESLint |
| `pnpm lint:fix` | 自动修复 ESLint 问题 |
| `pnpm db:push` | 推送 Drizzle schema 到数据库 |
| `pnpm db:generate` | 生成 Drizzle 迁移文件 |

## 三层架构

| 层级 | 路径 | 职责 |
|------|------|------|
| **common** | `packages/common/` | 共享类型、Zod schemas、常量、静态配置 |
| **server** | `packages/server/` | 后端 API，使用 Drizzle ORM 和 Zod 校验 |
| **client** | `packages/client/` | 前端 React 应用 |

### 添加新功能的决策流程

1. **是否可共享？**（类型、schemas、常量）→ 放到 `common`
2. **是否是后端逻辑？**（API、数据库）→ 放到 `server`
3. **是否是前端逻辑？**（UI、hooks、状态）→ 放到 `client`

## 添加 shadcn 组件

```bash
cd packages/client
pnpm dlx shadcn@latest add <组件名>
```

示例：
```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add form
```

## HTTP 请求封装

`@/lib/request.ts` 提供了类型化的 fetch 封装：

```ts
import { get, post, put, del } from '@/lib/request';

// GET
const messages = await get<Message[]>('/messages');

// POST
const newMessage = await post<Message>('/messages', { content: 'Hello' });

// PUT
await put('/messages/1', { content: 'Updated' });

// DELETE
await del('/messages/1');
```

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/messages` | 获取所有消息 |
| POST | `/api/messages` | 创建消息 |

## 开发规范

1. **HTTP 请求** - 统一使用 `@/lib/request` 中的封装函数（`get`, `post`, `put`, `del`），不要直接使用 `fetch`
2. **服务层** - 在组件或 hooks 中使用 API 之前，先在 `services/` 中创建对应的服务函数
3. **类型共享** - 使用 `common` 包中的共享类型

## License

MIT
