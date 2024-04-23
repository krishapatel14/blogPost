/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model, ObjectId } from 'mongoose';
import { LikeBlogDto } from './dto/like-blog.dto';
import { DislikeBlogDto } from './dto/dislike-blog.dto';

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


  //Service for Blog-likes
  async likeBlog(likeBlogDto: LikeBlogDto, userId: string): Promise<Blog> {
    const { blogId } = likeBlogDto;
    const blog = await this.blogModel.findById<Blog>(blogId); // Specify the type of document as Blog
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    
    if (blog.likedBy.includes(userId)) {
      throw new ConflictException('You already liked this blog');
    }

    else{
      
      return await this.blogModel.findByIdAndUpdate(blogId,{
        $inc:{likes:1},
        $push:{
          likedBy:userId,
          
        }
      })
    }
  }
  async dislikeBlog(dislikeBlogDto: DislikeBlogDto, userId: string): Promise<Blog> {
    const { blogId } = dislikeBlogDto;
    const blog = await this.blogModel.findById<Blog>(blogId); // Specify the type of document as Blog
    console.log("UserId............"+userId);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.disLikedBy?.includes(userId)) {
      throw new ConflictException('You already disliked this blog');
    }
    else{
      return await this.blogModel.findByIdAndUpdate(blogId,{
        $inc:{disLikes:1,likes:-1},
        
        $push:{
          disLikedBy:userId
        },
        $pull:{
          likedBy:userId,
        },
        
      })
    }
    
  }
  async  findAll(): Promise<any> {
    return await this.blogModel.find().populate("user").exec(); //added exec()
  }

  async findByUser(user: ObjectId): Promise<any> {
    return await this.blogModel.find({user}).exec();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto):Promise<any> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true });
    return updatedBlog;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
