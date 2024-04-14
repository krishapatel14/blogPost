import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import { Blog } from './blog.schema'

@Schema()
export class BlogComment{
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Blog'})
    blogId:Blog;

    @Prop()
    comment:string

    @Prop()
    noOfCharacters:number

    @Prop()
    commentType:string //reply or normal

    @Prop({default:0})
    commentLikes:number

    @Prop()
    dateTime:Date

}

export const  BlogCommentSchema=SchemaFactory.createForClass(BlogComment);
