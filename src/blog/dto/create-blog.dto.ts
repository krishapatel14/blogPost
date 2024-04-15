/* eslint-disable prettier/prettier */
export class CreateBlogDto {
    blogId: number;
    description:string;
    noOfCharacters:number;
    datetime:Date;
    user:{
        id:string
    }
}
