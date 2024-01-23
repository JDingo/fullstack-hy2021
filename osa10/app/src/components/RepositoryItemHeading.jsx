import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  imageContainer: {
    flexGrow: 0,
    paddingRight: 20,
  },
  infoContainer: {
    flexGrow: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 1,
    paddingBottom: 10,
  },
  info: {
    paddingBottom: 8,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 4,
    flexGrow: 0,
  },
});

const RepositoryItemHeading = ({ repository }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={{ uri: repository.ownerAvatarUrl }}
        ></Image>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info} fontSize={"subheading"} fontWeight={"bold"}>
          {repository.fullName}
        </Text>
        <Text style={styles.info} color={"textSecondary"}>
          {repository.description}
        </Text>
        <View style={styles.languageTag}>
          <Text color={"white"}>{repository.language}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItemHeading;
