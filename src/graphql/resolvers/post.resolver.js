export default {
  Query: {
    getPosts: async (_, {}, { Post }) => {
      return Post.find().populate('author');
    },

    getPostById: async (_, { id }, { Post }) => {
      return Post.findById(id).populate('author');
    },
  },

  Mutation: {
    createPost: async (_, { post }, { Post, authUser }) => {
      const newPost = await Post.create({ ...post, author: authUser._id });
      return newPost.populate('author');
    },

    editPostById: async (_, { id, post }, { Post, authUser }) => {
      try {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: id, author: authUser._id }, 
          { ...post }, 
          { new: true }
        ).populate('author');
        
        if (!updatedPost) {
          throw new Error('Failed to update the post. Please try again later.');
        }
        return updatedPost;
      }
      catch (error) {
        throw new Error(error.message, 400);
      }
    },

    deletePostById: async (_, { id }, { Post }) => {
      try {
        await Post.findOneAndUpdate(id, { isDeleted: true }, { new: true });
      }
      catch (error) {
        throw new Error(error.message, 400);
      }
      
      return { id, message: 'Deleted successfully', success: true };
    },
  },
};
