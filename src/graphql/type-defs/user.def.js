import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    authenticateUser(email: String!, password: String!): AuthResponse!
    authUserProfile: User! @isAuth
    getUsers: [User!]! @isAuth
  }

  extend type Mutation {
    registerUser(user: UserInput!): AuthResponse!
    editUserById(id: ID!, user: UserInput!): User! @isAuth
    deleteUserById(id: ID!): PushNotification! @isAuth
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
`;
