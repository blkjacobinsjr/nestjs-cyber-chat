import { UseGuards } from '@nestjs/common';
import {JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  createThread(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('body') body: string
  ) {
    return this.threadsService.createThread(title, author, body);
  }

  @Get()
  listAll() {
    return this.threadsService.listAll();
  }

  @Get(':id')
  getThreadWithComments(@Param('id') id: string) {
    return this.threadsService.getThreadWithComments(Number(id));
  }

  @Post(':id/comments')
  addComment(
    @Param('id') id: string,
    @Body('author') author: string,
    @Body('body') body: string
  ) {
    return this.threadsService.addCommentToThread(Number(id), author, body);
  }

  @Delete(':id')
  deleteThread(@Param('id') id: string) {
    this.threadsService.deleteThreadAndComments(Number(id));
    return { message: 'Thread and all related comments deleted' };
  }
}
