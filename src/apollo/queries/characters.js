import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        image
        species
        gender
      }
    }
  }
`;

export default GET_CHARACTERS;