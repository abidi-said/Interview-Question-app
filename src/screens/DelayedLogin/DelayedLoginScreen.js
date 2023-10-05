import React from "react";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

export default function DelayedLoginScreen(props) {
  const { navigation } = props;
  return (
    <WelcomeScreen
      navigation={navigation}
      title={"InterviewQ"}
      caption={"welcome to interview question app"}
      delayedMode={true}
    />
  );
}
