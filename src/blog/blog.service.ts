import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    try{  
      createBlogDto.noOfCharacters = createBlogDto.description.length
      const newBlog =  await this.blogModel.create(createBlogDto);
      //newBlog.noOfCharacters=newBlog.description.length;
      console.log("saved blog",newBlog);
      return newBlog;
    }catch(err){
      console.log("error in service", err);
      throw new InternalServerErrorException('failed to create blog');
    }
  }

  async  findAll(): Promise<any> {
    return await this.blogModel.find().populate("user");
  }

  async findByUser(user: ObjectId): Promise<any> {
    return await this.blogModel.find({user}).exec();
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
