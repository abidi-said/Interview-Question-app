import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "react-native-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TermsOfUseView from "../../components/TermsOfUseView";
import { useOnboardingConfig } from "../../hooks/useOnboardingConfig";
import { IQTheme, useTheme } from "../../themes";
import IQProfilePictureSelector from "../../truly-native/IQProfilePictureSelector/IQProfilePictureSelector";
import dynamicStyles from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { localizedErrorMessage } from "../../helpers/api/ErrorCode";
import { UPDATE_PROFILE } from "../../../graph/mutations";
import { useMutation } from "react-apollo";

const SignupScreen = (props) => {
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const { navigation } = props;
  const authManager = useAuth();

  const defaultProfilePhotoURL =
    "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

  const { config } = useOnboardingConfig();

  const [inputFields, setInputFields] = useState({});

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  const validateEmail = (text) => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(text).toLowerCase()) ? true : false;
  };

  const validatePassword = (text) => {
    let reg = /^(?=.*[A-Z])(?=.*[a-z])/;
    return reg.test(String(text)) ? true : false;
  };
  const regexForNames = /^[a-zA-Z]{2,25}$/;

  const trimFields = (fields) => {
    var trimmedFields = {};
    Object.keys(fields).forEach((key) => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim();
      }
    });
    return trimmedFields;
  };

  const onRegister = async () => {
    console.log({ inputFields });
    const { error: usernameError } =
      await authManager.validateUsernameFieldIfNeeded(inputFields, config);
    if (usernameError) {
      Alert.alert("", usernameError, [{ text: "OK" }], {
        cancelable: false,
      });
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (!validateEmail(inputFields?.email?.trim())) {
      Alert.alert("", "Please enter a valid email address.", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }

    if (inputFields?.password?.trim() == "") {
      Alert.alert("", "Password cannot be empty.", [{ text: "OK" }], {
        cancelable: false,
      });
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (inputFields?.password?.trim()?.length < 6) {
      Alert.alert(
        "",
        "Password is too short. Please use at least 6 characters for security reasons.",

        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      setInputFields((prevFields) => ({
        ...prevFields,
        password: "",
      }));
      return;
    }

    if (!validatePassword(inputFields?.password)) {
      Alert.alert(
        "",
        "The password must contain at least one uppercase and lowercase letter",

        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      setPassword("");
      return;
    }
    setLoading(true);
    const userDetails = {
      ...trimFields(inputFields),
    };
    if (userDetails.username) {
      userDetails.username = userDetails.username?.toLowerCase();
    }
    console.log("start creating account with email ..");
    authManager
      .createAccountWithEmailAndPassword(userDetails, config)
      .then(async (response) => {
        const token = response.token;
        console.log("done creating account ..");
        console.log("start updating profile picture ..");

        updateProfile({
          variables: {
            image: profilePictureFile
              ? profilePictureFile
              : defaultProfilePhotoURL,
          },
        })
          .then((newUser) => {
            console.log("success :", { token, newUser });

            if (newUser && token) {
              onLoginSuccess(token, () => {
                console.log("on sign up success");
                Keyboard.dismiss();
                setLoading(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "MainStack", params: { user: newUser } }],
                });
              });
            } else {
              setLoading(false);
              Alert.alert(
                "",
                localizedErrorMessage(response.error),
                [{ text: "OK" }],
                {
                  cancelable: false,
                }
              );
            }
          })
          .catch((error) => {
            console.log({ rrrr: error });
            setLoading(false);
            Alert.alert(
              "",
              localizedErrorMessage(response.error),
              [{ text: "OK" }],
              {
                cancelable: false,
              }
            );
          });
      });
  };

  const onChangeInputFields = (text, key) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [key]: text,
    }));
  };

  const renderInputField = (field, index) => {
    return (
      <TextInput
        key={index}
        style={styles.InputContainer}
        placeholder={field.placeholder}
        placeholderTextColor="#aaaaaa"
        secureTextEntry={field.secureTextEntry}
        onChangeText={(text) => onChangeInputFields(text, field.key)}
        value={inputFields[field.key]}
        keyboardType={field.type}
        underlineColorAndroid="transparent"
        autoCapitalize={field.autoCapitalize}
      />
    );
  };

  const renderSignupWithEmail = () => {
    return (
      <>
        {config.signupFields.map(renderInputField)}
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => onRegister()}
        >
          Sign Up
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backArrowStyle}
            source={require("../../assets/icons/backArrow.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Create new account</Text>
        <IQProfilePictureSelector
          setProfilePictureFile={setProfilePictureFile}
        />
        {renderSignupWithEmail()}
        {true && (
          <>
            <Text style={styles.orTextStyle}>OR</Text>
            <Button
              containerStyle={styles.PhoneNumberContainer}
              onPress={() => navigation.navigate("Sms", { isSigningUp: true })}
            >
              Sign up with phone number
            </Button>
          </>
        )}
        <TermsOfUseView
          tosLink={"test.com"}
          privacyPolicyLink={"test.com"}
          style={styles.tos}
        />
      </KeyboardAwareScrollView>
      {loading && <IQActivityIndicator />}
    </View>
  );
};

export default SignupScreen;
