# Express and Websocket

## Description

This project is a real-time data visualization application built using Express.js for the API and WebSocket for communication.
It sends random data from the server to the frontend every 5 seconds, which is then displayed as a dynamic bar chart.
This allows users to see live updates of the data without needing to refresh the page.

## Table of Contents

- [Objectives](#objectives)
- [Installation](#installation)
- [Technologies](#technologies)

## Objectives

- Create an API using Express.js and WebSocket with TypeScript sharing the same port.
- Send random data from the server to the frontend every 5 seconds using WebSockets with "ws" dependency.
- Display the data as a dynamic bar chart.
- Obtain data from http endpoint and display it in the frontend.

## Installation

To set up the project, follow these steps:

1. Clone the repository: `git clone https://github.com/emisasal/express-websocket.git`
2. Navigate to the project directory: `cd express-websocket`
3. Enable Corepack (ships with Node.js) so the repo’s pinned pnpm version is used: `corepack enable pnpm`
4. Install dependencies from the project root: `pnpm install`
5. Optionally copy `.env.example` to `.env` and set `PORT` (defaults to 8080)
6. Start backend and frontend from the project root: `pnpm dev`
   - UI: http://localhost:5173 (Vite proxies `/api` and `/ws` to Express)
   - Production: `pnpm build` then `pnpm start` (Express serves the UI on `PORT`)
7. Run tests: `pnpm test`

## Technologies

- TypeScript

**Backend:**

- Node.js
- Express.js
- ws (WebSocket)

**Frontend:**

- React (Vite) with Tailwind CSS
- Chart.js (real-time canvas chart)
- Axios
