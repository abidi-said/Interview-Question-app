import React, { useState } from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";

import { NavigationContainer } from "@react-navigation/native";
import { OnboardingConfigProvider } from "./src/hooks/useOnboardingConfig";
import RootNavigator from "./src/navigation/RootNavigator";
import { useConfig } from "./src/helpers/config";
import FCMToken from "./src/components/common/FCMToken";

const AppContainer = () => {
  const config = useConfig();

  return (
    <OnboardingConfigProvider config={config}>
      <NavigationContainer>
        <RootNavigator />
        <FCMToken />
      </NavigationContainer>
    </OnboardingConfigProvider>
  );
};

export default AppContainer;
