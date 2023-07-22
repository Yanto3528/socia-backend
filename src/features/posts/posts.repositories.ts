import { prisma } from "@/lib/prisma";

import { postInclude } from "./posts.entities";
import { CreatePostDto, UpdatePostDto } from "./posts.types";

class PostRepositories {
  findPosts() {
    return prisma.post.findMany({ include: postInclude });
  }

  findPostById(id: string) {
    return prisma.post.findFirst({
      where: { id },
      include: postInclude,
    });
  }

  createPost(createPostInput: CreatePostDto) {
    return prisma.post.create({
      data: createPostInput,
      include: postInclude,
    });
  }

  updatePost(id: string, updatePostInput: UpdatePostDto) {
    return prisma.post.update({
      where: { id },
      data: updatePostInput,
      include: postInclude,
    });
  }

  deletePost(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  }
}

export const postRepositories = new PostRepositories();
