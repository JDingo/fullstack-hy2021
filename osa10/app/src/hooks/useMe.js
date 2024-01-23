import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMe = (variables) => {
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    variables,
  });

  return { me: data?.me, error, loading, refetch };
};

export default useMe;
