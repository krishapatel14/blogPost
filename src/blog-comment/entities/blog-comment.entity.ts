import { Date } from "mongoose";

export class BlogComment {
    blogId:number;
    comment:string;
    noOfCharacters: number;
    commentType: string;
    commentLikes:number;
    dateTime: Date;
}
