import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const RepositoryItemStats = ({ repository }) => {
  const starsString =
    repository.stargazersCount > 1000
      ? Math.floor(repository.stargazersCount / 100) / 10 + "k"
      : repository.stargazersCount;

  const forksString =
    repository.forksCount > 1000
      ? Math.floor(repository.forksCount / 100) / 10 + "k"
      : repository.forksCount;

  const reviewString =
    repository.reviewCount > 1000
      ? Math.floor(repository.reviewCount / 100) / 10 + "k"
      : repository.reviewCount;

  const ratingString =
    repository.ratingAverage > 1000
      ? Math.floor(repository.ratingAverage / 100) / 10 + "k"
      : repository.ratingAverage;

  return (
    <View style={styles.flexContainer}>
      <View style={styles.statContainer}>
        <Text fontWeight={"bold"}>{starsString}</Text>
        <Text color={"textSecondary"}>Stars</Text>
      </View>
      <View style={styles.statContainer}>
        <Text fontWeight={"bold"}>{forksString}</Text>
        <Text color={"textSecondary"}>Forks</Text>
      </View>
      <View style={styles.statContainer}>
        <Text fontWeight={"bold"}>{reviewString}</Text>
        <Text color={"textSecondary"}>Reviews</Text>
      </View>
      <View style={styles.statContainer}>
        <Text fontWeight={"bold"}>{ratingString}</Text>
        <Text color={"textSecondary"}>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItemStats;
