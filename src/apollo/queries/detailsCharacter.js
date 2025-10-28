import { gql } from "@apollo/client";

const GET_DETAIL_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

export default GET_DETAIL_CHARACTER;