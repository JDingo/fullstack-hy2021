import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native-web";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

export const RepositoryView = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      padding: 20,
    },
    separator: {
      height: 10,
    },
  });

  const { repositoryId } = useParams();
  const { repository, fetchMore } = useRepository({ repositoryId, first: 8 });

  const onEndReach = () => {
    fetchMore();
  };

  const reviewNodes = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return repository ? (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem repository={repository} />
          <ItemSeparator></ItemSeparator>
        </>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  ) : (
    <View></View>
  );
};

export default RepositoryView;
