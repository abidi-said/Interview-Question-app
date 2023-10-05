import React from "react";
import { View } from "react-native";
import SearchBox from "react-native-search-bar";
import { IQTheme, useTheme } from "../../themes";

import dynamicStyles from "./styles";

export default function SearchBar(props) {
  const {
    onChangeText,
    onSearchBarCancel,
    onSearch,
    searchRef,
    placeholder,
    searchContainerStyle,
  } = props;

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  const onSearchTextChange = (text) => {
    onChangeText(text);
  };

  const onCancel = () => {
    onSearchTextChange("");
    onSearchBarCancel();
  };

  const onSearchClear = () => {
    onSearchTextChange("");
  };

  return (
    <View style={[styles.container, searchContainerStyle]}>
      <SearchBox
        ref={searchRef}
        placeholder={placeholder || "Search"}
        onChangeText={onSearchTextChange}
        onSearchButtonPress={onSearch}
        showsCancelButton={true}
        searchBarStyle="minimal"
        cancelButtonText={"Cancel"}
        style={styles.searchInput}
        showsCancelButtonWhileEditing={true}
        onCancelButtonPress={onCancel}
        onSearchClear={onSearchClear}
        tintColor={IQTheme.colors[colorScheme].primaryForeground}
        textColor={IQTheme.colors[colorScheme].primaryText}
      />
    </View>
  );
}
