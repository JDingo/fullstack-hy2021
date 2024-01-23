import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  errorText: {
    marginTop: 2,
    marginBottom: 5,
  },
  textInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.textInput}
        {...props}
      />
      {showError && (
        <Text color={"error"} style={styles.errorText}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

export default FormikTextInput;
