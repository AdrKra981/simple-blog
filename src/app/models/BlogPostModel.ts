import {  getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export enum Categories {
    "Programming",
    "Lifestyle",
    "Movies",
    "Music",
    "Investments",
    "Crypto"
}

@modelOptions({ schemaOptions: {} })
class BlogPost {
    @prop({required: true, unique: true})
    public title!: string;

    @prop()
    public meta_description?: string;

    @prop({required: true})
    public content!: string;

    @prop({required: true})
    public author_id!: mongoose.Types.ObjectId;

    @prop({required: true, enum: Categories, default: Categories.Programming})
    public category!: Categories;
}

export const BlogPostModel = mongoose.models.BlogPost || getModelForClass(BlogPost);
   