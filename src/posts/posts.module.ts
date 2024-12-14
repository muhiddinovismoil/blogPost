import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from './entities/post.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsRepository } from './repository/posts.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'posts', schema: PostSchema }])],
  controllers: [PostsController],
  providers: [PostsRepository, PostsService],
})
export class PostsModule {}
