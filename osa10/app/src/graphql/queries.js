import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ownerAvatarUrl
          id
          fullName
          description
          language
          forksCount
          ratingAverage
          reviewCount
          stargazersCount
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
        edges {
          cursor
          node {
            repositoryId
            text
            rating
            id
            createdAt
            user {
              username
            }
            repository {
              ownerName
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      ownerAvatarUrl
      id
      fullName
      description
      forksCount
      ratingAverage
      reviewCount
      stargazersCount
      url
      language
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
              id
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
