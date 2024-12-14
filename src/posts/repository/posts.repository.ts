import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreatePostDto } from '../dto/create-post.dto';
import { Model } from 'mongoose';
import { Post } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { NotFoundException } from 'src/exceptions/notfound.exception';
const filePath = path.join(process.cwd(), 'src', 'json', 'userId.json');
@Injectable()
export class PostsRepository {
  constructor(@InjectModel('posts') private readonly postsModel: Model<Post>) {}
  async create(createPostDto: CreatePostDto) {
    try {
      const id = await fs.readFile(filePath, 'utf-8');
      const newPost = new this.postsModel({
        ...createPostDto,
        user_id: JSON.parse(id),
      });
      await newPost.save();
      return {
        msg: 'Post created ',
        newPost: newPost,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const getAllPosts = await this.postsModel.find();
      if (getAllPosts.length == 0) {
        throw new NotFoundException('Posts not found');
      }
      return getAllPosts;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const postById = await this.postsModel.findById(id);
      if (!postById) {
        throw new NotFoundException('Post not found');
      }
      return postById;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const updatePost = await this.postsModel.findByIdAndUpdate(
        id,
        updatePostDto,
        { new: true },
      );
      if (!updatePost) {
        throw new NotFoundException('Post not found');
      }
      return updatePost;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const deletedPost = await this.postsModel.findByIdAndDelete(id);
      if (!deletedPost) {
        throw new NotFoundException('Post not found');
      }
      return {
        msg: 'Post deleted',
        deletedPostId: id,
      };
    } catch (error) {
      return error;
    }
  }
}
