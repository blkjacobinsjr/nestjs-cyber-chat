import 'reflect-metadata';
import { Controller, Get, Delete, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentsService.getComment(Number(id));
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    this.commentsService.softDelete(Number(id));
    return { message: 'Comment body marked as deleted' };
  }
}
