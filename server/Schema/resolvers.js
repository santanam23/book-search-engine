const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { deleteBook } = require("../controllers/user-controller");
const bookSchema = require("../models/Book");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select("-__v -password")
                .populate("books");
      
              return userData;
            }
            throw new AuthenticationError("Not logged in");
          },
          users: async () => {
            return User.find()
              .select("-__v -password")
              .populate("books");
          },
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select("-__v -password")
              .populate("books");
          }
    },

    Mutation: {
        addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
    
        return { token, user };
        },
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
    
        if (!user) {
            throw new AuthenticationError("Incorrect credentials");
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
        }
    
        const token = signToken(user);
        return { token, user };
        },

        saveBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await user.findAndUpdate(
                   { _id: context.user._id},
                   { $push: {savedBooks: [bookSchema]}},
                   { new: true}
                );
                // return user type
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: { books: bookId } },
                  { new: true }
                ).populate('books');
            
            return updatedUser;
        }
    },
},

}

module.exports = resolvers;