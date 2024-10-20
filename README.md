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
3. Install dependencies in `/backend` and `/frontend` with `npm install`
4. Create a `.env` file and set up the backend port
5. Start the server with `npm run dev` in `/backend`, and the frontend with `npm run dev` in `/frontend`

## Technologies

- TypeScript

**Backend:**

- Node.js
- Express.js
- ws (WebSocket)

**Frontend:**

- React (Vite)
- Recharts (Chart)
- Axios
