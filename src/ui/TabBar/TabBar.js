import React from "react";
import { SafeAreaView } from "react-native";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";
import Tab from "./Tab";

export function TabBarBuilder({ tabIcons, state, navigation }) {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  return (
    <SafeAreaView style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        return (
          <Tab
            key={index + ""}
            route={state.routes[index]}
            tabIcons={tabIcons}
            focus={state.index === index}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </SafeAreaView>
  );
}

export default TabBarBuilder;
