import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BlogCommentService } from './blog-comment.service';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { UpdateBlogCommentDto } from './dto/update-blog-comment.dto';

@Controller('blog-comment')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Post()
  async create(@Body() createBlogCommentDto: CreateBlogCommentDto,@Res() res) {
    try{
      const newBlogComment=await this.blogCommentService.create(createBlogCommentDto);
      return res.status(201).json({
        message:"BlogComment added successfully",
        data:newBlogComment
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
    return this.blogCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogCommentDto: UpdateBlogCommentDto) {
    return this.blogCommentService.update(+id, updateBlogCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogCommentService.remove(+id);
  }
}
