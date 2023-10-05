export const ErrorCode = {
  passwordInUse: "passwordInUse",
  badEmailFormat: "badEmailFormat",
  emailInUse: "emailInUse",
  phoneInUse: "phoneInUse",
  usernameInUse: "usernameInUse",
  invalidPassword: "invalidPassword",
  noUser: "noUser",
  rateLimited: "rateLimited",
  serverError: "serverError",
  photoUploadFailed: "photoUploadFailed",
  fbAuthCancelled: "fbAuthCancelled",
  fbAuthFailed: "fbAuthFailed",
  appleAuthFailed: "appleAuthFailed",
  smsNotSent: "smsNotSent",
  invalidSMSCode: "invalidSMSCode",
  googleSigninFailed: "googleSigninFailed",
  requiresRecentLogin: "requiresRecentLogin",
};

export const localizedErrorMessage = (errorCode) => {
  switch (errorCode) {
    case ErrorCode.passwordInUse:
      return "The password is invalid or the user does not have a password";
    case ErrorCode.badEmailFormat:
      return "The email address is badly formatted";
    case ErrorCode.emailInUse:
      return "The email address is already in use by another account.";
    case ErrorCode.phoneInUse:
      return "The phone number is already registered. Please try to log in instead of signing up.";
    case ErrorCode.usernameInUse:
      return "The username is already taken";
    case ErrorCode.invalidPassword:
      return "The given password is invalid";
    case ErrorCode.noUser:
      return "There is no user record corresponding to this identifier. The user may have been deleted.";
    case ErrorCode.rateLimited:
      return "Too many unsuccessful login attempts";
    case ErrorCode.photoUploadFailed:
      return "Profile photo failed to upload";
    case ErrorCode.smsNotSent:
      return "The SMS was not sent due to an error. Please try again.";
    case ErrorCode.invalidSMSCode:
      return "The verification code is invalid. Please try again.";
    case ErrorCode.googleSigninFailed:
      return "Google Sign In Failed";
    case ErrorCode.requiresRecentLogin:
      return "You may need to log out and login again";
    default:
      return (
        "An error came up while logging you in. Please try again. Error code was " +
        errorCode
      );
  }
};
