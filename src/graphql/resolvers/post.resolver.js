export default {
  Query: {
    getPosts: async (_, {}, { Post }) => {
      return Post.find({ isDeleted: false }).populate('author');
    },

    getPostById: async (_, { id }, { Post }) => {
      return Post.findById(id, { isDeleted: false }).populate('author');
    },
  },

  Mutation: {
    createPost: async (_, { post }, { Post, user }) => {
      const newPost = await Post.create({ ...post, author: user._id });
      return newPost.populate('author');
    },

    editPostById: async (_, { id, updatedPost }, { Post }) => {
      return Post.findByIdAndUpdate(id, { ...updatedPost }, { new: true }).populate('author');
    },

    deletePostById: async (_, { id }, { Post }) => {
      await Post.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      return { id, message: 'Deleted successfully', success: true };
    },
  },
};
