import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { ThreadsRepository } from './threads.repository';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';

@Module({
  imports: [CommentsModule], // Injecting external exported CommentsService
  providers: [ThreadsRepository, ThreadsService],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
