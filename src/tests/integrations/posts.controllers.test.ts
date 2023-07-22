import request from "supertest";

import { app } from "@/app";

import { prismaMock } from "../setup-test";

describe("Posts controllers", () => {
  test("should return 200 and posts", async () => {
    prismaMock.post.findMany.mockResolvedValue([]);

    const response = await request(app)
      .get("/api/posts")
      .set("Cookie", global.signin())
      .expect(200);

    expect(response.body.data.length).toBe(0);
  });
});
