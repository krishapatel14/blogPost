/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { loginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>,
private jwtService : JwtService) {}

  //signup user
  async signUp(createUserDto: CreateUserDto): Promise<{token: string}> {
    try {
      const {first_name , last_name , email , password} = createUserDto;
      const hashedPassword = await bcrypt.hash(password , 10);
      const user = await this.userModel.create({
        first_name:first_name,
        last_name:last_name,
        email:email,
        password:hashedPassword
      })
      const token = this.jwtService.sign({id : user._id});
      return {token};
    } catch (err) {
      console.log("error in service", err);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
  // login user
  async login(loginDto : loginUserDto):Promise<{token:string}>{
    try{
      console.log('in user login service method!')
      const {email,password} = loginDto;
      const user = await this.userModel.findOne({email});
      if(!user){
        throw new UnauthorizedException('Invalid Credentials!!');
      }
      const isPasswordMatched = await bcrypt.compare(password,user.password)
      console.log(password)
      console.log(user.password)
      if(!isPasswordMatched){
        throw new UnauthorizedException('Invalid Password!!')
      }
      const token = this.jwtService.sign({id:user._id})
      return {token};
    }catch(err){
      console.log("error in service", err);
      throw new InternalServerErrorException('Failed to login user!!');
    }
  }
}
