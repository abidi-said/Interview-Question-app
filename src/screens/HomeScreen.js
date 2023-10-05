import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { Searchbar } from "react-native-paper";

import { mocks } from "../constants";

import Card from "../components/Card";
import Text from "../components/Text";
import Badge from "../components/Badge";
import { IQActivityIndicator } from "../truly-native";
import { IQTheme, useTheme } from "../themes";
import { useQuery } from "react-apollo";
import { CATEGORY } from "../../graph/queries";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("All");

  const [tabs, setTabs] = useState(["All", "Front-End", "Back-End", "Mobile"]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const theme = useTheme();

  const { loading, error, data } = useQuery(CATEGORY);

  const filterList = (list) => {
    return list.filter((listItem) =>
      listItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleTab = (tab) => {
    const filtered = languages.filter((category) =>
      category.tags.includes(tab.toLowerCase())
    );

    setActive(tab);
    setCategories(filtered);
  };

  const renderTab = (tab) => {
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium color={!isActive ? "#9A9A9D" : "#FA4A0C"}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleAction = (value) => {
    navigation.navigate("Questions", {
      screen: "Questions",
      params: { id: value },
    });
  };

  useEffect(() => {
    setCategories(mocks.categories);
    setLanguages(mocks.languages);
  }, []);
  if (loading) return <IQActivityIndicator />;
  return (
    <View style={{ flex: 1 }}>
      {/* {console.log({ categories: data?.categories })} */}
      <Text h2 bold style={{ marginHorizontal: 20, marginBottom: 20 }}>
        Grow Up {"\n"}your skills
      </Text>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          backgroundColor: "#efedee",
          width: width - width / 4,
          borderWidth: 0,
          borderRadius: 30,
          marginHorizontal: width / 8,
          elevation: 0,
        }}
      />
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {tabs.map((tab) => renderTab(tab))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingVertical: IQTheme.sizes.base * 2, marginTop: 10 }}
      >
        {!searchQuery ? (
          <View style={styles.categories}>
            {languages
              .filter((l) => l.tags.includes(active))
              .map((lang) => (
                <TouchableOpacity
                  style={{ marginBottom: 5 }}
                  key={lang.name}
                  onPress={
                    !lang.tags.includes("Soon")
                      ? () => handleAction(lang.id)
                      : null
                  }
                >
                  <Card center middle shadow style={styles.categ}>
                    <Badge
                      style={{
                        borderRadius: 10,
                      }}
                      shadow
                      margin={[0, 0, 20]}
                      size={IQTheme.sizes.base * 4.5}
                      color="white"
                    >
                      <Image
                        source={lang.image}
                        style={[
                          styles.img,
                          { opacity: lang.tags.includes("Soon") ? 0.2 : 1 },
                        ]}
                      />
                      {lang.tags.includes("Soon") ? (
                        <Text primary bold style={{ position: "absolute" }}>
                          soon
                        </Text>
                      ) : null}
                    </Badge>

                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                      <Text medium height={20} style={styles.title}>
                        {lang.name}
                      </Text>
                      <Text gray caption>
                        {lang.count} Q
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
          </View>
        ) : (
          <View style={styles.categories}>
            {filterList(languages).map((lang) => (
              <TouchableOpacity
                style={{ marginBottom: 5 }}
                key={lang.name}
                onPress={
                  !lang.tags.includes("Soon")
                    ? () => handleAction(lang.id)
                    : null
                }
                // onPress={() => handleService(lang.value)}
              >
                <Card center middle shadow style={styles.categ}>
                  <Badge
                    style={{
                      borderRadius: 10,
                    }}
                    shadow
                    margin={[0, 0, 20]}
                    size={IQTheme.sizes.base * 4.5}
                    color="white"
                  >
                    <Image
                      source={lang.image}
                      style={[
                        styles.img,
                        { opacity: lang.tags.includes("Soon") ? 0.2 : 1 },
                      ]}
                    />
                    {lang.tags.includes("Soon") ? (
                      <Text primary bold style={{ position: "absolute" }}>
                        soon
                      </Text>
                    ) : null}
                  </Badge>
                  <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <Text medium height={20} style={styles.title}>
                      {lang.name}
                    </Text>
                    <Text gray caption>
                      {lang.count} Q
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: IQTheme.sizes.base * 2,
    marginBottom: IQTheme.sizes.base * 3.5,
    flexDirection: "row",

    justifyContent: "space-between",
    paddingBottom: 30,
  },
  categ: {
    // this should be dynamic based on screen width
    minWidth: (width - IQTheme.sizes.padding * 2.4 - IQTheme.sizes.base) / 2,
    maxWidth: (width - IQTheme.sizes.padding * 2.4 - IQTheme.sizes.base) / 2,
    maxHeight: (width - IQTheme.sizes.padding * 2.4 - IQTheme.sizes.base) / 2,
    borderRadius: 10,
    marginVertical: 20,
  },
  img: {
    height: IQTheme.sizes.base * 4.5,
    width: IQTheme.sizes.base * 4.5,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  tab: {
    marginTop: 20,
    marginLeft: IQTheme.sizes.base * 1,
  },
  active: {
    borderBottomColor: IQTheme.colors.light.primaryForeground,
    borderBottomWidth: 3,
  },
});
