import { Settings, LoginManager, Profile } from "react-native-fbsdk-next";
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as authAPI from "./authClient";
import { ErrorCode } from "../ErrorCode";

const validateUsernameFieldIfNeeded = (inputFields, appConfig) => {
  console.log("validation username");
  return new Promise((resolve, reject) => {
    const usernamePattern = /^[aA-zZ]\w{3,29}$/;

    if (!appConfig.isUsernameFieldEnabled) {
      resolve({ success: true });
    }
    if (
      appConfig.isUsernameFieldEnabled &&
      !inputFields?.hasOwnProperty("username")
    ) {
      return reject({ error: "Invalid username" });
    }

    if (!usernamePattern.test(inputFields.username)) {
      return reject({ error: "Invalid username" });
    }

    resolve({ success: true });
  });
};

/////////////////// helpers fonctions /////////////

const checkEmail = (params) => {
  authAPI.checkEmail(params);
};

const verifyCode = (params) => {
  authAPI.verifyCode(params);
};

const sendVerificationCode = (params) => {
  return authAPI.sendVerificationCode(params);
};

/////////////////// Sign In Manager ///////////////////

const loginWithSMSCode = (smsCode, verificationID) => {
  return new Promise(function (resolve, _reject) {
    authAPI.loginWithSMSCode(smsCode, verificationID).then((response) => {
      if (response.error) {
        resolve({ error: response.error });
      } else {
        // successful phone number login, we fetch the push token
        resolve(response);
        // handleSuccessfulLogin(response.user, false).then((response) => {
        // });
      }
    });
  });
};

const loginWithEmailAndPassword = (params) => {
  return new Promise(function (resolve, reject) {
    authAPI.loginWithEmailAndPassword(params).then((response) => {
      console.log("token: ", response.token);
      if (response.success) {
        resolve(response);
      } else {
        reject({ error: response.error });
      }
    });
  });
};

const loginOrSignUpWithApple = (appConfig) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;

      authAPI
        .loginWithApple(identityToken, nonce, appConfig.appIdentifier)
        .then(async (response) => {
          if (response?.user) {
            const newResponse = {
              user: { ...response.user },
              accountCreated: response.accountCreated,
            };
            handleSuccessfulLogin(
              newResponse.user,
              response.accountCreated
            ).then((response) => {
              // resolve(response);
              resolve({
                ...response,
              });
            });
          } else {
            resolve({ error: ErrorCode.appleAuthFailed });
          }
        });
    } catch (error) {
      console.log(error);
      resolve({ error: ErrorCode.appleAuthFailed });
    }
  });
};

const loginOrSignUpWithGoogle = (appConfig) => {
  GoogleSignin.configure({
    webClientId: appConfig.webClientId,
  });
  return new Promise(async (resolve, _reject) => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      authAPI
        .loginWithGoogle(idToken, appConfig.appIdentifier)
        .then(async (response) => {
          if (response?.user) {
            const newResponse = {
              user: { ...response.user },
              accountCreated: response.accountCreated,
            };
            handleSuccessfulLogin(
              newResponse.user,
              response.accountCreated
            ).then((response) => {
              // resolve(response);
              resolve({
                ...response,
              });
            });
          } else {
            resolve({ error: ErrorCode.googleSigninFailed });
          }
        });
    } catch (error) {
      console.log(error);
      resolve({
        error: ErrorCode.googleSigninFailed,
      });
    }
  });
};

const loginOrSignUpWithFacebook = () => {
  Settings.setAppID("1110725172825202");
  Settings.initializeSDK();

  return new Promise(async (resolve, reject) => {
    try {
      LoginManager.logInWithPermissions(["public_profile"])
        .then(async (result) => {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
            const currentProfile = await Profile.getCurrentProfile();
            resolve(currentProfile);
          }
        })
        .catch((error) => {
          console.log("Login fail with error: " + error);
          reject({ error: ErrorCode.fbAuthCancelled });
        });
    } catch (error) {
      reject({ error: ErrorCode.fbAuthFailed });
    }
  });
};

/////////////////// Sign Up Manager ///////////////////

const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  console.log("creating account with email ...");
  const accountCreationTask = (userData) => {
    return new Promise((resolve, reject) => {
      authAPI.registerWithEmail(userData).then(async (response) => {
        if (response.error) {
          reject({ error: response.error });
        } else {
          // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
          let user = response.user;
          let token = response.token;
          resolve({
            // nonCriticalError: response.error,
            user,
            token,
          });
        }
      });
    });
  };

  return new Promise(function (resolve, reject) {
    const userData = {
      ...userDetails,
    };
    accountCreationTask(userData).then((response) => {
      if (response.error) {
        reject({ error: response.error });
      } else {
        // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
        resolve({
          ...response,
        });
      }
    });
  });
};

const logout = (user = null) => {
  authAPI.signOut();
};

const authManager = {
  sendVerificationCode,
  verifyCode,
  checkEmail,
  loginWithSMSCode,
  loginWithEmailAndPassword,
  createAccountWithEmailAndPassword,

  loginOrSignUpWithApple,
  loginOrSignUpWithFacebook,
  loginOrSignUpWithGoogle,

  validateUsernameFieldIfNeeded,

  logout,
};

export default authManager;
