# Healthcare Backend

Minimal Node.js + Express + MySQL backend with Sequelize.

## Prerequisites
- Node.js ≥ 18
- MySQL ≥ 8

## Setup

```bash
git clone <repo-url>
cd backend_full_project
npm install
cp .env.sample .env
# edit your .env with DB credentials
npm run dev
```

The API will run on **http://localhost:3000**.

## Available Routes

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| POST   | /api/auth/register  | Register user    |
| POST   | /api/auth/login     | Login user       |

## Folder Structure
2025-07-05
