import { Alert, FlatList } from "react-native";
import { useNavigate } from "react-router-native";
import useDelete from "../hooks/useDelete";
import useMe from "../hooks/useMe";
import ItemSeparator from "./ItemSeparator";
import MyReviewItem from "./MyReviewItem";

const MyReviews = () => {
  const queryResult = useMe({ includeReviews: true });

  const reviewNodes = queryResult?.me?.reviews
    ? queryResult.me.reviews.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();
  const [deleteReview] = useDelete();

  const deletePress = (id) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview({ id });
            queryResult.refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <MyReviewItem
          review={item}
          navigate={() => navigate(`/${item.repositoryId}`)}
          deleteReview={() => deletePress(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
