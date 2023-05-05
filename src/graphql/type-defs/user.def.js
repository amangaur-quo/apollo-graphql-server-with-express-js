import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    authUserProfile: User! @isAuth
    authenticateUser(email: String!, password: String!): AuthResponse!
    getUsers: [User!]! @isAuth
    getUserById(id: ID!): User! @isAuth
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResponse!
    editUserById(id: ID!, updatedPost: UserInput!): User! @isAuth
    deleteUserById(id: ID!): UserDeletionNotification! @isAuth
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
    isDeleted: Boolean
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type UserDeletionNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`;
