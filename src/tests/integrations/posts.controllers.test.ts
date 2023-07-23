import request from "supertest";
import { ObjectId } from "bson";

import { app } from "@/app";

import { createTestPost, createTestUser } from "../utils/db.utils";

describe("Posts controllers", () => {
  test("when user are not authorized, expect status code to be 401", async () => {
    await request(app).get("/api/posts").expect(401);
  });

  describe("GET /api/posts", () => {
    test("when no posts being created, expect data length to be 0", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .get("/api/posts")
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(0);
    });

    test("when 3 posts are created, expect data length to be 3", async () => {
      const user = await createTestUser();
      await createTestPost(user.id);
      await createTestPost(user.id);
      await createTestPost(user.id);

      const response = await request(app)
        .get("/api/posts")
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(3);
    });
  });

  describe("POST /api/posts", () => {
    test("when passing in the correct data, it should return created post with correct user id", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .post("/api/posts")
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test create",
        })
        .expect(201);

      expect(response.body.data.content).toBe("test create");
      expect(response.body.data.userId).toBe(user.id);
    });

    test("when passing in the correct images data, it should return created post with correct images", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .post("/api/posts")
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test create",
          images: [{ src: "some-test-url", alt: "test alt" }],
        })
        .expect(201);

      expect(response.body.data.content).toBe("test create");
      expect(response.body.data.userId).toBe(user.id);
      expect(response.body.data.images).toEqual([
        { src: "some-test-url", alt: "test alt" },
      ]);
    });

    test("when passing req.body that has missing content property, it should return 400 error", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .post("/api/posts")
        .set("Cookie", global.signin(user.id))
        .send({})
        .expect(400);

      expect(response.body.status).toBe("error");
    });

    test("when passing req.body with wrong images property, it should return 400 error", async () => {
      const user = await createTestUser();

      const response = await request(app)
        .post("/api/posts")
        .set("Cookie", global.signin(user.id))
        .send({
          images: "some-test-url",
        })
        .expect(400);

      expect(response.body.status).toBe("error");
    });
  });

  describe("PUT /api/posts/:id", () => {
    test("when passing in the correct data, it should return updated post", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .put(`/api/posts/${post.id}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "updated content",
        })
        .expect(200);

      expect(response.body.data.content).toBe("updated content");
      expect(response.body.data.userId).toBe(user.id);
    });

    test("when passing req.body that has wrong content property type, it should return 400 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .put(`/api/posts/${post.id}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: true,
        })
        .expect(400);

      expect(response.body.status).toBe("error");
    });

    test("when passing in the post id that does not exist, it should return 404 error", async () => {
      const user = await createTestUser();
      await createTestPost(user.id);
      const nonExistPostId = new ObjectId();

      const response = await request(app)
        .put(`/api/posts/${nonExistPostId}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "hello",
        })
        .expect(404);

      expect(response.body.status).toBe("error");
    });

    test("when user that doesn't own the post attempted to update it, it should return 401 error", async () => {
      const user = await createTestUser();
      const anotherUser = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .put(`/api/posts/${post.id}`)
        .set("Cookie", global.signin(anotherUser.id))
        .send({
          content: "Hello",
        })
        .expect(401);

      expect(response.body.status).toBe("error");
    });
  });

  describe("DELETE /api/posts/:id", () => {
    test("when passing in the correct post id and user id, it should delete the post", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .delete(`/api/posts/${post.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(204);

      expect(response.body).toEqual({});
    });

    test("when passing in the non existent post id, it should return 404 error", async () => {
      const user = await createTestUser();
      await createTestPost(user.id);
      const nonExistPostId = new ObjectId();

      const response = await request(app)
        .put(`/api/posts/${nonExistPostId}`)
        .set("Cookie", global.signin(user.id))
        .expect(404);

      expect(response.body.status).toBe("error");
    });

    test("when user that doesn't own the post attempted to delete it, it should return 401 error", async () => {
      const user = await createTestUser();
      const anotherUser = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .delete(`/api/posts/${post.id}`)
        .set("Cookie", global.signin(anotherUser.id))
        .expect(401);

      expect(response.body.status).toBe("error");
    });
  });
});
