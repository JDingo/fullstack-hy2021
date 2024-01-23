import useAuthStorage from "./useAuthStorage";

const { useApolloClient } = require("@apollo/client");

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return signOut;
};

export default useSignOut;
