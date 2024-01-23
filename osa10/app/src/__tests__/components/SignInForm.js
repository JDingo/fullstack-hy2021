import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { Formik } from "formik";
import SignInForm from "../../components/SignInForm";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const initialValues = {
        username: "",
        password: "",
      };

      const { getByPlaceholderText, getByText } = render(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <SignInForm onSubmit={handleSubmit}></SignInForm>
          )}
        </Formik>
      );

      act(() => {
        fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
      });

      act(() => {
        fireEvent.changeText(getByPlaceholderText("Password"), "password");
      });

      act(() => {
        fireEvent.press(getByText("Sign in"));
      });

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
