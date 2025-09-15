import { Hono } from "hono";
import { getDB } from "../../db/db";
import { userRouter } from "./userRoute";
import { blogRouter } from "./blogRoute";
import { jwtVerificationMiddleware } from "../../middlewares/authorization";

export const apiV1Router = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: String;
    JWT_SECRET: String;
  };
  Variables: { prisma: ReturnType<typeof getDB>};
}>();

apiV1Router.route("/user",userRouter)

//Authorized Routes
apiV1Router.use(jwtVerificationMiddleware);

// By adding '/*', we explicitly tell Hono that blogRouter handles '/blog' and all sub-paths.
apiV1Router.route("/blog",blogRouter)