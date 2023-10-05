import React from "react";
import { TouchableOpacity, Image } from "react-native";
const dismissImage = require("../../assets/icons/dismiss-rounded.png");

export default function IQDismissButton(props) {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Image
        style={{
          resizeMode: "cover",
          width: 40,
          height: 40,
          tintColor: props.tintColor,
        }}
        source={dismissImage}
      />
    </TouchableOpacity>
  );
}
