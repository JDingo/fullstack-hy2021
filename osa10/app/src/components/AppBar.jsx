import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useMe from "../hooks/useMe";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,

    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  const queryResult = useMe();

  const { id, username } = queryResult.me || {};

  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={"Repositories"} url="/"></AppBarTab>
        {id && username ? (
          <>
            <AppBarTab text={"Create Review"} url="/createReview"></AppBarTab>
            <AppBarTab text={"My Reviews"} url="/myReviews"></AppBarTab>
            <AppBarTab text={"Sign Out"} onPress={signOut}></AppBarTab>
          </>
        ) : (
          <AppBarTab text={"Sign In"} url="/signin"></AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
