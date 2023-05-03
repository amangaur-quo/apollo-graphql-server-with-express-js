import { gql } from 'graphql-tag';

export default gql`
    extend type Query {
       getPosts: [Post!]! @isAuth
       getPostById(id: ID!): Post!
    }

    extend type Mutation {
        createPost(post: PostInput!): Post! @isAuth
        editPostById(id: ID!, updatedPost: PostInput!): Post!
        deletePostById(id: ID!): PushNotification!
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
        isDeleted: Boolean
    }

    type PushNotification {
        id: ID!
        message: String!
        success: Boolean!
    }
`;
