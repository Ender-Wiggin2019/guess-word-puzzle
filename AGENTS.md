# Agent Guidelines

## Project Architecture

This is a monorepo with three layers. Before implementing any feature, consider which layers need changes:

| Layer | Path | Purpose |
|-------|------|---------|
| **common** | `packages/common/` | Shared types, Zod schemas, constants, static config |
| **server** | `packages/server/` | Backend API, uses Drizzle ORM and Zod for validation |
| **client** | `packages/client/` | Frontend React application |

### Decision Flow

When adding new functionality:

1. **Is it shareable?** (types, schemas, constants) → Put in `common`
2. **Is it backend logic?** (API endpoints, database) → Put in `server`
3. **Is it frontend logic?** (UI, hooks, state) → Put in `client`

### Example: Adding a new feature

| What | Where |
|------|-------|
| TypeScript types | `common/src/{domain}.ts` |
| Zod validation schemas | `common/src/{domain}.ts` |
| Database table schema | `server/src/db/schema.ts` |
| API endpoint | `server/src/index.ts` |
| Service function | `client/src/services/*.ts` |
| React Query hook | `client/src/hooks/*.ts` |
| UI component | `client/src/routes/*.tsx` or `client/src/components/*.tsx` |

## API Request Flow

When adding a new backend endpoint, follow this workflow:

### 1. Backend: Create the endpoint

Add the endpoint in `packages/server/src/index.ts` (or create a dedicated routes file).

### 2. Client: Create a service function

Before using the API in components or hooks, create a corresponding function in `packages/client/src/services/`.

**Example:**

```ts
// packages/client/src/services/example.ts
import { get, post, put, del } from '@/lib/request';
import type { Example, CreateExample, UpdateExample } from 'common';

export const getExamples = () => get<Example[]>('/examples');

export const getExampleById = (id: number) => get<Example>(`/examples/${id}`);

export const createExample = (data: CreateExample) =>
  post<Example>('/examples', data);

export const updateExample = (id: number, data: UpdateExample) =>
  put<Example>(`/examples/${id}`, data);

export const deleteExample = (id: number) => del(`/examples/${id}`);
```

### 3. Client: Use the service in hooks

Import and use the service function in your React Query hooks:

```ts
// packages/client/src/hooks/useExample.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExamples, createExample } from '@/services/example';
import type { CreateExample } from 'common';

export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: getExamples,
  });
}

export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExample) => createExample(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examples'] });
    },
  });
}
```

## Rules

- **Always use the wrapped request functions** (`get`, `post`, `put`, `patch`, `del`) from `@/lib/request` for HTTP requests. Do not use raw `fetch`.
- **Always create a service function first** before consuming an API in components or hooks.
- **Keep services organized** by feature/domain (e.g., `message.ts`, `user.ts`, `auth.ts`).
- **Use shared types** from the `common` package for request/response types.
- **Organize common package by domain**: Each domain (e.g., `message`, `user`, `guessGame`) should have its own file in `packages/common/src/`. Export all from `index.ts`.

## Code Quality

Before committing, ensure:

- `pnpm lint` passes without errors
- `pnpm build` completes successfully
