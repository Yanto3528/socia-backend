import { prisma } from "@/lib/prisma";

import { commentInclude } from "./comments.entities";
import { CreateCommentDto, UpdateCommentDto } from "./comments.types";

class CommentRepositories {
  findComments() {
    return prisma.comment.findMany({ include: commentInclude });
  }

  findCommentById(id: string) {
    return prisma.comment.findFirst({
      where: { id },
      include: commentInclude,
    });
  }

  findCommentsByPostId(postId: string) {
    return prisma.comment.findMany({
      where: { postId },
      include: commentInclude,
    });
  }

  createComment(data: CreateCommentDto) {
    return prisma.comment.create({
      data,
      include: commentInclude,
    });
  }

  updateComment(id: string, data: UpdateCommentDto) {
    return prisma.comment.update({
      where: { id },
      data,
      include: commentInclude,
    });
  }

  deleteComment(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}

export const commentRepositories = new CommentRepositories();
