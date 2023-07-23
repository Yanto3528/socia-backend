import request from "supertest";
import { ObjectId } from "bson";

import { app } from "@/app";

import { createTestUser } from "../utils/db.utils";

describe("Profiles controllers", () => {
  describe("GET /api/profiles/me", () => {
    test("when given user are logged in, it should returns the logged in user", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .get("/api/profiles/me")
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.userId).toEqual(user.id);
    });

    test("when given user are not logged in, it should returns 401 error", async () => {
      await request(app).get("/api/profiles/me").expect(401);
    });
  });

  describe("GET /api/profiles/:userId", () => {
    test("when passing in an existing user id, it should return the profile for that user", async () => {
      const user = await createTestUser();
      const anotherUser = await createTestUser();

      const response = await request(app)
        .get(`/api/profiles/${anotherUser.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.userId).toEqual(anotherUser.id);
    });

    test("when given non existent user id, it should return empty data", async () => {
      const user = await createTestUser();
      const nonExistentUserId = new ObjectId();

      const response = await request(app)
        .get(`/api/profiles/${nonExistentUserId}`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data).toBeNull();
    });

    test("when user are not logged in, it should return 401 error", async () => {
      const anotherUser = await createTestUser();

      await request(app).get(`/api/profiles/${anotherUser.id}`).expect(401);
    });
  });

  describe("PUT /api/profiles/me", () => {
    test("when passing in the correct data, it should update the profile", async () => {
      const user = await createTestUser();

      const dob = new Date();

      const response = await request(app)
        .put("/api/profiles/me")
        .set("Cookie", global.signin(user.id))
        .send({
          bio: "test bio",
          dob,
          gender: "MALE",
        })
        .expect(200);

      expect(response.body.data.bio).toEqual("test bio");
      expect(response.body.data.dob).toEqual(dob.toISOString());
      expect(response.body.data.gender).toBe("MALE");
    });

    test("when passing in the incorrect bio, it should return 400 error", async () => {
      const user = await createTestUser();

      await request(app)
        .put("/api/profiles/me")
        .set("Cookie", global.signin(user.id))
        .send({
          bio: true,
        })
        .expect(400);
    });

    test("when passing in the incorrect dob, it should return 400 error", async () => {
      const user = await createTestUser();

      await request(app)
        .put("/api/profiles/me")
        .set("Cookie", global.signin(user.id))
        .send({
          dob: true,
        })
        .expect(400);
    });

    test("when passing in the incorrect gender, it should return 400 error", async () => {
      const user = await createTestUser();

      await request(app)
        .put("/api/profiles/me")
        .set("Cookie", global.signin(user.id))
        .send({
          gender: "M",
        })
        .expect(400);
    });

    test("when given user are not logged in, it should return 401 error", async () => {
      await request(app)
        .put("/api/profiles/me")
        .send({
          bio: "test bio",
        })
        .expect(401);
    });
  });
});
