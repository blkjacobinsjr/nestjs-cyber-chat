import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PublicUser } from '../types';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  register(email: string, password: string): Promise<PublicUser> {
    return this.usersService.create(email, password);
  }

  async login(email: string, password: string) {
    const user = this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');

    }
    accessToken =await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    })
    throw new Error('TODO: compare password, sign JWT, return accessToken');
  }
});

return { accessToken };
