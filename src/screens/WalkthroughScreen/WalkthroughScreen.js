import React, { useLayoutEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import authDeviceStorage from "../../config/utils/AuthDeviceStorage";
import { useOnboardingConfig } from "../../hooks/useOnboardingConfig";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";

const WalkthroughScreen = ({ navigation }) => {
  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);
  const { config } = useOnboardingConfig();

  const onDone = () => {
    authDeviceStorage.setShouldShowOnboardingFlow("false");
    if (config?.isDelayedLoginEnabled) {
      navigation.navigate("DelayedHome");
      return;
    }
    navigation.navigate("LoginStack", { screen: "Welcome" });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  _renderItem = ({ item, dimensions }) => {
    return (
      <View style={[styles.container, dimensions]}>
        <Image
          style={styles.image}
          source={item.image}
          size={100}
          color="white"
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  _renderNextButton = () => {
    return <Text>Next</Text>;
  };

  _renderSkipButton = () => {
    return <Text>Skip</Text>;
  };

  _renderDoneButton = () => {
    return <Text>Done</Text>;
  };

  return (
    <AppIntroSlider
      data={config.onboardingConfig.walkthroughScreens}
      slides={config.onboardingConfig.walkthroughScreens}
      onDone={onDone}
      renderItem={_renderItem}
      //Handler for the done On last slide
      showSkipButton={true}
      onSkip={onDone}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      renderDoneButton={_renderDoneButton}
    />
  );
};

export default WalkthroughScreen;
