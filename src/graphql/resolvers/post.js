import { Post } from '../../models';

export default {
  Query: {
    getPosts: async () => {
      return Post.find({ isDeleted: false });
    },

    getPostById: async (_, { id }) => {
      return Post.findById(id, { isDeleted: false });
    },
  },

  Mutation: {
    createPost: async (_, { post }) => {
      return Post.create(post);
    },

    editPostById: async (_, { id, updatedPost }) => {
      return Post.findByIdAndUpdate(id, { ...updatedPost }, { new: true });
    },

    deletePostById: async (_, { id }) => {
      await Post.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      return { id, message: 'Deleted successfully', success: true };
    },
  },
};
