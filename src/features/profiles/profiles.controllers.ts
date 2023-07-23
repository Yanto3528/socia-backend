import { catchAsync } from "@/utils/helper.utils";

import { profileServices } from "./profiles.services";
import { UpdateProfilePayload } from "./profiles.types";

class ProfileControllers {
  getCurrentUserProfile = catchAsync(async (req, res) => {
    const profile = await profileServices.getProfileByUserId(req.user.id);
    res.status(200).json({ status: "success", data: profile });
  });

  getProfileByUserId = catchAsync(async (req, res) => {
    const profile = await profileServices.getProfileByUserId(req.params.userId);
    res.status(200).json({ status: "success", data: profile });
  });

  updateProfile = catchAsync<UpdateProfilePayload>(async (req, res) => {
    const { bio, gender, dob } = req.body;

    const profile = await profileServices.updateProfile(req.user.id, {
      bio,
      dob,
      gender,
    });
    res.status(200).json({ status: "success", data: profile });
  });
}

export const profileControllers = new ProfileControllers();
