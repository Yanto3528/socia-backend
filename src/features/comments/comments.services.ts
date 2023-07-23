import { NotAuthorizedError, NotFoundError } from "@/errors";
import { postServices } from "@/features/posts/posts.services";

import { commentRepositories } from "./comments.repositories";
import { CreateCommentDto, UpdateCommentDto } from "./comments.types";

class CommentServices {
  findCommentsByPostId(postId: string) {
    return commentRepositories.findCommentsByPostId(postId);
  }

  async createComment(data: CreateCommentDto) {
    const post = await postServices.findPostById(data.postId);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return commentRepositories.createComment(data);
  }

  async updateComment(id: string, userId: string, data: UpdateCommentDto) {
    await this.validateComment(
      id,
      userId,
      "You are not authorized to update this comment",
    );

    return commentRepositories.updateComment(id, data);
  }

  async deleteComment(id: string, userId: string) {
    await this.validateComment(
      id,
      userId,
      "You are not authorized to delete this comment",
    );

    return commentRepositories.deleteComment(id);
  }

  async validateComment(id: string, userId: string, message: string) {
    const comment = await commentRepositories.findCommentById(id);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new NotAuthorizedError(message);
    }
  }
}

export const commentServices = new CommentServices();
