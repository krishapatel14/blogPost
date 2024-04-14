export class CreateBlogCommentDto {
    blogId:number;
    comment:string;
    noOfCharacters: number;
    commentType: string;
    commentLikes:number;
    dateTime: Date;
}
