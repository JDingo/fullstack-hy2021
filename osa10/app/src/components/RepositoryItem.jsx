import { Linking, Pressable, StyleSheet, View } from "react-native";
import RepositoryItemHeading from "./RepositoryItemHeading";
import RepositoryItemStats from "./RepositoryItemStats";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  linkButtonText: {
    textAlign: "center",
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemHeading repository={repository}></RepositoryItemHeading>
      <RepositoryItemStats repository={repository}></RepositoryItemStats>
      {repository.url ? (
        <Pressable
          style={styles.linkButton}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text
            style={styles.linkButtonText}
            fontWeight={"bold"}
            fontSize={"subheading"}
            color={"white"}
          >
            Open in GitHub
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
