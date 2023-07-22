import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "vitest-mock-extended";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";

declare global {
  function signin(): string[];
}

vi.mock("../lib/prisma", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

beforeEach(async () => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

global.signin = () => {
  const payload = {
    id: new ObjectId().toHexString(),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  prismaMock.user.findFirst.mockResolvedValue({
    id: payload.id,
    firstName: "john",
    lastName: "doe",
    email: "test@example.com",
    password: "password",
    createdAt: new Date(),
    updatedAt: new Date(),
    avatarUrl: null,
  });

  return [`token=${token}`];
};
