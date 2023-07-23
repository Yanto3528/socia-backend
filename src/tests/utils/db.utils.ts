import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.create({
    data: {
      firstName: "john",
      lastName: "doe",
      email: "test@example.com",
      password: hashedPassword,
      avatarUrl: null,
    },
  });
  await prisma.profile.create({
    data: {
      bio: null,
      dob: null,
      gender: null,
      userId: user.id,
    },
  });

  return user;
};

export const createTestPost = async (userId: string) => {
  return prisma.post.create({
    data: {
      content: "test content",
      userId,
    },
  });
};

export const createTestComment = async (userId: string, postId: string) => {
  return prisma.comment.create({
    data: {
      content: "test content",
      userId,
      postId,
    },
  });
};
