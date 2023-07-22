import { Prisma } from "@prisma/client";

export const commentInclude = Prisma.validator<Prisma.CommentInclude>()({
  user: {
    select: {
      avatarUrl: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  },
});
