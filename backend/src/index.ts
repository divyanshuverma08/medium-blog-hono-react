import { Hono } from "hono";
import { getDB } from "./db/db";
import { router } from "./routes";

const app = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: String;
    JWT_SECRET: String;
  };
  Variables: { prisma: ReturnType<typeof getDB> };
}>();

app.use("*", async (c, next) => {
  c.set("prisma", getDB(c.env.PRISMA_DATABASE_URL));
  await next();
});

app.route("/api",router)

export default app;
