/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from '../schemas/blog.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    UsersModule,
    MongooseModule.forFeature([{name:Blog.name, schema:blogSchema}])
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
