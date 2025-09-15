import { PrismaClient } from "../../src/generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export function getDB(DATABASE_URL: String) {
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  return prisma
}
