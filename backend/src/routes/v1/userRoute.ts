import { Hono } from "hono";
import { getDB } from "../../db/db";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@divyanshuverma/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: String;
    JWT_SECRET: String;
  };
  Variables: { prisma: ReturnType<typeof getDB> };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const {success} = signupInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.text("Wrong Input")
  }

  const prisma = c.get("prisma");
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    message: "User is created",
    userId: user.id,
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const {success} = signinInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.text("Wrong Input")
  }

  const prisma = c.get("prisma");

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.text("Email or Password Incorrect");
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      message: "User loggedin successfully",
      userId: user.id,
      jwt: token,
    });
  } catch (err) {
    c.status(403);
    return c.text("Email or Password Incorrect");
  }
});
