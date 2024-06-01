import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { multerConfig } from './blog/multer.config';
import { v2 as cloudinary } from 'cloudinary';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  cloudinaryHandler = async (file) => {
    cloudinary.config({
      cloud_name: "devdqfcvc",
      api_key: "857386954129854",
      api_secret: "f0GjCOFtsVsy5kI2U1uL7_yHois"
    })
    return await cloudinary.uploader.upload(file.path);
  }

  @Post("/file")
  @UseInterceptors(FileInterceptor('file',multerConfig))
  async handleUpload(@UploadedFile() file : Express.Multer.File){
    try{
      console.log(file);
      var result=await this.cloudinaryHandler(file);
      console.log(result);
      return file;
    }
    catch(err){
      console.log(err);
      return err;
    }
  }
}
