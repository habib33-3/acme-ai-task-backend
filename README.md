# ACME AI Job Task Backend

This is the backend of the ACME AI Job Task application. It is built with the NestJS framework, Prisma ORM, and PostgreSQL.

## Prerequisites

Before running the application locally, make sure you have the following installed:

- Node.js
- pnpm
- PostgreSQL

For the Docker setup, only Docker and Docker Compose are required.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/habib33-3/acme-ai-task-backend.git
cd acme-ai-task-backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://{USER}:{PASSWORD}@localhost:5432/acme_ai_job_task
PORT=5000
```

Replace `{USER}` and `{PASSWORD}` with your local PostgreSQL credentials.

### 4. Run database migrations

```bash
pnpm prisma migrate deploy
```

### 5. Start the application

For development:

```bash
pnpm start:dev
```

The API will be available at:

```text
http://localhost:5000
```

## Docker

Docker Compose starts both the NestJS application and PostgreSQL database.

```bash
docker compose up --build
```

The API will be available at:

```text
http://localhost:5000
```

The PostgreSQL database runs inside the Docker network and does not require a local PostgreSQL installation.

### Run database migrations

After the containers are running:

```bash
docker exec acme-ai-job-task-backend pnpm prisma migrate deploy
```

### Stop the application

```bash
docker compose down
```

To also remove the PostgreSQL data volume:

```bash
docker compose down -v
```
