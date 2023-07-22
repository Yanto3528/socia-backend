import { prisma } from "@/lib/prisma";

import { postUserInclude } from "./posts.entities";
import { CreatePostDto, UpdatePostDto } from "./posts.types";

class PostRepositories {
  findPosts() {
    return prisma.post.findMany({ include: postUserInclude });
  }

  findPostById(id: string) {
    return prisma.post.findFirst({
      where: { id },
      include: postUserInclude,
    });
  }

  createPost(createPostInput: CreatePostDto) {
    return prisma.post.create({
      data: createPostInput,
      include: postUserInclude,
    });
  }

  updatePost(id: string, updatePostInput: UpdatePostDto) {
    return prisma.post.update({
      where: { id },
      data: updatePostInput,
      include: postUserInclude,
    });
  }

  deletePost(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  }
}

export const postRepositories = new PostRepositories();
