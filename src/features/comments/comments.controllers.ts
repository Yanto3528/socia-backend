import { catchAsync } from "@/utils/helper.utils";

import { commentServices } from "./comments.services";

class CommentControllers {
  getCommentsByPostId = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const comments = await commentServices.findCommentsByPostId(postId);

    res.status(200).json({
      status: "success",
      data: comments,
    });
  });

  createComment = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await commentServices.createComment({
      content,
      postId,
      userId: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: comment,
    });
  });

  updateComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await commentServices.updateComment(id, req.user.id, {
      content,
    });

    res.status(200).json({
      status: "success",
      data: comment,
    });
  });

  deleteComment = catchAsync(async (req, res) => {
    const { id } = req.params;

    await commentServices.deleteComment(id, req.user.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

export const commentControllers = new CommentControllers();
