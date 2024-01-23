const { useMutation } = require("@apollo/client");
const { CREATE_REVIEW } = require("../graphql/mutations");

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    repositoryOwnerName,
    repositoryName,
    rating,
    text,
  }) => {
    const { data } = await mutate({
      variables: { repositoryOwnerName, repositoryName, rating, text },
    });

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
