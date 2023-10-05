import RNfirebase from "react-native-firebase";

const firebase = RNfirebase.app();

firebase.analytics().setAnalyticsCollectionEnabled(true);

const crashlytics = firebase.crashlytics();
const analytics = firebase.analytics();
const notifications = firebase.notifications;

export { crashlytics, analytics, notifications };

export default firebase;
