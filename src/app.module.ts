import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThreadsModule, 
    CommentsModule, 
    UsersModule, 
    AuthModule
  ],
})
export class AppModule {}
