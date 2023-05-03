import { User } from '../../models';
import { compare, hash } from 'bcrypt'
import { issueToken, serializeUser } from '../../functions';

export default {
  Query: {
		authenticateUser: async (_, { email, password }) => {
			try {
				let user = await User.findOne({ email });
				if (!user) {
					throw new Error('Email does not exist');
				}

				let isMatch = await compare(password, user.password);
				if(!isMatch) {
					throw new Error('Invalid email or password. Please try again!');
				}
				user = user.toObject();
				user.id = user._id;
				user = serializeUser(user);
				let token = await issueToken(user);
				return { user, token };
			}
			catch (error) {
				throw new Error(error.message, 403);
			}
		},

    getUsers: async () => {
      return User.find({ isDeleted: false });
    },

    getUserById: async (_, { id }) => {
      return User.findById(id, { isDeleted: false });
    },
  },

  Mutation: {
    registerUser: async (_, { newUser }) => {
			try {
				const { email } = newUser;
				let user;
				user = await User.findOne({ email });
				if (user) {
					throw new Error('Email already exist. Please try using another email address.');
				}
				user = new User(newUser);
				user.password = await hash(newUser.password, 10);
				let result = await User.create(user);
				result = result.toObject();
				result.id = result._id;
				result = serializeUser(result);
				let token = await issueToken(result);
				return { user: result, token };
			}
			catch (error) {
				throw new Error(error.message, 400);
			}
    },

    editUserById: async (_, { id, updatedUser }) => {
      return User.findByIdAndUpdate(id, { ...updatedUser }, { new: true });
    },

    deleteUserById: async (_, { id }) => {
      await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      return { id, message: "Deleted successfully", success: true };
    },
  },
};
