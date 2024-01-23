import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ order, debouncedSearchQuery, first }) => {
  const orderObject =
    order === "CREATED_AT"
      ? { orderBy: "CREATED_AT", orderDirection: "DESC" }
      : order === "RATING_DESC"
      ? { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }
      : { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };

  const variables = {
    orderBy: orderObject.orderBy,
    orderDirection: orderObject.orderDirection,
    searchKeyword: debouncedSearchQuery || "",
    first,
  };
  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    error,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
