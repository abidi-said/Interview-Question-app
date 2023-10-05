import React from "react";
import { View, Text } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/Ionicons";

import Questions from "../screens/Questions";

import { theme } from "../constants";
import MyDrawer from "./MainTabScreen";

const MainStack = createNativeStackNavigator();
const isLoggedIn = true;

const MainStackNavigator = ({ navigation }) => (
  <MainStack.Navigator
    // name="Hoomie"
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.cardColor,
      },

      title: null,
      headerShown: false,
    }}
  >
    <MainStack.Screen name="MainTab" component={MyDrawer} />
    {/* <MainStack.Screen name="DelayedLogin" component={DelayedLogin} /> */}
    <MainStack.Screen name="Questions" component={QuestionsScreen} />
  </MainStack.Navigator>
);

const QuestionsStack = createNativeStackNavigator();

const QuestionsScreen = ({ navigation }) => (
  <QuestionsStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.cardColor,
      },
    }}
  >
    <QuestionsStack.Screen
      name="Questions"
      component={Questions}
      options={{
        headerShown: true,
        title: "Interview questions",
        headerTitleStyle: {
          fontSize: 16,
        },
        headerLeft: () => {
          return (
            <Icon
              name="chevron-back"
              size={30}
              color={theme.colors.primary}
              onPress={() => navigation.goBack()}
            />
          );
        },
        headerStyle: {
          backgroundColor: theme.colors.cardColor,
          elevation: 0,
          height: 70,
        },
      }}
    />
  </QuestionsStack.Navigator>
);

export default MainStackNavigator;
