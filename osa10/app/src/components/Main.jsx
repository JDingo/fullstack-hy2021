import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import theme from "../theme";
import AppBar from "./AppBar";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";
import RepositoryList from "./RepositoryList";
import { RepositoryView } from "./RepositoryView";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackgroundColor,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<RepositoryList></RepositoryList>} exact />
        <Route path="/signin" element={<SignIn></SignIn>} />
        <Route path="/createReview" element={<CreateReview></CreateReview>} />
        <Route path="/myReviews" element={<MyReviews></MyReviews>} />
        <Route
          path="/:repositoryId"
          element={<RepositoryView></RepositoryView>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
