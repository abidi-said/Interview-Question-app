import React from "react";
import firebase from "react-native-firebase";
import { Alert } from "react-native";

import { notifications } from "../../helpers/firebase";
import config from "../../config";
import AppContext from "../../../context";

class Messanging extends React.PureComponent {
  static contextType = AppContext;

  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    console.log({ enabled });
    if (!enabled) {
      await this.requestPermission();
    }
    const initialNotif = await firebase
      .notifications()
      .getInitialNotification();
    if (initialNotif) {
      this.handleBackgroundNotifs(initialNotif);
    }
    this.notificationListener = firebase
      .notifications()
      .onNotification(this.displayLocalNotification);
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(this.handleBackgroundNotifs);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
    } catch (e) {}
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  displayLocalNotification = (notification) => {
    console.log({ notification });
    if (notification && notification.body && notification.notificationId) {
      // notification.data &&
      // notification.data.orderId &&
      //  notification.notificationId)
      const channel = new firebase.notifications.Android.Channel(
        config.FCM_CHANNEL_ID,
        config.FCM_CHANNEL_NAME,
        firebase.notifications.Android.Importance.Max
      );
      notifications().android.createChannel(channel);

      const newNotif = new firebase.notifications.Notification({
        sound: "default",
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)

        .setData({ ...notification.data })
        .android.setChannelId(config.FCM_CHANNEL_ID)
        .android.setAutoCancel(true);
      //.android.setSmallIcon("R.drawable.ic_notification");
      notifications()
        .displayNotification(newNotif)
        .then(() => {
          console.log({ newNotif });
          this.handleBackgroundNotifs({ notification: newNotif });
        })
        .catch((err) => {
          console.log({ err });
          notifications().cancelAllNotifications();
        });
    } else {
      notifications().cancelAllNotifications();
    }
  };

  handleBackgroundNotifs = ({ notification }) => {
    if (notification && notification.data && notification.orderId) {
      this.context.openRating(notification.data.orderId);
    }

    if (notification && notification.notificationId) {
      notifications().cancelNotification(notification.notificationId);
      notifications().removeDeliveredNotification(notification.notificationId);
    } else {
      notifications().cancelAllNotifications();
    }
    console.log("2");
    const { title, body } = notification;
    if (title && body) Alert.alert(title, body);
    console.log("3");
  };

  render() {
    console.log("message has been sent");
    return null;
  }
}

export default Messanging;
