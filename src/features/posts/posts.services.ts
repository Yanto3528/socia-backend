import { NotAuthorizedError, NotFoundError } from "@/errors";

import { postRepositories } from "./posts.repositories";
import { CreatePostDto, UpdatePostDto } from "./posts.types";

class PostServices {
  findPosts() {
    return postRepositories.findPosts();
  }

  findPostById(id: string | undefined) {
    return postRepositories.findPostById(id);
  }

  createPost(createPostInput: CreatePostDto) {
    return postRepositories.createPost(createPostInput);
  }

  async updatePost(id: string, userId: string, updatePostInput: UpdatePostDto) {
    await this.validatePost(
      id,
      userId,
      "You are not authorized to update this post",
    );

    return postRepositories.updatePost(id, updatePostInput);
  }

  async deletePost(id: string, userId: string) {
    await this.validatePost(
      id,
      userId,
      "You are not authorized to delete this post",
    );

    return postRepositories.deletePost(id);
  }

  async validatePost(id: string, userId: string, message: string) {
    const post = await postRepositories.findPostById(id);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (post.userId !== userId) {
      throw new NotAuthorizedError(message);
    }
  }
}

export const postServices = new PostServices();
