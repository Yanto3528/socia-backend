import { catchAsync } from "@/utils/helper.utils";

import { postServices } from "./posts.services";
import { CreatePostPayload, UpdatePostPayload } from "./posts.types";

class PostControllers {
  getPosts = catchAsync(async (req, res) => {
    const posts = await postServices.findPosts();

    res.status(200).json({
      status: "success",
      data: posts,
    });
  });

  getPostById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const post = await postServices.findPostById(id);

    res.status(200).json({
      status: "success",
      data: post,
    });
  });

  createPost = catchAsync<CreatePostPayload>(async (req, res) => {
    const { content, images } = req.body;
    const user = req.user;

    const post = await postServices.createPost({
      content,
      images,
      userId: user.id,
    });

    res.status(201).json({
      status: "success",
      data: post,
    });
  });

  updatePost = catchAsync<UpdatePostPayload>(async (req, res) => {
    const { id } = req.params;
    const { content, images } = req.body;
    const user = req.user;

    const post = await postServices.updatePost(id, user.id, {
      content,
      images,
    });

    res.status(200).json({
      status: "success",
      data: post,
    });
  });

  deletePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    await postServices.deletePost(id, user.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

export const postControllers = new PostControllers();
