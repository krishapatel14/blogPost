/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  //added Authguard for token 
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createBlogDto: CreateBlogDto,@Res() res) {
    try{
      const newBlog=await this.blogService.create(createBlogDto);
      return res.status(201).json({
        message:"Blog created successfully",
        data:newBlog
      })
    }
    catch(error){
      return  res.status(400).json({
        message: "Login First :" + error.message
      })
    }
  }

  //Find all method with token generation 
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    console.log("Find all method called");
    return this.blogService.findAll();
  }

  //  Original Find all method !
  // @Get()
  // findAll() {
  //   return this.blogService.findAll();
  // }

  @Get(':user')
  findOne(@Param('user') user: ObjectId) {
    return this.blogService.findByUser(user)
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
    }  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
