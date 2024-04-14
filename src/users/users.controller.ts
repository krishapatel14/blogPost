import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // post method for signup
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
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
    const data = await this.usersService.login(loginUserDto);
    
    return res.status(200).json({
      message:'Login Successfull',
      data:data
    });
  }
}
