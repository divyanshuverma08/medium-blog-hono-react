import { Context } from "hono";
import { verify } from "hono/jwt";

export const jwtVerificationMiddleware = async (c: Context, next: () => Promise<void>) => {
  const header = c.req.header("Authorization") || "";

  if (!header) {
    c.status(401);
    return c.text("No header");
  }

  const token = header.split(" ")[1];

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if(user){
      c.set("userId", user.id)
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Unathaurized" });
  }
  await next();
};
