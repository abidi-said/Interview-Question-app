import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Image,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "react-native-button";
import PhoneInput from "react-native-phone-input";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import IQActivityIndicator from "../../truly-native/IQActivityIndicator";
import IQProfilePictureSelector from "../../truly-native/IQProfilePictureSelector/IQProfilePictureSelector";
import CountriesModalPicker from "../../truly-native/CountriesModalPicker/CountriesModalPicker";
import TermsOfUseView from "../../components/TermsOfUseView";
import IQGoogleSignInButton from "../../components/IQGoogleSignInButton/IQGoogleSignInButton";
import { IQTheme, useTheme } from "../../themes";
import dynamicStyles from "./styles";
import { AccessToken } from "react-native-fbsdk-next";
import authManager from "../../helpers/api/local/localAuthManager";
import { onLoginSuccess } from "../../helpers/functions";
import { localizedErrorMessage } from "../../helpers/api/ErrorCode";
import { useOnboardingConfig } from "../../hooks/useOnboardingConfig";

const codeInputCellCount = 6;

const SmsAuthenticationScreen = (props) => {
  const { navigation, route } = props;
  const { config } = useOnboardingConfig();
  const regexForNames = /^[a-zA-Z]{2,25}$/;

  const [inputFields, setInputFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState(true);
  const [countriesPickerData, setCountriesPickerData] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [codeInputValue, setCodeInputValue] = useState("");

  const theme = useTheme();
  const colorScheme = theme.mode;
  const styles = dynamicStyles(IQTheme, colorScheme);

  const myCodeInput = useBlurOnFulfill({
    codeInputValue,
    value: codeInputValue,
    cellCount: codeInputCellCount,
  });
  const [codeInputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    codeInputValue,
    value: codeInputValue,

    setCodeInputValue,
    setValue: setCodeInputValue,
  });

  const phoneRef = useRef(null);

  const { isSigningUp } = route.params;

  useEffect(() => {
    if (codeInputValue?.trim()?.length === codeInputCellCount) {
      onFinishCheckingCode(codeInputValue);
    }
  }, [codeInputValue]);

  useEffect(() => {
    if (phoneRef && phoneRef.current) {
      setCountriesPickerData(phoneRef.current.getPickerData());
    }
  }, [phoneRef]);

  const onFBButtonPress = () => {
    setLoading(true);
    authManager.loginOrSignUpWithFacebook().then((response) => {
      if (response?.currentProfile) {
        const user = response.currentProfile;
        // dispatch(setUserData({ user }))
        AccessToken.getCurrentAccessToken().then((data) => {
          console.log(data.accessToken.toString());

          onLoginSuccess(data.accessToken.toString(), () => {
            console.log("on login success");
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
    });
  };

  const trimFields = (fields) => {
    var trimmedFields = {};
    Object.keys(fields).forEach((key) => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim();
      }
    });
    return trimmedFields;
  };

  const onPressFlag = () => {
    setCountryModalVisible(true);
  };

  const onPressCancelContryModalPicker = () => {
    setCountryModalVisible(false);
  };

  const onChangeInputFields = (text, key) => {
    setInputFields((prevFields) => ({
      ...prevFields,
      [key]: text,
    }));
  };

  const selectCountry = (country) => {
    phoneRef.current.selectCountry(country.iso2);
  };

  const renderPhoneInput = () => {
    return (
      <>
        <PhoneInput
          style={styles.InputContainer}
          flagStyle={styles.flagStyle}
          textStyle={styles.phoneInputTextStyle}
          ref={phoneRef}
          initialCountry={"tn"}
          onPressFlag={onPressFlag}
          offset={10}
          allowZeroAfterCountryCode
          textProps={{
            placeholder: "Phone number",
            placeholderTextColor: "#aaaaaa",
          }}
        />
        {countriesPickerData && (
          <CountriesModalPicker
            data={countriesPickerData}
            onChange={(country) => {
              selectCountry(country);
            }}
            cancelText={"Cancel"}
            visible={countryModalVisible}
            onCancel={onPressCancelContryModalPicker}
          />
        )}
        <Button
          containerStyle={styles.sendContainer}
          style={styles.sendText}
          onPress={() => onPressSend()}
        >
          Send code
        </Button>
      </>
    );
  };

  const renderCodeInputCell = ({ index, symbol, isFocused }) => {
    let textChild = symbol;

    if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.codeInputCell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  const renderCodeInput = () => {
    return (
      <View style={styles.codeFieldContainer}>
        <CodeField
          ref={myCodeInput}
          {...codeInputProps}
          value={codeInputValue}
          onChangeText={setCodeInputValue}
          cellCount={codeInputCellCount}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCodeInputCell}
        />
      </View>
    );
  };

  const renderInputField = (field, index) => {
    return (
      <TextInput
        key={index?.toString()}
        style={styles.InputContainer}
        placeholder={field.placeholder}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => onChangeInputFields(text, field.key)}
        value={inputFields[field.key]}
        underlineColorAndroid="transparent"
      />
    );
  };

  const renderAsSignUpState = () => {
    return (
      <>
        <Text style={styles.title}>Create new account</Text>
        <IQProfilePictureSelector
          setProfilePictureFile={setProfilePictureFile}
        />
        {config.smsSignupFields.map(renderInputField)}
        {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}
        <Text style={styles.orTextStyle}> OR</Text>
        <Button
          containerStyle={styles.signWithEmailContainer}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign up with E-mail
        </Button>
      </>
    );
  };

  const renderAsLoginState = () => {
    const appleButtonStyle = {
      dark: AppleButton?.Style?.WHITE,
      light: AppleButton?.Style?.BLACK,
      "no-preference": AppleButton?.Style?.WHITE,
    };

    return (
      <>
        <Text style={styles.title}>Sign In</Text>
        {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}
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
          containerStyle={styles.signWithEmailContainer}
          onPress={() => navigation.navigate("Login")}
        >
          Sign in with E-mail
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
        {isSigningUp && renderAsSignUpState()}
        {!isSigningUp && renderAsLoginState()}
        {isSigningUp && (
          <TermsOfUseView
            tosLink={"test.com"}
            privacyPolicyLink={"test.com"}
            style={styles.tos}
          />
        )}
      </KeyboardAwareScrollView>
      {loading && <IQActivityIndicator />}
    </View>
  );
};

export default SmsAuthenticationScreen;
