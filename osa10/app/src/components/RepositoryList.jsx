import useRepositories from "../hooks/useRepositories";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortingTab: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchBar: {
    margin: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => onChangeSearch(query)}
            value={searchQuery}
            style={styles.searchBar}
          ></Searchbar>
          <Picker
            selectedValue={order}
            onValueChange={(itemValue) => setOrder(itemValue)}
            style={styles.sortingTab}
          >
            <Picker.Item
              label="Latest repositories"
              value="CREATED_AT"
            ></Picker.Item>
            <Picker.Item
              label="Highest rated repositories"
              value="RATING_DESC"
            ></Picker.Item>
            <Picker.Item
              label="Lowest rated repositories"
              value="RATING_ASC"
            ></Picker.Item>
          </Picker>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigate(`/${item.id}`);
          }}
        >
          <RepositoryItem repository={item}></RepositoryItem>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("CREATED_AT");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    order,
    debouncedSearchQuery,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    ></RepositoryListContainer>
  );
};

export default RepositoryList;
