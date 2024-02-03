import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../connectDb";
import { BlogPostModel } from "@/app/models/BlogPostModel";

connectDb();

export async function GET(){
    try{
        const blogPosts = await BlogPostModel.find({});
       

        return NextResponse.json(blogPosts, {status: 200})  
    }catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const blogPost = await BlogPostModel.findOne({title: reqBody.title});

    if(blogPost){
        throw new Error('Post with that title already exists in database!')
    }

    const post = reqBody;

    if(!post.meta_description){
      post.meta_description = post.title;
    }

    await BlogPostModel.create(post);
    return NextResponse.json({message: 'Post created succesfull', success: true}, {status: 201})  
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}