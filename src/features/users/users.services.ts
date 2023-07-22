import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

import { userRepositories } from "./users.repositories";

class UserServices {
  findUsers() {
    return userRepositories.findUsers();
  }

  findUserById(id: string) {
    return userRepositories.findUserById(id);
  }

  async findUserByEmail(
    email: string,
    options: { includePassword: boolean } = { includePassword: false },
  ) {
    const { includePassword } = options;

    const user = await userRepositories.findUserByEmail(email);

    return user
      ? { ...user, password: includePassword ? user.password : undefined }
      : null;
  }

  async createUser(createUserInput: Prisma.UserCreateInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return userRepositories.createUser(createUserInput);
  }
}

export const userServices = new UserServices();
