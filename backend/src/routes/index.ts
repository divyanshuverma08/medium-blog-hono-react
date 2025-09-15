import { Hono } from "hono";
import { getDB } from "../db/db";
import { apiV1Router } from "./v1";

export const router = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: String;
    JWT_SECRET: String;
  };
  Variables: { prisma: ReturnType<typeof getDB> };
}>();

router.route("/v1",apiV1Router)

