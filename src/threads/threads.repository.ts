import { Injectable } from '@nestjs/common';
import { Thread } from '../types';

@Injectable()
export class ThreadsRepository {
  private threads = new Map<number, Thread>();
  private nextId = 1;

  findAll(): Thread[] {
    return Array.from(this.threads.values());
  }

  findById(id: number): Thread | null {
    return this.threads.get(id) || null;
  }

  save(thread: Omit<Thread, 'id' | 'createdAt'> & { id?: number; createdAt?: Date }): Thread {
    const id = thread.id || this.nextId++;
    const createdAt = thread.createdAt || new Date();
    const newThread: Thread = {
      ...thread,
      id,
      createdAt,
    };
    this.threads.set(id, newThread);
    return newThread;
  }

  delete(id: number): boolean {
    return this.threads.delete(id);
  }
}
