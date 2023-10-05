import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { IQTheme, useTheme } from "../../../themes";
import dynamicStyles from "./styles";

const IQMenuButton = (props) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.btnClickContain, props.containerStyle]}
      underlayColor={styles.btnClickContain.backgroundColor}
    >
      <View style={styles.btnContainer}>
        {props.source && <Image source={props.source} style={styles.btnIcon} />}
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default IQMenuButton;
