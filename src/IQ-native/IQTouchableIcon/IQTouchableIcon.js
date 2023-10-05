import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";
function IQTouchableIcon(props) {
  const {
    onPress,
    containerStyle,
    iconSource,
    imageStyle,
    title,
    titleStyle,
    renderTitle,
    onLongPress,
    onPressOut,
    onPressIn,
    iconRef,
    onLayout,
  } = props;

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  return (
    <TouchableOpacity
      ref={iconRef}
      onLayout={onLayout}
      style={[styles.headerButtonContainer, containerStyle]}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      onPress={onPress}
    >
      <Image style={[styles.Image, imageStyle]} source={iconSource} />
      {renderTitle && <Text style={[styles.title, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

export default IQTouchableIcon;
