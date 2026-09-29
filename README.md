# Express WebSocket Dashboard

Real-time page metrics over WebSocket, plus a product catalog from a REST API. The UI is React (Vite, Tailwind, Chart.js). The API is Express with `ws`, sharing one HTTP server with the socket.

In development the browser talks to Vite; Vite proxies `/api` and `/ws` to Express. In production Express serves the built UI on the same port as the API and WebSocket.

## Requirements

- Node.js 20.6 or newer (22 recommended)
- pnpm 12.6, pinned in `package.json` (`corepack enable pnpm`)

## Setup

```bash
git clone https://github.com/emisasal/express-websocket.git
cd express-websocket
corepack enable pnpm
pnpm install
```

Optional: `cp .env.example .env` and set `PORT` (default `8080`).

### Development

```bash
pnpm dev
```

Open http://localhost:5173. Vite proxies:

- `GET /api` → Express catalog
- `ws://localhost:5173/ws` → Express WebSocket

The API itself listens on `http://127.0.0.1:8080` (or `PORT`).

### Production (one origin)

```bash
pnpm build
pnpm start
```

Express serves `frontend/dist`, `/api`, and `/ws` on `PORT`.

## Scripts

| Command                                  | What it does                                 |
| ---------------------------------------- | -------------------------------------------- |
| `pnpm dev`                               | Backend + Vite together                      |
| `pnpm dev:backend` / `pnpm dev:frontend` | Run one side                                 |
| `pnpm build`                             | Typecheck backend, production-build frontend |
| `pnpm start`                             | Serve the built UI and API from Express      |
| `pnpm test`                              | Vitest across shared, backend, and frontend  |
| `pnpm lint`                              | ESLint on the frontend                       |
| `pnpm format` / `pnpm format:check`      | Prettier                                     |

CI (GitHub Actions) runs format check, lint, tests, and build on push and pull requests.

## Environment

| Variable              | Default                  | Used by                                                                                 |
| --------------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `PORT`                | `8080`                   | Express listen port; Vite proxy target                                                  |
| `BACKEND_ORIGIN`      | `http://127.0.0.1:$PORT` | Vite proxy if the API is not local                                                      |
| `FRONTEND_DIST`       | `frontend/dist`          | Production static files                                                                 |
| `METRICS_INTERVAL_MS` | `5000`                   | WebSocket broadcast interval                                                            |
| `LOG_LEVEL`           | `info`                   | Server logs (`debug` `info` `warn` `error`). Use `debug` to log each metrics broadcast. |
| `VITE_API_BASE`       | empty (same origin)      | Frontend HTTP prefix                                                                    |
| `VITE_WS_URL`         | `ws(s)://{host}/ws`      | Frontend WebSocket URL                                                                  |

## HTTP API

| Method | Path       | Result                                               |
| ------ | ---------- | ---------------------------------------------------- |
| `GET`  | `/api`     | `{ "items": [...] }`                                 |
| `GET`  | `/api/:id` | One item, or `400` / `404` JSON `{ "error": "..." }` |

Catalog data is loaded once from `backend/src/mocks/mockData.json`.

## WebSocket

Path: `/ws`.

On connect, and every `METRICS_INTERVAL_MS`, the server sends a JSON array of `{ name, pv, uv }` (page views / unique visitors). Payloads are validated with the shared Zod schema in `packages/shared`.

## Layout

```
backend/             Express, WebSocket, catalog
frontend/            Vite + React dashboard
packages/shared/     Zod schemas for metrics and catalog
```

## Technologies

- TypeScript 6, pnpm workspaces
- Node.js, Express 5, `ws`, tsx
- React 19, Vite 8, Tailwind 4, Chart.js
- Zod, Vitest, Prettier, ESLint
