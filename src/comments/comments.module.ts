import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentSchema } from './entities/comment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsRepository } from './repository/comments.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comments', schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsRepository, CommentsService],
})
export class CommentsModule {}
