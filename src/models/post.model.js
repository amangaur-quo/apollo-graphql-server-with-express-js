import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

postSchema.pre('find', function() {
  this.where({ deletedAt: null });
});

postSchema.pre('findOne', function() {
  this.where({ deletedAt: null });
});

postSchema.plugin(mongoosePaginate);

export const Post = model('posts', postSchema);
