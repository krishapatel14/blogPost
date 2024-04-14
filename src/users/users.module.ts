/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService : ConfigService) =>({
        secret : configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn : configService.get<string | number>('JWT_EXPIRATION_TIME')
        }
      })
    }),
    MongooseModule.forFeature([{ name:'User' , schema : userSchema}])
  ],
  controllers: [
    UsersController
  ],
  providers: [UsersService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class UsersModule {}
