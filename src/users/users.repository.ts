import { Injectable } from '@nestjs/common';
import { User } from '../types';

@Injectable()
export class UsersRepository {
  private users = new Map<number, User>();
  private nextId = 1;

  findById(id: number): User | null {
    return this.users.get(id) || null;
  }

  findByEmail(email: string): User | null {
    return (
      Array.from(this.users.values()).find((user) => user.email === email) ||
      null
    );
  }

  save(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: this.nextId++,
      createdAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}
