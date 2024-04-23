/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from './fetchUserId';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@UserId() userId: string) {
    return { userId };
  }

  // post method for signup
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      console.log(createUserDto)
      const savedUser = await this.usersService.signUp(createUserDto);
      return res.status(201).json({
        message: 'User added successfully',
        data: savedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to add user',
        error: error.message,
      });
    }
  }

  // post method for login
  @Post('login')
  async login(@Body() loginUserDto:loginUserDto,@Req() req,@Res() res):Promise<{token:string}>{
    console.log('in users login!')
    console.log(loginUserDto)
    const data = await this.usersService.login(loginUserDto);
    
    return res.status(200).json({
      message:'Login Successfull',
      data:data
    });
  }
}
