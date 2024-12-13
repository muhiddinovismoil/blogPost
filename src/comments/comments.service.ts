import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import * as fs from 'fs/promises';
import * as path from 'path';
const filePath = path.join(process.cwd(), 'src', 'json', 'userId.json');
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('comments') private readonly commentModel: Model<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const id = await fs.readFile(filePath, 'utf-8');
    const newComment = new this.commentModel({
      ...createCommentDto,
      user_id: JSON.parse(id),
    });
    await newComment.save();
    return {
      msg: 'Comment Created',
      comment: newComment,
    };
  }
  async findAll() {
    const getAllComment = await this.commentModel.find();
    if (getAllComment.length == 0) {
      return {
        msg: 'There is no any comments',
      };
    }
    return getAllComment;
  }

  async findOne(id: string) {
    const getCommentById = await this.commentModel.findById(id);
    if (!getCommentById) {
      return {
        msg: `There is no any comment with this id`,
      };
    }
    return getCommentById;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const updatedData = await this.commentModel.findByIdAndUpdate(
      id,
      updateCommentDto,
      { new: true },
    );
    if (!updatedData) {
      return `Comment not updated`;
    }
    return {
      msg: 'Comment Updated',
      updatedComment: updatedData,
    };
  }

  async remove(id: string) {
    const deleteUser = await this.commentModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return `This comment not found or maybe deleted before`;
    }
    return deleteUser._id;
  }
}
