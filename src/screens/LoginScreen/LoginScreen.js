import React, { useState, useEffect } from "react";
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
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IQGoogleSignInButton from "../../components/IQGoogleSignInButton/IQGoogleSignInButton";
import IQActivityIndicator from "../../truly-native/IQActivityIndicator";
import dynamicStyles from "./styles";
import { IQTheme, useTheme } from "../../themes";
import { onLoginSuccess } from "../../helpers/functions";
import { localizedErrorMessage } from "../../helpers/api/ErrorCode";
import { AccessToken } from "react-native-fbsdk-next";
import { useAuth } from "../../hooks/useAuth";

const LoginScreen = (props) => {
  const { navigation } = props;
  const authManager = useAuth();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  const onForgotPassword = async () => {
    navigation.push("ResetPassword", {
      isResetPassword: true,
    });
  };

  const onFBButtonPress = () => {
    setLoading(true);
    authManager
      .loginOrSignUpWithFacebook()
      .then((response) => {
        if (response?.currentProfile) {
          const user = response.currentProfile;
          // dispatch(setUserData({ user }))
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log("token: ", data.accessToken.toString());

            onLoginSuccess(data.accessToken.toString(), () => {
              Keyboard.dismiss();
              navigation.reset({
                index: 0,
                routes: [{ name: "MainStack", params: { user } }],
              });
            });
          });

          setLoading(false);
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
        setLoading(false);
        Alert.alert("", localizedErrorMessage(error), [{ text: "OK" }], {
          cancelable: false,
        });
      });
  };

  const onPressLogin = () => {
    setLoading(true);
    if (password.trim().length >= 6 && email.trim().length > 0 && !loading)
      authManager
        .loginWithEmailAndPassword({
          email,
          password,
        })
        .then((res) => {
          if (res.success) {
            onLoginSuccess(res.token, () => {
              console.log("on login success");
              Keyboard.dismiss();
              navigation.reset({
                index: 0,
                routes: [{ name: "MainStack", params: { user: res.user } }],
              });
            });
            setLoading(false);
          } else {
            setLoading(false);
            Keyboard.dismiss();
            Alert.alert(
              "",
              localizedErrorMessage(res.error),
              [{ text: "OK" }],
              {
                cancelable: false,
              }
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          Keyboard.dismiss();
          Alert.alert("", localizedErrorMessage(error), [{ text: "OK" }], {
            cancelable: false,
          });
        });
  };
  useEffect(() => {
    // setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backArrowStyle}
            source={require("../../assets/icons/backArrow.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={"E-mail"}
          keyboardType="email-address"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={"Password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordText}
            onPress={() => onForgotPassword()}
          >
            Forgot password ?
          </Button>
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}
        >
          Log In
        </Button>
        <Text style={styles.orTextStyle}> OR</Text>
        <Button
          containerStyle={styles.facebookContainer}
          style={styles.facebookText}
          onPress={() => onFBButtonPress()}
        >
          Login With Facebook
        </Button>
        <IQGoogleSignInButton
          containerStyle={styles.googleButtonStyle}
          onPress={() => onGoogleButtonPress()}
        />
        {appleAuth.isSupported && (
          <AppleButton
            cornerRadius={25}
            style={styles.appleButtonContainer}
            buttonStyle={appleButtonStyle[appearance]}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={() => onAppleButtonPress()}
          />
        )}

        <Button
          containerStyle={styles.phoneNumberContainer}
          onPress={() => navigation.navigate("Sms", { isSigningUp: false })}
        >
          Login with phone number
        </Button>

        {loading && <IQActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
