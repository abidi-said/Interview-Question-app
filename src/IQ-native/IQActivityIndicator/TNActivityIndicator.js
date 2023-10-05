import React, { memo } from "react";
import { View, Text } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";

const IQActivityIndicator = memo((props) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <UIActivityIndicator
          color={IQTheme.colors[colorScheme].grey3}
          size={30}
          animationDuration={400}
        />
        {props.text && props.text.length > 1 ? (
          <Text>{props.text}</Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
});

export default IQActivityIndicator;
