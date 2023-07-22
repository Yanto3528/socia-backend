import bcrypt from "bcrypt";

import { CreateUserDto } from "./users.types";
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
    options: { includePassword: boolean } = { includePassword: false }
  ) {
    const { includePassword } = options;

    const user = await userRepositories.findUserByEmail(email);

    return user
      ? { ...user, password: includePassword ? user.password : undefined }
      : null;
  }

  async createUser(createUserInput: CreateUserDto) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return userRepositories.createUser(createUserInput);
  }
}

export const userServices = new UserServices();
