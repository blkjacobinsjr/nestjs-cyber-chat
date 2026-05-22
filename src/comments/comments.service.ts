import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Comment } from '../types';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepo: CommentsRepository) {}

  getComment(id: number): Comment {
    const comment = this.commentsRepo.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  getCommentsForThread(threadId: number): Comment[] {
    return this.commentsRepo.findByThreadId(threadId);
  }

  createComment(threadId: number, author: string, body: string): Comment {
    return this.commentsRepo.save({ threadId, author, body });
  }

  softDelete(id: number): void {
    const success = this.commentsRepo.softDelete(id);
    if (!success) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  deleteCommentsByThread(threadId: number): void {
    this.commentsRepo.deleteByThreadId(threadId);
  }
}
