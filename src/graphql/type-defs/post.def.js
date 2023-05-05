import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    getPosts: [Post!]! @isAuth
    getPostById(id: ID!): Post! @isAuth
  }

  extend type Mutation {
    createPost(post: PostInput!): Post! @isAuth
    editPostById(id: ID!, post: PostInput!): Post! @isAuth
    deletePostById(id: ID!): PushNotification! @isAuth
  }

  input PostInput {
    title: String!
    content: String!
    featuredImgae: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    featuredImgae: String
    createdAt: String
    updatedAt: String
    deletedAt: String
    author: User!
  }
`;
