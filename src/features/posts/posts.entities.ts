import { Prisma } from "@prisma/client";

export const postInclude = Prisma.validator<Prisma.PostInclude>()({
  user: {
    select: {
      avatarUrl: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  },
});
