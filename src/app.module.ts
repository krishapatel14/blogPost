/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [
    BlogModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1/blog'),
    UsersModule,
    BlogCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
