const { useMutation } = require("@apollo/client");
const { DELETE_REVIEW } = require("../graphql/mutations");

const useDelete = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
    const { data } = await mutate({
      variables: { deleteReviewId: id },
    });

    return data;
  };

  return [deleteReview, result];
};

export default useDelete;
