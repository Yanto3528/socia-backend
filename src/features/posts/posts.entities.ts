import { Prisma } from "@prisma/client";

export const postUserInclude = Prisma.validator<Prisma.PostInclude>()({
  user: {
    select: {
      avatarUrl: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  },
});

export const postSelect: Prisma.PostSelect = {
  id: true,
  content: true,
  createdAt: true,
  images: true,
  updatedAt: true,
  user: {
    select: {
      avatarUrl: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  },
};
