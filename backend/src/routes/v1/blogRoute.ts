import { Hono } from "hono";
import { getDB } from "../../db/db";

export const blogRouter = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: String;
    JWT_SECRET: String;
  };
  Variables: { prisma: ReturnType<typeof getDB>; userId: string };
}>();

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = c.get("prisma");

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    message: "Blog is updated",
    id: blog.id,
  });
});

blogRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const prisma = c.get("prisma");

  const blog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    message: "Blog is created",
    id: blog.id,
  });
});

//Todo: pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  const blogs = await prisma.blog.findMany();
  return c.json({
    message: "Blogs",
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");

  const blog = await prisma.blog.findFirst({
    where: {
      id: id,
    },
  });

  return c.json({
    blog,
  });
});
