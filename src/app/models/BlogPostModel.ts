import {  getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

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

    @prop({type: String, required: true, default: []})
    public tags!: mongoose.Types.Array<string>;
}

export const BlogPostModel = mongoose.models.BlogPost || getModelForClass(BlogPost);
   