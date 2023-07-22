import { prisma } from "@/lib/prisma";

export const createTestUser = async () => {
  return prisma.user.create({
    data: {
      firstName: "john",
      lastName: "doe",
      email: "test@example.com",
      password: "password",
      avatarUrl: null,
    },
  });
};

export const createTestPost = async (userId: string) => {
  return prisma.post.create({
    data: {
      content: "test content",
      userId,
    },
  });
};
