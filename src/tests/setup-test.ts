import jwt from "jsonwebtoken";

import { prisma, createPrismaInstance } from "../lib/prisma";

import { createTestPrismaClient } from "./utils/setup.utils";

declare global {
  function signin(id: string): string[];
}

let stopServer: () => Promise<boolean>;

beforeAll(async () => {
  const result = await createTestPrismaClient();
  createPrismaInstance(result.dbUrl);
  stopServer = result.stopServer;
});

beforeEach(async () => {
  vi.clearAllMocks();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(() => {
  stopServer();
});

global.signin = (id: string) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  return [`token=${token}`];
};
