import { Injectable } from '@nestjs/common';
import { Comment } from '../types';

@Injectable()
export class CommentsRepository {
  private comments = new Map<number, Comment>();
  private nextId = 1;

  findById(id: number): Comment | null {
    return this.comments.get(id) || null;
  }

  findByThreadId(threadId: number): Comment[] {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.threadId === threadId
    );
  }

  save(comment: Omit<Comment, 'id' | 'createdAt'> & { id?: number; createdAt?: Date }): Comment {
    const id = comment.id || this.nextId++;
    const createdAt = comment.createdAt || new Date();
    const newComment: Comment = {
      ...comment,
      id,
      createdAt,
    };
    this.comments.set(id, newComment);
    return newComment;
  }

  softDelete(id: number): boolean {
    const comment = this.comments.get(id);
    if (!comment) return false;
    
    comment.body = 'deleted';
    this.comments.set(id, comment);
    return true;
  }

  deleteByThreadId(threadId: number): void {
    Array.from(this.comments.keys()).forEach((id) => {
      const comment = this.comments.get(id);
      if (comment && comment.threadId === threadId) {
        this.comments.delete(id);
      }
    });
  }
}
