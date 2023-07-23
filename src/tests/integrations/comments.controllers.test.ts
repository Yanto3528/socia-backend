import request from "supertest";
import { ObjectId } from "bson";

import { app } from "@/app";

import {
  createTestUser,
  createTestPost,
  createTestComment,
} from "../utils/db.utils";

describe("Comments controllers", () => {
  describe("GET /api/posts/:postId/comments", () => {
    test("when no comments being created for given post, it should returns no comments for given post", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const response = await request(app)
        .get(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .expect(200);
      expect(response.body.data.length).toBe(0);
    });

    test("when there are 3 comments being created for given post, it should returns 3 comments for given post", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      await createTestComment(user.id, post.id);
      await createTestComment(user.id, post.id);
      await createTestComment(user.id, post.id);

      const response = await request(app)
        .get(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .expect(200);

      expect(response.body.data.length).toBe(3);
    });

    test("when user are not logged in, it should return 401 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      await createTestComment(user.id, post.id);
      await createTestComment(user.id, post.id);
      await createTestComment(user.id, post.id);

      await request(app).get(`/api/posts/${post.id}/comments`).expect(401);
    });
  });

  describe("POST /api/posts/:postId/comments", () => {
    test("when passing in the correct data, it should return created comment with correct user id and post id", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .post(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test create",
        })
        .expect(201);

      expect(response.body.data.content).toBe("test create");
      expect(response.body.data.userId).toBe(user.id);
      expect(response.body.data.postId).toBe(post.id);
    });

    test("when passing in the correct images data, it should return created comment with correct images", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      const response = await request(app)
        .post(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test create",
          image: {
            src: "image-1",
            alt: "image 1",
          },
        })
        .expect(201);

      expect(response.body.data.content).toBe("test create");
      expect(response.body.data.userId).toBe(user.id);
      expect(response.body.data.postId).toBe(post.id);
      expect(response.body.data.image).toEqual({
        src: "image-1",
        alt: "image 1",
      });
    });

    test("when passing in the incorrect content, it should return 400 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      await request(app)
        .post(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: true,
        })
        .expect(400);
    });

    test("when passing in the incorrect image, it should return 400 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);

      await request(app)
        .post(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "Hello",
          image: "image-1",
        })
        .expect(400);
    });

    test("when passing in non existent post id, it should return 404 error", async () => {
      const user = await createTestUser();
      await createTestPost(user.id);
      const nonExistentPostId = new ObjectId();

      await request(app)
        .post(`/api/posts/${nonExistentPostId}/comments`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "Hello",
        })
        .expect(404);
    });
  });

  describe("PUT /api/posts/:postId/comments/:id", () => {
    test("when passing in the correct data, it should return updated comment", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      const response = await request(app)
        .put(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test update",
        })
        .expect(200);

      expect(response.body.data.content).toBe("test update");
    });

    test("when passing in the correct images data, it should return updated comment with correct images", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      const response = await request(app)
        .put(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test update",
          image: {
            src: "image-1",
            alt: "image 1",
          },
        })
        .expect(200);

      expect(response.body.data.content).toBe("test update");
      expect(response.body.data.image).toEqual({
        src: "image-1",
        alt: "image 1",
      });
    });

    test("when passing in the incorrect content, it should return 400 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      await request(app)
        .put(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: true,
        })
        .expect(400);
    });

    test("when passing in the incorrect image, it should return 400 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      await request(app)
        .put(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "Hello",
          image: "image-1",
        })
        .expect(400);
    });

    test("when user are not logged in, it should return 401 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      await request(app)
        .put(`/api/posts/${post.id}/comments/${comment.id}`)
        .send({
          content: "test update",
        })
        .expect(401);
    });

    test("when user who doesn't own the comment attempted to update it, it should return 401 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);
      const anotherUser = await createTestUser();

      await request(app)
        .put(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(anotherUser.id))
        .send({
          content: "test update",
        })
        .expect(401);
    });

    test("when passing in non existent comment id, it should return 404 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const nonExistentCommentId = new ObjectId();

      await request(app)
        .put(`/api/posts/${post.id}/comments/${nonExistentCommentId}`)
        .set("Cookie", global.signin(user.id))
        .send({
          content: "test update",
        })
        .expect(404);
    });
  });

  describe("DELETE /api/posts/:postId/comments/:id", () => {
    test("when passing in the correct comment id, it should return 204 status code", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      await request(app)
        .delete(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(user.id))
        .expect(204);

      const response = await request(app)
        .get(`/api/posts/${post.id}/comments`)
        .set("Cookie", global.signin(user.id))
        .expect(200);
      expect(response.body.data.length).toBe(0);
    });

    test("when user are not logged in, it should return 401 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);

      await request(app)
        .delete(`/api/posts/${post.id}/comments/${comment.id}`)
        .expect(401);
    });

    test("when user who doesn't own the comment attempted to delete it, it should return 401 error", async () => {
      const user = await createTestUser();
      const post = await createTestPost(user.id);
      const comment = await createTestComment(user.id, post.id);
      const anotherUser = await createTestUser();

      await request(app)
        .delete(`/api/posts/${post.id}/comments/${comment.id}`)
        .set("Cookie", global.signin(anotherUser.id))
        .expect(401);
    });
  });
});
