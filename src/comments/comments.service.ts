import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './repository/comments.repository';
@Injectable()
export class CommentsService {
  constructor(
    @Inject() private readonly commentsRepository: CommentsRepository,
  ) {}
  async createComment(id: string, createCommentDto: CreateCommentDto) {
    return this.commentsRepository.create(id, createCommentDto);
  }
  async findAllComments() {
    return this.commentsRepository.findAll();
  }
  async findOneComment(id: string) {
    return this.commentsRepository.findOne(id);
  }
  async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentsRepository.update(id, updateCommentDto);
  }
  async removeComment(id: string) {
    return this.commentsRepository.remove(id);
  }
}
