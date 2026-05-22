import { Module } from '@nestjs/common';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ThreadsModule, CommentsModule],
})
export class AppModule {}
