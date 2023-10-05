import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function IQGoogleSignInButton({ containerStyle, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image
        source={require("../../assets/icons/googlebutton.png")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}
