import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "react-native-button";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";

const ResetPasswordScreen = (props) => {
  const [email, setEmail] = useState("");

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={styles.backArrowStyle}
            source={require("../../assets/icons/backArrow.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={"E-mail"}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.sendContainer}
          style={styles.sendText}
          onPress={() => onSendPasswordResetEmail()}
        >
          Send Link
        </Button>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ResetPasswordScreen;
