import useAuthStorage from "./useAuthStorage";

const { useMutation, useApolloClient } = require("@apollo/client");
const { SIGN_IN } = require("../graphql/mutations");

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } });
    const accessToken = data.authenticate.accessToken;

    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
