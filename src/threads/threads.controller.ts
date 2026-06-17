import { UseGuards } from '@nestjs/common';
import {JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, Post, Delete, Param, Body, Header } from '@nestjs/common';
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

  @Get('party')
  @Header('Content-Type', 'text/html')
  party() {
    return `<body style="background:linear-gradient(45deg,#ff00ff,#00ffff);display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden;font-family:'Comic Sans MS'"><div style="text-align:center"><h1 style="font-size:100px;color:yellow;animation:p .5s infinite alternate">🔥 IT'S ALIVE! 🔥</h1><marquee scrollamount="40" style="font-size:100px">🦄🚀🐈💨🍕🎉</marquee></div><style>@keyframes p{to{transform:scale(1.2) rotate(5deg)}}</style></body>`;
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
