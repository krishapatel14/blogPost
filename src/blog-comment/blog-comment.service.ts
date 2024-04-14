import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogComment } from './entities/blog-comment.entity';

@Injectable()
export class BlogCommentService {
  constructor(@InjectModel(BlogComment.name) private readonly blogCommentModel: Model<BlogComment>) {}

  async create(createBlogCommentDto: CreateBlogCommentDto): Promise<BlogComment> {
    try{
      createBlogCommentDto.noOfCharacters=createBlogCommentDto.comment.length;
     const newBlogComment =  await this.blogCommentModel.create(createBlogCommentDto);
     return  newBlogComment;
    }catch(err){
      console.log("error in service", err);
      throw new InternalServerErrorException('failed to create blog')
    }
  }

  async findAll(): Promise<any> {
    return await this.blogCommentModel
    .find()
    .populate({
      path: 'blogId',
      populate: {
        path: 'user', // assuming there's an user field in the blog post schema
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} blogComment`;
  }

  update(id: number, updateBlogCommentDto: UpdateBlogCommentDto) {
    return `This action updates a #${id} blogComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogComment`;
  }
}
