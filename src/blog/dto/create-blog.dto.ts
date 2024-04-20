/* eslint-disable prettier/prettier */
export class CreateBlogDto {
    blogId: number;
    description:string;
    noOfCharacters:number;
    datetime:Date;
    userId: string;  
    // user:{
    //     id:string
    // }
}
