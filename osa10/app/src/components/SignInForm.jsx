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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username"></FormikTextInput>
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      ></FormikTextInput>
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text
          style={styles.submitButtonText}
          fontWeight={"bold"}
          fontSize={"subheading"}
          color={"white"}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
