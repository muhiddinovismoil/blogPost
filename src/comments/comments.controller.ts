import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(req.user.sub, createCommentDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.commentsService.findAllComments();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOneComment(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.removeComment(id);
  }
}
