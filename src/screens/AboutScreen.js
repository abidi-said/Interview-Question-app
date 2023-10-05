import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Platform, Linking } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";

import { theme } from "../constants";
import * as Animatable from "react-native-animatable";

import Icon from "react-native-vector-icons/Ionicons";

const APP_STORE_LINK = "";
const PLAY_STORE_LINK = "";

const AboutScreen = () => {
  return (
    <View
      style={{
        paddingHorizontal: theme.sizes.base * 1,
        paddingVertical: 0,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Icon
          name={"information-circle"}
          color={theme.colors.primary}
          size={35}
          style={{ alignSelf: "center" }}
        />
        <Text h2 bold style={{ marginVertical: 15 }}>
          About Us
        </Text>
      </View>
      <Text>
        Interview questions for every developer, for help developers succeed in
        their job interviews.
        {"\n"}
      </Text>
      <Text>
        Soon, all of the programming languages and frameworks, their interview
        questions will be included in this app.
      </Text>
      <Animatable.View
        animation="fadeInUpBig"
        style={{
          // justifyContent: 'space-between',
          // flexDirection: 'row',
          marginTop: 50,
          marginHorizontal: 20,
        }}
      >
        <Button
          color={theme.colors.primary}
          onPress={() => {
            Platform.OS == "ios"
              ? Linking.openURL(APP_STORE_LINK).catch((err) =>
                  console.error("An error occurred", err)
                )
              : Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                  console.error("An error occurred", err)
                );
          }}
        >
          <Text white center bold>
            Rate Us
          </Text>
        </Button>
      </Animatable.View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
