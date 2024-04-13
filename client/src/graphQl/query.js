import { gql } from "@apollo/client";

export const getAllPost = gql`
query {
  getPosts {
    id
    title
    description
  }
}
`; 