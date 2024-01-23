import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    padding: 20,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
  },
  submitButtonText: {
    textAlign: "center",
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="repositoryOwnerName"
        placeholder="Repository Owner Name"
      ></FormikTextInput>
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository Name"
      ></FormikTextInput>
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 to 100"
      ></FormikTextInput>
      <FormikTextInput
        name="text"
        placeholder="Review"
        multiline={true}
      ></FormikTextInput>
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text
          style={styles.submitButtonText}
          fontWeight={"bold"}
          fontSize={"subheading"}
          color={"white"}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
