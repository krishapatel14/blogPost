/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import {User} from './user.schema'


@Schema()
export class Blog {
  @Prop()
  blogId:number;

  @Prop()
  description: string;

  @Prop()
  noOfCharacters: number;

  @Prop({default:0})
  likes: number;
  
  @Prop({default:0})
  disLikes: number;
  
  @Prop({ type: [String], default: [] }) // Array of user names who liked the blog
  likedBy: string[];

  @Prop({ type: [String], default: [] }) // Array of user names who disliked the blog
  disLikedBy: string[];


  @Prop({ default: Date.now })
  datetime: Date;
 
  @Prop({ type:mongoose.Schema.Types.ObjectId,ref:'User' }) // Define user as type Object
  user:User // Object containing userId

  @Prop()
  image: string;
}

export const blogSchema = SchemaFactory.createForClass(Blog);