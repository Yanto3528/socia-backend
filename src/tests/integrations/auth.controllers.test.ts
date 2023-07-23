import request from "supertest";

import { app } from "@/app";

import { createTestUser } from "../utils/db.utils";

const getTokenFromCookie = (headers: request.Response["headers"]) => {
  const cookie = headers["set-cookie"][0];
  const token = cookie.split(";")[0].split("=")[1];

  return token;
};

describe("Auth controllers", () => {
  describe("POST /api/auth/signup", () => {
    test("when passing in the correct data, it should return created user with correct email", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@example.com",
          password: "password",
        })
        .expect(201);

      const token = getTokenFromCookie(response.headers);
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token");
      expect(token).toBeTruthy();
    });

    test("when passing in the wrong email format, it should return 400 error", async () => {
      await request(app)
        .post("/api/auth/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test.com",
          password: "password",
        })
        .expect(400);
    });

    test("when passing in the wrong password format, it should return 400 error", async () => {
      await request(app)
        .post("/api/auth/signup")
        .send({
          firstName: "test",
          lastName: "test",
          email: "test@example.com",
          password: "123",
        })
        .expect(400);
    });

    test("when passing in the wrong name format, it should return 400 error", async () => {
      await request(app)
        .post("/api/auth/signup")
        .send({
          firstName: true,
          lastName: true,
          email: "test@example.com",
          password: "123",
        })
        .expect(400);
    });
  });

  describe("POST /api/auth/login", () => {
    test("when passing in the correct credentials, it should login the user", async () => {
      const { email } = await createTestUser();

      const response = await request(app)
        .post("/api/auth/login")
        .send({ email, password: "password" })
        .expect(200);

      const token = getTokenFromCookie(response.headers);
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token");
      expect(token).toBeTruthy();
    });

    test("when passing in the wrong email, it should return 400 error", async () => {
      await createTestUser();

      await request(app)
        .post("/api/auth/login")
        .send({ email: "some-random@example.com", password: "password" })
        .expect(400);
    });

    test("when passing in the wrong password, it should return 400 error", async () => {
      const { email } = await createTestUser();

      await request(app)
        .post("/api/auth/login")
        .send({ email, password: "some-random-password" })
        .expect(400);
    });
  });

  describe("DELETE /api/auth/logout", () => {
    test("when calling the api, it should logout the logged in user", async () => {
      const { id } = await createTestUser();

      const response = await request(app)
        .delete("/api/auth/logout")
        .set("Cookie", global.signin(id))
        .expect(200);

      const cookie = response.headers["set-cookie"][0];
      const token = cookie.split(";")[0].split("=")[1];

      expect(token).toBe("");
    });
  });
});
