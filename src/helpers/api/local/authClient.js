import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from "react-native-restart";
import config from "../../../config";
import tokenManager from "../../../helpers/Token";
import { updateUser } from "../../users";
import { ErrorCode } from "../ErrorCode";
import { getUnixTimeStamp } from "../../timeFormat";
import { useMutation } from "react-apollo";
import UPDATE_PROFILE from "../../../../graph/mutations";
import { reject } from "lodash";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getRequest = (body = null, method = "POST") => {
  const request = {
    headers,
    method,
  };
  if (body && method === "POST") request.body = JSON.stringify(body);
  return request;
};

// check email

export const checkEmail = (params) => {
  return new Promise((resolve, reject) => {
    const request = getRequest(params);
    console.log({ emailRequest: request });
    fetch(`${config.API_URL}/auth/checkEmail`, request, {
      mode: "no-cors",
    })
      .then((res) => {
        console.log(res.json());
        if (res.taken) resolve(res.taken);
        resolve(false);
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });
};

// check unique username

export const checkUniqueUsername = (params) => {
  return new Promise((resolve, reject) => {
    if (!params) {
      resolve();
    }
    const request = getRequest(params);
    console.log({ usernameRequest: request });
    fetch(`${config.API_URL}/auth/checkUsername`, request, {
      mode: "no-cors",
    })
      .then((res) => {
        console.log(res.json(), null, 3);
        if (res.taken) resolve(res.taken);
        resolve(false);
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });
};

export const fetchAndStorePushTokenIfPossible = async (user) => {
  try {
    const settings = await messaging().requestPermission();
    if (settings) {
      const token = await messaging().getToken();
      updateUser(user.id || user.userID, {
        pushToken: token,
        pushKitToken: "",
        badgeCount: 0,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationCode = (params) => {
  return new Promise((resolve, reject) => {
    const request = getRequest(params);
    fetch(`${config.API_URL}/auth/sendVerificationCode`, request, {
      mode: "no-cors",
    })
      .then((res) => resolve({ res: res.json() }))
      .catch((_error) => {
        console.log(_error);
        console.warn(_error);
        reject({ error: ErrorCode.smsNotSent });
      });
  });
};

export const verifyCode = ({ mobile, code, countryCode }) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${config.API_URL}/auth/verifyCode/${mobile}/${code}/${countryCode}`,
      { mode: "no-cors" }
    )
      .then((res) => resolve(res.json()))
      .catch((_error) => {
        console.log({ _error });
        reject({ error: ErrorCode.invalidSMSCode });
      });
  });
};

export const sendResetCode = (params) => {
  const request = getRequest(params);
  return new Promise(function (resolve, reject) {
    fetch(`${config.API_URL}/auth/reset/sendCode`, request, {
      mode: "no-cors",
    }).then((res) => resolve(res.json()));
  });
};

export const checkResetCode = (params) => {
  const request = getRequest(params);
  return new Promise(function (resolve, reject) {
    fetch(`${config.API_URL}/auth/reset/checkCode`, request, {
      mode: "no-cors",
    }).then((res) => resolve(res.json()));
  });
};

export const resetPassword = (params) => {
  const request = getRequest(params);
  return new Promise(function (resolve, reject) {
    fetch(`${config.API_URL}/auth/reset/resetPassword`, request, {
      mode: "no-cors",
    }).then((res) => resolve(res.json()));
  });
};

///////////// Sign Up Functions ////////////////////////////////////////

export const registerWithEmail = (userData) => {
  return new Promise(async (resolve, reject) => {
    const request = getRequest(userData);
    let usernameResponse = null;
    let emailResponse = null;
    if (userData.username)
      usernameResponse = await checkUniqueUsername(userData.username);
    console.log("done verifing username ..", usernameResponse);
    if (userData.email) emailResponse = await checkEmail(userData.email);
    console.log("done verifing email ..", emailResponse);

    if ((userData.username && usernameResponse) || emailResponse) {
      let keys = ["token", "SHOULD_SHOW_ONBOARDING_FLOW"];
      AsyncStorage.multiRemove(keys, () => {
        tokenManager.token = null;
        RNRestart.Restart();
      });
      if (userData.username && usernameResponse)
        reject({ error: ErrorCode.usernameInUse });
      else reject({ error: ErrorCode.emailInUse });
    }
    console.log({ request });
    fetch(`${config.API_URL}/auth/registerWithEmail`, request, {
      mode: "no-cors",
    })
      .then((res) => resolve(res.json()))
      .catch((error) => {
        console.log({ error });
        var errorCode = ErrorCode.serverError;
        if (error.code === "auth/email-already-in-use") {
          errorCode = ErrorCode.emailInUse;
        }
        reject({ error: errorCode });
      });
  });
};

export const loginWithEmailAndPassword = async (params) => {
  return new Promise((resolve, reject) => {
    const request = getRequest(params);
    fetch(`${config.API_URL}/auth/signinWithEmail`, request, {
      mode: "no-cors",
    })
      .then((res) => {
        resolve(res.json());
      })
      .catch((error) => {
        console.log("error:", error);
        var errorCode = ErrorCode.serverError;
        switch (error.status) {
          case "auth/wrong-password":
            errorCode = ErrorCode.invalidPassword;
            break;
          case "auth/network-request-failed":
            errorCode = ErrorCode.serverError;
            break;
          case "auth/user-not-found":
            errorCode = ErrorCode.noUser;
            break;
          default:
            errorCode = ErrorCode.serverError;
        }
        resolve({ error: errorCode });
      });
  });
};

export const loginWithSMSCode = (params) => {
  const credential = auth.PhoneAuthProvider.credential(verificationID, smsCode);
  return new Promise(function (resolve, _reject) {
    const request = getRequest(params);
    fetch(`${config.API_URL}/auth/signInWithCode`, request, {
      mode: "no-cors",
    })
      .then((res) => {
        console.log(res, null, 3);
        resolve({ user: res.json() });
      })
      .catch((_error) => {
        resolve({ error: ErrorCode.invalidSMSCode });
      });
  });
};

export const loginWithApple = (identityToken, nonce, appIdentifier) => {
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );

  return new Promise((resolve, _reject) => {
    signInWithCredential(appleCredential, appIdentifier).then((response) => {
      resolve(response);
    });
  });
};

export const loginWithGoogle = (idToken, appIdentifier) => {
  const credential = auth.GoogleAuthProvider.credential(idToken);

  return new Promise((resolve, _reject) => {
    signInWithCredential(credential, appIdentifier).then((response) => {
      resolve(response);
    });
  });
};

export const signInAnonymous = () => {
  const request = getRequest();
  return new Promise((resolve, _reject) => {
    fetch(`${config.API_URL}/auth/anonymous`, request, {
      mode: "no-cors",
    }).then((res) => resolve(res.json()));
  });
};

/////////////////// Sign Out ///////////////

export const signOut = () => {
  let keys = ["token"];
  AsyncStorage.multiRemove(keys, () => {
    tokenManager.token = null;
    RNRestart.Restart();
  });
};
