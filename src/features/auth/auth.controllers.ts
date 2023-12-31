import { catchAsync } from "@/utils/helper.utils";
import { BadRequestError } from "@/errors";

import { userServices } from "../users/users.services";
import { profileServices } from "../profiles/profiles.services";

import { SignUpBodyPayload, LoginBodyPayload } from "./auth.types";
import { createAndSendToken, matchPassword } from "./auth.helpers";

class AuthControllers {
  signUp = catchAsync<SignUpBodyPayload>(async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const existingUser = await userServices.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError("User with this email already exist.");
    }

    const user = await userServices.createUser({
      firstName,
      lastName,
      email,
      password,
    });
    await profileServices.createProfile({
      bio: null,
      dob: null,
      gender: null,
      userId: user.id,
    });

    createAndSendToken(user.id, res, 201);
  });

  login = catchAsync<LoginBodyPayload>(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userServices.findUserByEmail(email, {
      selectPassword: true,
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordMatch = await matchPassword(
      password,
      existingUser.password!,
    );
    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    createAndSendToken(existingUser.id, res);
  });

  logout = catchAsync(async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
      status: "success",
    });
  });
}

export const authControllers = new AuthControllers();
