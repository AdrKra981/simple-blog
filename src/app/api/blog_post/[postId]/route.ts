import { BlogPostModel } from "@/app/models/BlogPostModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../connectDb";

connectDb();

export async function PUT(request: NextRequest, {params}: any) {
    try {
      const reqBody = await request.json();
  
      const blogPost = await BlogPostModel.findByIdAndUpdate(params.postId, reqBody, { runValidators: true});
  
      return NextResponse.json({message: 'Post updated succesfully', success: true, blogPost}, {status: 200})  
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
}