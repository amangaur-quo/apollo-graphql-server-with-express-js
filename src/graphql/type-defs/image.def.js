import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    info: String!
  }

  extend type Mutation {
    imageUploader(file: Upload!): String!
  }
`;
