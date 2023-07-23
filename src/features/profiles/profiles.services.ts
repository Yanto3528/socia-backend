import { profileRepositories } from "./profiles.repositories";
import { CreateProfileDto, UpdateProfileDto } from "./profiles.types";

class ProfileServices {
  async getProfileByUserId(userId: string) {
    return profileRepositories.findProfileByUserId(userId);
  }

  async createProfile(data: CreateProfileDto) {
    return profileRepositories.createProfile(data);
  }

  async updateProfile(userId: string, data: UpdateProfileDto) {
    return profileRepositories.updateProfile(userId, data);
  }
}

export const profileServices = new ProfileServices();
