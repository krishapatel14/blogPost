import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ObjectId } from 'mongoose';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
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
        message:error.message
      })
    }
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

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
