import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImgae: {
      type: String,
      required: false,
    },
    author: {
      ref: 'users',
      type: Schema.Types.ObjectId
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Post = model('posts', postSchema);
