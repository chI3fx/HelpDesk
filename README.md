# TojiLifts HelpDesk Portal (MEVN)

A full-stack MEVN application for managing standardized helpdesk responses.  
Staff can create, browse, search, update, and delete response templates, view quick response statistics, and take a training quiz based on real entries.

## Project Overview

This system is designed to help support teams respond consistently and quickly to common member issues (for example billing, memberships, bookings, facilities, and health & safety).

The app includes:
- A Vue 3 frontend with a modern dashboard-style interface
- An Express + MongoDB REST API for CRUD operations
- A quiz module that generates questions from stored response entries

## Tech Stack

- Frontend: Vue 3, Vue Router, Axios, Bootstrap 5, Vite
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Core Features

- CRUD management of helpdesk response entries
- Search/filter response library by key, category, and value text
- Category-based summary statistics and latest-entry highlights
- Interactive staff training quiz generated from saved entries
- Responsive UI (desktop table + mobile cards)

## Data Model

Each helpdesk entry contains:
- `key` (string, required, uppercased)
- `value` (string, required)
- `category` (string, required)
- `createdAt` / `updatedAt` timestamps

## API Endpoints

Base path: `/api/entries`

- `GET /` - List all entries (newest first)
- `GET /:id` - Get one entry by ID
- `POST /` - Create a new entry
- `PUT /:id` - Update an entry
- `DELETE /:id` - Delete an entry

## Project Structure

```text
HelpDesk/
  client/                 # Vue frontend
    src/
      components/         # Reusable UI parts (EntryForm, Quiz, Stats)
      views/              # Route-level pages
      router/
        index.js          # Vue router config
  server/                 # Express API
    models/               # Mongoose models
    routes/               # API route handlers
    server.js             # API server entrypoint
    seed.js               # Database seed script
```

## Getting Started

### 1) Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 2) Start MongoDB

Ensure MongoDB is running locally, or set a custom connection string via `MONGO_URI`.

Default used by this project:
- `mongodb://localhost/HelpDesk`

### 3) Run the backend

```bash
cd server
node server.js
```

Server runs on:
- `http://localhost:3000`

### 4) Run the frontend

```bash
cd client
npm run dev
```

Client runs on:
- `http://localhost:8080`

Vite proxies `/api` requests to the backend at port `3000`.

## Seed Sample Data (Optional)

To preload demo helpdesk entries:

```bash
cd server
node seed.js
```

## Notes

- The quiz requires at least 4 entries to generate multiple-choice questions.
- CORS is enabled in the API for frontend-backend communication.

## Author

TojiLifts Helpdesk Portal by Keith Karung'o (001511425)
