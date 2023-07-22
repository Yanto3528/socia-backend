import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

class UserRepositories {
  findUsers() {
    return prisma.user.findMany();
  }

  findUserById(id: string) {
    return prisma.user.findFirst({ where: { id } });
  }

  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  createUser(createUserInput: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: createUserInput,
    });
  }
}

export const userRepositories = new UserRepositories();
