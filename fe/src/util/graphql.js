import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
    }
  }
`;

export default FETCH_POSTS_QUERY;
