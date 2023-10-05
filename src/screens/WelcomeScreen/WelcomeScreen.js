import React, { useState, useEffect, useContext } from "react";
import Button from "react-native-button";
import { Image, Text, View, Switch } from "react-native";
import IQActivityIndicator from "../../truly-native/IQActivityIndicator";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";
import { IQDismissButton } from "../../truly-native";
import { useOnboardingConfig } from "../../hooks/useOnboardingConfig";

const WelcomeScreen = (props) => {
  const { config } = useOnboardingConfig();

  const [isLoading, setIsLoading] = useState(true);

  const { title, caption, delayedMode = false, navigation } = props;

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  if (isLoading == false) {
    return <IQActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {delayedMode && (
        <IQDismissButton
          style={styles.dismissButton}
          onPress={() => navigation.goBack()}
        />
      )}

      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={
            delayedMode
              ? require("../../assets/icons/login-icon.png")
              : require("../../assets/icons/login-icon.png")
          }
        />
      </View>
      <Text style={styles.caption}>dark mode</Text>
      <Switch
        value={theme.mode === "dark"}
        onValueChange={(value) => theme.setMode(value ? "dark" : "light")}
      />
      <Text style={styles.title}>
        {title ? title : config.onboardingConfig.welcomeTitle}
      </Text>
      <Text style={styles.caption}>
        {caption ? caption : config.onboardingConfig.welcomeCaption}
      </Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => {
          true
            ? navigation.navigate("LoginStack", {
                screen: "Sms",
                params: {
                  isSigningUp: false,
                },
              })
            : navigation.navigate("LoginStack", {
                screen: "Login",
              });
        }}
      >
        Log In
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => {
          true
            ? navigation.navigate("LoginStack", {
                screen: "Sms",
                params: {
                  isSigningUp: true,
                },
              })
            : navigation.navigate("LoginStack", {
                screen: "Signup",
              });
        }}
      >
        Sign Up
      </Button>
    </View>
  );
};

export default WelcomeScreen;
