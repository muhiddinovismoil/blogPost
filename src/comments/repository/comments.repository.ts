import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { NotFoundException } from 'src/exceptions/notfound.exception';
@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel('comments') private readonly commentModel: Model<Comment>,
  ) {}
  async create(_id: string, createCommentDto: CreateCommentDto) {
    try {
      const newComment = new this.commentModel({
        ...createCommentDto,
        user_id: _id,
      });
      await newComment.save();
      return {
        msg: 'Comment Created',
        comment: newComment,
      };
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const getAllComment = await this.commentModel.find();
      if (getAllComment.length == 0) {
        throw new NotFoundException('There is not any comments');
      }
      return getAllComment;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const getCommentById = await this.commentModel.findById(id);
      if (!getCommentById) {
        throw new NotFoundException('There is not any comments');
      }
      return getCommentById;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const updatedData = await this.commentModel.findByIdAndUpdate(
        id,
        updateCommentDto,
        { new: true },
      );
      if (!updatedData) {
        throw new NotFoundException('There is not any comments');
      }
      return {
        msg: 'Comment Updated',
        updatedComment: updatedData,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const deleteComment = await this.commentModel.findByIdAndDelete(id);
      if (!deleteComment) {
        throw new NotFoundException('There is not any comments');
      }
      return { msg: 'Comment deleted', deletedCommentId: deleteComment._id };
    } catch (error) {
      return error;
    }
  }
}
