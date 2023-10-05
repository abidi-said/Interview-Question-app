import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen/ResetPasswordScreen";
import SignupScreen from "../screens/SignupScreen/SignupScreen";
import SmsAuthenticationScreen from "../screens/SmsAuthenticationScreen/SmsAuthenticationScreen";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: "#FFFFFF" },
        cardShadowEnabled: false,
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Signup"
        component={SignupScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0, // remove shadow on Android
  },
});

export default AuthStackNavigator;
