# Full-Stack Blog Platform (Hono + React)

This is a full-stack, Medium-like blog application built with a modern, serverless-first tech stack. It demonstrates how to build a robust, type-safe application using Cloudflare Workers for the backend and React for the frontend.

## Tech Stack

-   **Backend Framework**: [Hono](https://hono.dev/) - A small, simple, and ultrafast web framework for the Edge.
-   **Backend Platform**: [Cloudflare Workers](https://workers.cloudflare.com/) - A serverless execution environment for high-performance, low-latency applications.
-   **Frontend Framework**: [React](https://react.dev/) - A JavaScript library for building user interfaces.
-   **Database**: [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
-   **ORM**: [Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript.
-   **Connection Pooling**: [Prisma Accelerate](https://www.prisma.io/accelerate) is used to manage database connections efficiently in a serverless environment.
-   **Validation**: [Zod](https://zod.dev/) - For schema validation on the backend and inferring TypeScript types for the frontend.
-   **Authentication**: JSON Web Tokens (JWT) for secure, stateless authentication.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - For end-to-end type safety.

## Features

-   **User Authentication**: Secure user signup and signin using JWTs.
-   **CRUD Operations**: Full Create, Read, Update, and Delete functionality for blog posts.
-   **RESTful API**: A well-structured API built with Hono.
-   **End-to-End Type Safety**: Types are shared from the Zod backend schemas to the React frontend, preventing inconsistencies.
-   **Serverless Architecture**: Built from the ground up to be deployed on the edge for global scale and performance.

## Project Structure

The project is organized into two main directories:

```
/
├── backend/      # Hono backend on Cloudflare Workers
├── frontend/     # React frontend application (not included in context)
└── ...
```

## Getting Started

Follow these instructions to get the backend up and running on your local machine.

### Prerequisites

-   Node.js and npm (or a similar package manager)
-   A running PostgreSQL database instance.
-   A [Cloudflare](https://www.cloudflare.com/) account.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the `backend` directory. This file is used by Wrangler for local development. Add your database connection string and a JWT secret:

    ```ini
    # .env

    # Your PostgreSQL connection string, including the schema
    # Example: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
    DATABASE_URL="your_database_connection_string"

    PRISMA_DATABASE_URL="prisma_connection_string"

    # A strong, secret key for signing JWTs
    JWT_SECRET="your_jwt_secret"
    ```

    *Note: The `DATABASE_URL` must point to a database that is accessible from your local machine*

4.  **Run database migrations:**

    This command will apply the Prisma schema to your database, creating the `User` and `Blog` tables.

    ```bash
    npx prisma migrate dev
    ```

5.  **Generate Prisma Client:**

    Ensure your Prisma Client is up-to-date with your schema.

    ```bash
    npx prisma generate
    ```

6.  **Run the development server:**

    This will start the Hono application locally using the Wrangler CLI.

    ```bash
    npm run dev
    ```

    The backend API will be available at `http://localhost:8787`.

## Deployment

The backend is designed to be deployed to Cloudflare Workers.

1.  **Login to Wrangler:**
    ```bash
    npx wrangler login
    ```

2.  **Configure Secrets:**

    Before deploying, you need to add your environment variables as secrets to your Cloudflare Worker.

    ```bash
    npx wrangler secret put PRISMA_DATABASE_URL
    npx wrangler secret put JWT_SECRET
    ```

3.  **Deploy the Worker:**
    ```bash
    npm run deploy
    ```

This command will build, minify, and deploy your Hono application to the Cloudflare global network.
