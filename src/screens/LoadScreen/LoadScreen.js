import React, { useCallback } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import authDeviceStorage from "../../config/utils/AuthDeviceStorage";
import { useOnboardingConfig } from "../../hooks/useOnboardingConfig";
import tokenManager from "../../helpers/Token";

const LoadScreen = (props) => {
  const { navigation } = props;
  const { token } = tokenManager;
  const { config } = useOnboardingConfig();

  useFocusEffect(
    useCallback(() => {
      setAppState();
    }, [])
  );

  const setAppState = async () => {
    const shouldShowOnboardingFlow =
      await authDeviceStorage.getShouldShowOnboardingFlow();
    if (token) {
      if (config?.isDelayedLoginEnabled) {
        return navigation.navigate("DelayedHome");
      }
      return navigation.navigate("MainStack");
    }
    if (!shouldShowOnboardingFlow) {
      if (config?.isDelayedLoginEnabled) {
        return navigation.navigate("DelayedHome");
      }
      navigation.navigate("LoginStack");
    } else {
      navigation.navigate("Walkthrough");
    }
  };

  return <View />;
};

LoadScreen.navigationOptions = {
  header: null,
};

export default LoadScreen;
