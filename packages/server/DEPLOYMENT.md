# Server 部署文档

## 环境要求

- Node.js >= 20
- pnpm >= 9

---

## 本地开发

### 1. 安装依赖

```bash
pnpm install
```

### 2. 生成数据库迁移（首次或 schema 变更后）

```bash
cd packages/server
pnpm db:generate
```

### 3. 应用迁移到本地 D1 数据库

```bash
npx wrangler d1 migrations apply guess-word-puzzle-db --local
```

### 4. 构建并启动开发服务器

```bash
pnpm build
pnpm dev
```

服务运行在 http://localhost:3000

### 5. 与前端联调

```bash
# 终端1 - 后端
cd packages/server && pnpm dev

# 终端2 - 前端
cd packages/client && pnpm dev
```

### 本地数据存储

本地 D1 数据库文件位于 `.wrangler/state/v3/d1/`

---

## 生产部署

### 前置条件

1. 拥有 Cloudflare 账号
2. 已安装 Wrangler CLI

### 1. 登录 Cloudflare

```bash
# 如果有代理问题，先运行：unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY
npx wrangler login
```

会打开浏览器进行授权。

### 2. 创建 D1 数据库

```bash
cd packages/server
npx wrangler d1 create guess-word-puzzle-db
```

输出示例：
```
✅ Successfully created DB 'guess-word-puzzle-db'
[[d1_databases]]
binding = "DB"
database_name = "guess-word-puzzle-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 3. 更新 wrangler.toml

将输出的 `database_id` 填入 `wrangler.toml`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "guess-word-puzzle-db"
database_id = "你的数据库ID"  # 替换这里
migrations_dir = "drizzle"
```

### 4. 应用迁移到生产数据库

> **注意**：所有 wrangler 命令必须在 `packages/server` 目录下运行，否则会找不到 wrangler.toml 配置。

```bash
cd packages/server
npx wrangler d1 migrations apply guess-word-puzzle-db --remote
```

### 5. 部署 Worker

```bash
pnpm deploy
```

部署成功后会输出 Worker URL，例如：
```
https://guess-word-puzzle.你的账号.workers.dev
```

### 6. 更新前端 API 地址

在 `packages/client` 中更新生产环境 API 地址为 Worker URL。

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 本地开发服务器 |
| `pnpm build` | 构建生产代码 |
| `pnpm deploy` | 部署到 Cloudflare |
| `pnpm db:generate` | 生成迁移文件 |
| `wrangler d1 migrations apply <db> --local` | 本地数据库迁移 |
| `wrangler d1 migrations apply <db> --remote` | 生产数据库迁移 |
| `wrangler d1 execute <db> --local --command="SQL"` | 本地执行 SQL |
| `wrangler tail` | 实时查看日志 |

---

## 免费额度

Cloudflare Workers 免费计划：
- 每日 100,000 次请求
- D1 数据库 5GB 存储
- 无冷启动问题

---

## 故障排查

### 本地开发报错 "no such table"

需要先运行迁移：
```bash
npx wrangler d1 migrations apply guess-word-puzzle-db --local
```

### 部署后 API 报错

检查数据库迁移是否已应用到远程：
```bash
npx wrangler d1 migrations apply guess-word-puzzle-db --remote
```

### 查看生产日志

```bash
npx wrangler tail
```
