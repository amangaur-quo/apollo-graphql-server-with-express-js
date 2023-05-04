import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    authUser: User!
    authenticateUser(email: String!, password: String!): AuthResponse!
    getUsers: [User!]!
    getUserById(id: ID!): User!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResponse!
    editUserById(id: ID!, updatedPost: UserInput!): User!
    deleteUserById(id: ID!): UserDeletionNotification!
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
