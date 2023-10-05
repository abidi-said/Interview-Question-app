import React, { useEffect } from "react";

import ThemeManager from "./src/themes/ThemeManager";
import { AuthProvider } from "./src/hooks/useAuth";
import { authManager } from "./src/helpers/api";
import { ApolloProvider } from "react-apollo";

import SplashScreen from "react-native-splash-screen";
import { ConfigProvider } from "./src/helpers/config";
import AppContainer from "./AppContainer";
import { createApolloClient } from "./src/components/common/config/apollo-client";
import { LogBox } from "react-native";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);

  return (
    <ApolloProvider client={createApolloClient()}>
      <ThemeManager>
        <ConfigProvider>
          <AuthProvider authManager={authManager}>
            <AppContainer />
          </AuthProvider>
        </ConfigProvider>
      </ThemeManager>
    </ApolloProvider>
  );
};

export default App;
