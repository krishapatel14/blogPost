/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/users/fetchUserId';
import { LikeBlogDto } from './dto/like-blog.dto';
import { DislikeBlogDto } from './dto/dislike-blog.dto';


@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Modified create method to use UserId decorator
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createBlogDto: CreateBlogDto, @UserId() userId: string, @Res() res) {
    try {
      const newBlog = await this.blogService.create({...createBlogDto, userId});
      return res.status(201).json({
        message: "Blog created successfully",
        data: newBlog
      });
    } catch (error) {
      return res.status(400).json({
        message: "Login First: " + error.message
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    console.log("Find all method called");
    return this.blogService.findAll();
  }

  // @Get(':user')
  // findOne(@Param('user') user: ObjectId) {
  //   return this.blogService.findByUser(user)
  // }

  @Post('like')
  @UseGuards(AuthGuard('jwt'))
  async likeBlog(@Body() likeBlogDto: LikeBlogDto, @UserId() userId: string, @Res() res) {
    try {
      const updatedBlog = await this.blogService.likeBlog(likeBlogDto, userId);
      return res.status(200).json({
        message: 'Blog liked successfully',
        updatedBlog
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  @Post('dislike')
  @UseGuards(AuthGuard('jwt'))
  async dislikeBlog(@Body() dislikeBlogDto: DislikeBlogDto, @UserId() userId:string,@Res() res) {
    try {
      const updatedBlog = await this.blogService.dislikeBlog(dislikeBlogDto,userId);
      return res.status(200).json({
        message: 'Blog disliked successfully',
        updatedBlog
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Failed to dislike blog: ' + error.message
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      const updatedBlog = await this.blogService.update(id, updateBlogDto);
      return { 
        message: 'Blog updated successfully',
        updatedBlog
      };
    } catch (error) {
      return { error: 'Internal server error' };
    }  
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
