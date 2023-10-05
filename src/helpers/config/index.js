import React, { useContext } from "react";
import { Platform } from "react-native";

const regexForNames = /^[a-zA-Z]{2,25}$/;

export const ConfigContext = React.createContext({});

export const ConfigProvider = ({ children }) => {
  const config = {
    isSMSAuthEnabled: true,
    isDelayedLoginEnabled: false,
    appIdentifier: `com.interviewQ.${Platform.OS}`,
    facebookIdentifier: "285315185217069",
    webClientId:
      "1099201876026-7p9f7c1ukg55958ck45fc0bn0luilka4.apps.googleusercontent.com",
    onboardingConfig: {
      welcomeTitle: "InterviewQ",
      welcomeCaption: "Welcome to Interview Question for every developers.",

      walkthroughScreens: [
        {
          key: "0",
          image: require("../../assets/icons/firebase-icon.png"),
          title: "Firebase",
          text: "Save weeks of hard work by using our codebase.",
        },
        {
          key: "1",
          image: require("../../assets/icons/login-icon.png"),
          title: "Authentication & Registration",
          text: "Fully integrated login and sign up flows backed by Firebase.",
        },
        {
          key: "2",
          image: require("../../assets/icons/sms-icon.png"),
          title: "SMS Authentication",
          text: "End-to-end SMS OTP verification for your users.",
        },
        {
          key: "3",
          image: require("../../assets/icons/country-picker-icon.png"),
          title: "Country Picker",
          text: "Country picker for phone numbers.",
        },
      ],
    },
    tosLink: "test.com",
    isUsernameFieldEnabled: true,
    smsSignupFields: [
      {
        displayName: "First Name",
        type: "ascii-capable",
        editable: true,
        regex: regexForNames,
        key: "firstName",
        placeholder: "First Name",
      },
      {
        displayName: "Last Name",
        type: "ascii-capable",
        editable: true,
        regex: regexForNames,
        key: "lastName",
        placeholder: "Last Name",
      },
      {
        displayName: "Username",
        type: "default",
        editable: true,
        regex: regexForNames,
        key: "username",
        placeholder: "Username",
        autoCapitalize: "none",
      },
    ],
    signupFields: [
      {
        displayName: "First Name",
        type: "ascii-capable",
        editable: true,
        regex: regexForNames,
        key: "firstName",
        placeholder: "First Name",
      },
      {
        displayName: "Last Name",
        type: "ascii-capable",
        editable: true,
        regex: regexForNames,
        key: "lastName",
        placeholder: "Last Name",
      },
      {
        displayName: "Username",
        type: "default",
        editable: true,
        regex: regexForNames,
        key: "username",
        placeholder: "Username",
        autoCapitalize: "none",
      },
      {
        displayName: "E-mail Address",
        type: "email-address",
        editable: true,
        regex: regexForNames,
        key: "email",
        placeholder: "E-mail Address",
        autoCapitalize: "none",
      },
      {
        displayName: "Password",
        type: "default",
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: "password",
        placeholder: "Password",
        autoCapitalize: "none",
      },
    ],
  };

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
