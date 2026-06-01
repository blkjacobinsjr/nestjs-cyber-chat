import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PublicUser, User } from '../types';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findById(id: number): PublicUser {
    const user = this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.toPublicUser(user);
  }

  findByEmailWithPassword(email: string): User | null {
    return this.usersRepo.findByEmail(email);
  }

  async create(email: string, password: string): Promise<PublicUser> {
    const existing = this.usersRepo.findByEmail(email);
    if (existing) {
      throw new ConflictException('A user with this email already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = this.usersRepo.save({ email, passwordHash });
    return this.toPublicUser(user);
  }

  private toPublicUser(user: User): PublicUser {
    const { passwordHash, ...publicUser } = user;
    return publicUser;
  }
}
