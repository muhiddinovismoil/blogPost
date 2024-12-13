import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel('posts') private readonly postsModel: Model<Post>) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = new this.postsModel({ ...createPostDto });
    await newPost.save();
    return {
      msg: 'Post created ',
    };
  }

  async findAll() {
    const getAllPosts = await this.postsModel.find();
    if (getAllPosts.length == 0) {
      return `Posts not found`;
    }
    return getAllPosts;
  }

  async findOne(id: string) {
    const postById = await this.postsModel.findById(id);
    if (!postById) {
      return `Post not found`;
    }
    return postById;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatePost = await this.postsModel.findByIdAndUpdate(
      id,
      updatePostDto,
      { new: true },
    );
    if (!updatePost) {
      return `Post not found`;
    }
    return updatePost;
  }

  async remove(id: string) {
    const deletedPost = await this.postsModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return `Post not found or deleted before`;
    }
    return {
      msg: 'Post deleted',
      deletedPostId: id,
    };
  }
}
