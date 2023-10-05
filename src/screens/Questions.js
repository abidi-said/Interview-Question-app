import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import Accordian from "../components/Accordian";
import Text from "../components/Text";
import { theme, langs } from "../constants";

const Questions = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState([]);
  const [langId, setLangId] = useState(route.params.id);

  const handleLang = (langId) => {
    switch (langId) {
      case "ReactJS":
        setLang(langs.ReactJS);
        navigation.setOptions({
          title: "ReactJS Interview questions",
        });

        break;
      case "ReactNative":
        setLang(langs.RN);
        navigation.setOptions({
          title: "React Native Interview questions",
        });

        break;
      case "EcmaScript":
        setLang(langs.ES);
        navigation.setOptions({
          title: "EcmaScript Interview questions",
        });

        break;

      default:
        null;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `Your Updated Title`,
    });
    handleLang(langId);
    setLoading(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {loading ? (
          !lang.length ? (
            <Text caption gray center>
              no data
            </Text>
          ) : (
            lang.map((l) => (
              <Accordian key={l.id} title={l.title} data={l.data} />
            ))
          )
        ) : (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        )}
      </ScrollView>
    </View>
  );
};
export default Questions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: theme.sizes.base * 2,
    backgroundColor: theme.colors.cardColor,
  },
});
