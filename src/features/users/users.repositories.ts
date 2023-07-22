import { prisma } from "@/lib/prisma";

import { CreateUserDto } from "./users.types";

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

  createUser(createUserInput: CreateUserDto) {
    return prisma.user.create({
      data: createUserInput,
    });
  }
}

export const userRepositories = new UserRepositories();
