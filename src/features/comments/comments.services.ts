import { NotAuthorizedError, NotFoundError } from "@/errors";

import { commentRepositories } from "./comments.repositories";
import { CreateCommentDto, UpdateCommentDto } from "./comments.types";

class CommentServices {
  findComments() {
    return commentRepositories.findComments();
  }

  findCommentsByPostId(postId: string) {
    return commentRepositories.findCommentsByPostId(postId);
  }

  createComment(data: CreateCommentDto) {
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
