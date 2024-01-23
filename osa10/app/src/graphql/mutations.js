const { gql } = require("@apollo/client");

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation(
    $repositoryOwnerName: String!,
    $repositoryName: String!,
    $rating: Int!,
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $repositoryOwnerName,
        repositoryName: $repositoryName,
        rating: $rating,
        text: $text
      }
    ) {
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`