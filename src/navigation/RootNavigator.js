import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { theme } from "../constants";
import DelayedLoginScreen from "../screens/DelayedLogin/DelayedLoginScreen";
import WalkthroughScreen from "../screens/WalkthroughScreen/WalkthroughScreen";
import MainStackNavigator from "./MainStackNavigator";
import LoginStack from "./AuthStackNavigator";
import LoadScreen from "../screens/LoadScreen/LoadScreen";
// import MyDrawer from "./DrawerNavigator";

const Root = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="LoadScreen"
    >
      <Root.Screen name="LoadScreen" component={LoadScreen} />
      <Root.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      {/* <Root.Screen name="LoadScreen" component={LoadScreen} /> */}
      <Root.Screen name="DelayedLogin" component={DelayedLogin} />
      <Root.Screen name="MainStack" component={MainStackNavigator} />
    </Root.Navigator>
  );
};

export default RootNavigator;
const DelayedLoginStack = createNativeStackNavigator();

const DelayedLogin = ({ navigation }) => (
  <DelayedLoginStack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.cardColor,
      },

      title: null,
      headerShown: false,
    }}
  >
    <DelayedLoginStack.Screen
      name="DelayedLogin"
      component={DelayedLoginScreen}
    />
  </DelayedLoginStack.Navigator>
);
