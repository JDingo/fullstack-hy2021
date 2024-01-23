import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

const AppBarTab = ({ text, url, onPress = null }) => {
  return (
    <Link to={url} onPress={onPress} style={styles.container}>
      <Text color={"white"} fontSize={"subheading"} fontWeight={"bold"}>
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
