import { format, parseISO } from "date-fns";
import { View } from "react-native";
import { StyleSheet } from "react-native-web";
import theme from "../theme";
import Text from "./Text";

const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.colors.white,
      padding: 20,
    },
    imageContainer: {
      flexGrow: 0,
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
      borderStyle: "solid",
      borderColor: theme.colors.primary,
      borderWidth: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    infoContainer: {
      flexGrow: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexShrink: 1,
    },
    headingContainer: {
      marginBottom: 4,
    },
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.imageContainer}>
        <Text fontWeight={"bold"} color={"primary"}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.info} fontSize={"subheading"} fontWeight={"bold"}>
            {review.user.username}
          </Text>
          <Text style={styles.info} color={"textSecondary"}>
            {format(parseISO(review.createdAt), "dd.MM.yyyy")}
          </Text>
        </View>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
