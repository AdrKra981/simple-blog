import {  getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Categories } from "../types/BlogPost";



@modelOptions({ schemaOptions: {} })
class BlogPost {
    @prop({required: true, unique: true})
    public title!: string;

    @prop()
    public meta_description?: string;

    @prop({required: true})
    public content!: string;

    @prop({required: true})
    public author!: string;

    @prop({required: true, enum: Categories, default: Categories.Programming})
    public category!: Categories;
}

export const BlogPostModel = mongoose.models.BlogPost || getModelForClass(BlogPost);
   