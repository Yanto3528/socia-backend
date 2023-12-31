import { catchAsync } from "@/utils/helper.utils";

import { userServices } from "./users.services";

class UserControllers {
  getUsers = catchAsync(async (req, res) => {
    const users = await userServices.findUsers();

    res.status(200).json({
      status: "success",
      data: users,
    });
  });

  getUserById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await userServices.findUserById(id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  });
}

export const userControllers = new UserControllers();
