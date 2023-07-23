import { prisma } from "@/lib/prisma";

import { CreateProfileDto, UpdateProfileDto } from "./profiles.types";

class ProfileRepositories {
  findProfileByUserId(userId: string) {
    return prisma.profile.findFirst({
      where: { userId },
    });
  }

  createProfile(data: CreateProfileDto) {
    return prisma.profile.create({
      data,
    });
  }

  updateProfile(userId: string, data: UpdateProfileDto) {
    return prisma.profile.update({
      where: { userId },
      data,
    });
  }
}

export const profileRepositories = new ProfileRepositories();
