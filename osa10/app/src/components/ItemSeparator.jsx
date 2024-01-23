import { StyleSheet, View } from "react-native";

const ItemSeparator = () => {
  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });

  return <View style={styles.separator} />;
};

export default ItemSeparator;
