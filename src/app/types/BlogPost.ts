import mongoose from "mongoose"

export const Tags = [
    {
        label: 'Programming',
        value: 'programming',
    },
    {
        label: 'Lifestyle',
        value: 'lifestyle',
    },
    {
        label: 'Music',
        value: 'music',
    },
    {
        label: 'Investments',
        value: 'investments',
    },
    {
        label: 'Crypto',
        value: 'crypto',
    },
    {
        label: 'Sport',
        value: 'sport',
    },
    {
        label: 'Movies',
        value: 'movies',
    }
]

export type BlogPost = {
    _id: mongoose.Types.ObjectId,
    title: string,
    meta_description?: string,
    content: string,
    author: string,
    tags: string[],
}

export type PostFormValues = Pick<BlogPost, 'title' | 'tags' | 'content' | 'meta_description'>