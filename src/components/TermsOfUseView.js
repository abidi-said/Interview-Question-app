import React from "react";
import { Text, Linking, View } from "react-native";
import { IQTheme, useTheme } from "../themes";

const TermsOfUseView = (props) => {
  const { tosLink, privacyPolicyLink, style } = props;

  const theme = useTheme();
  const colorScheme = theme.mode;

  return (
    <View style={style}>
      <Text
        style={{ fontSize: 12, color: IQTheme.colors[colorScheme].primaryText }}
      >
        By creating an account you agree with our
      </Text>
      <Text>
        <Text
          style={{ color: "blue", fontSize: 12 }}
          onPress={() => Linking.openURL(tosLink)}
        >
          Terms of Use
        </Text>
        {privacyPolicyLink?.length > 0 && (
          <Text style={{ fontSize: 12 }}>
            and
            <Text
              style={{ color: "blue", fontSize: 12 }}
              onPress={() => Linking.openURL(privacyPolicyLink)}
            >
              Privacy Policy
            </Text>
          </Text>
        )}
      </Text>
    </View>
  );
};

export default TermsOfUseView;
