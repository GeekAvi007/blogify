import { text } from "express";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text:
    {
        type:String,
        required:true
    }
},{timestamps: true})

const blogSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required:true
    },
    content: String,
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
},{timestamps: true});

export default mongoose.model('Blog', blogSchema)