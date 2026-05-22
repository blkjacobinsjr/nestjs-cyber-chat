import { Injectable, NotFoundException } from '@nestjs/common';
import { ThreadsRepository } from './threads.repository';
import { CommentsService } from '../comments/comments.service';
import { Thread, Comment } from '../types';

@Injectable()
export class ThreadsService {
  constructor(
    private readonly threadsRepo: ThreadsRepository,
    private readonly commentsService: CommentsService
  ) {}

  createThread(title: string, author: string, body: string): Thread {
    return this.threadsRepo.save({ title, author, body });
  }

  listAll(): Thread[] {
    return this.threadsRepo.findAll();
  }

  getThreadWithComments(id: number): { thread: Thread; comments: Comment[] } {
    const thread = this.threadsRepo.findById(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    const comments = this.commentsService.getCommentsForThread(id);
    return { thread, comments };
  }

  addCommentToThread(threadId: number, author: string, body: string): Comment {
    const thread = this.threadsRepo.findById(threadId);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${threadId} not found`);
    }
    return this.commentsService.createComment(threadId, author, body);
  }

  deleteThreadAndComments(id: number): void {
    const thread = this.threadsRepo.findById(id);
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    this.threadsRepo.delete(id);
    this.commentsService.deleteCommentsByThread(id);
  }
}
