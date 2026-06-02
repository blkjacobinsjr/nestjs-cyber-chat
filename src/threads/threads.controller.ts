import { Controller, Get, Post, Delete, Param, Body, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  @Post()
  @UseGuards(JwtAuthGuard)
  createThread(
    @Body('title') title: string,
    @Body('body') body: string,
    @Req() req: any
  ) {
    return this.threadsService.createThread(title, req.user.username, body);
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
  @UseGuards(JwtAuthGuard)
  addComment(
    @Param('id') id: string,
    @Body('body') body: string,
    @Req() req: any
  ) {
    return this.threadsService.addCommentToThread(Number(id), req.user.username, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteThread(@Param('id') id: string, @Req() req: any) {
    const thread = this.threadsService.getThreadWithComments(Number(id)).thread;
    if (thread.author !== req.user.username) {
        throw new ForbiddenException('Only the author can delete this thread');
    }
    this.threadsService.deleteThreadAndComments(Number(id));
    return { message: 'Thread and all related comments deleted' };
  }
}
