import mongoose from "mongoose"

export enum Categories {
    "Programming",
    "Lifestyle",
    "Movies",
    "Music",
    "Investments",
    "Crypto"
}

export type BlogPost = {
    _id: mongoose.Types.ObjectId,
    title: string,
    meta_description?: string,
    content: string,
    author: string,
    category: Categories,
}

export type PostFormValues = Pick<BlogPost, 'title' | 'category' | 'content' | 'meta_description'>