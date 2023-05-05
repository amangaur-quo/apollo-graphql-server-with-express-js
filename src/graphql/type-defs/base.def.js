import { gql } from 'graphql-tag';

export default gql`
  directive @isAuth on FIELD_DEFINITION
  scalar Upload

  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }

  type Subscription {
    _: String!
  }

  type PushNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`;
