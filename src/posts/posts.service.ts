import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repository/posts.repository';
@Injectable()
export class PostsService {
  constructor(@Inject() private readonly postRepository: PostsRepository) {}
  async create(id: string, createPostDto: CreatePostDto) {
    return this.postRepository.create(id, createPostDto);
  }
  async findAllPosts() {
    return this.postRepository.findAll();
  }
  async findOnePost(id: string) {
    return this.postRepository.findOne(id);
  }
  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }
  async removePost(id: string) {
    return this.postRepository.remove(id);
  }
}
