import request from "supertest";

import { app } from "@/app";

import { createTestUser } from "../utils/db.utils";

describe("Users controllers", () => {
  describe("GET /api/users", () => {
    test("when 3 users are created, it should return 3 users", async () => {
      const user = await createTestUser();
      await createTestUser();
      await createTestUser();

      const response = await request(app)
        .get("/api/users")
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(3);
    });

    test("when user are not logged in, it should return 401 error", async () => {
      await createTestUser();
      await createTestUser();
      await createTestUser();

      await request(app).get("/api/users").expect(401);
    });
  });

  describe("GET /api/users/:id", () => {
    test("when user is created, it should return user", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.id).toBe(user.id);
    });

    test("when user are not logged in, it should return 401 error", async () => {
      const user = await createTestUser();

      await request(app).get(`/api/users/${user.id}`).expect(401);
    });
  });
});
