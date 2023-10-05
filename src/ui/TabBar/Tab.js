import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";

function Tab({ route, onPress, focus, tabIcons }) {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  return (
    <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
      <Image
        source={
          focus ? tabIcons[route.name].focus : tabIcons[route.name].unFocus
        }
        style={[
          styles.tabIcon,
          focus ? styles.focusTintColor : styles.unFocusTintColor,
        ]}
      />
    </TouchableOpacity>
  );
}

export default Tab;
