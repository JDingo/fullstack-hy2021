import { format, parseISO } from "date-fns";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-web";
import theme from "../theme";
import Text from "./Text";

const MyReviewItem = ({ review, navigate, deleteReview }) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.colors.white,
      padding: 20,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      paddingBottom: 10,
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
    submitButton: {
      backgroundColor: theme.colors.primary,
      padding: 12,
      borderRadius: 4,
      flexGrow: 1,
    },
    deleteButton: {
      backgroundColor: theme.colors.errorColor,
      padding: 12,
      borderRadius: 4,
      flexGrow: 1,
    },
    buttonText: {
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Text fontWeight={"bold"} color={"primary"}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.headingContainer}>
            <Text
              style={styles.info}
              fontSize={"subheading"}
              fontWeight={"bold"}
            >
              {`${review.repository.ownerName}/${review.repository.name}`}
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
      <View style={styles.buttonContainer}>
        <Pressable style={styles.submitButton} onPress={navigate}>
          <Text
            fontWeight={"bold"}
            fontSize={"subheading"}
            color={"white"}
            style={styles.buttonText}
          >
            View Repository
          </Text>
        </Pressable>
        <View style={{ width: 10 }}></View>
        <Pressable style={styles.deleteButton} onPress={deleteReview}>
          <Text
            fontWeight={"bold"}
            fontSize={"subheading"}
            color={"white"}
            style={styles.buttonText}
          >
            Delete Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewItem;
