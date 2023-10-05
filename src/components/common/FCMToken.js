import React, { useMemo, useEffect } from "react";
import gql from "graphql-tag";
import { graphql, useMutation } from "react-apollo";

import firebase from "../../helpers/firebase";

import Messanging from "./Messanging";
import { UPDATE_FCM_TOKEN } from "../../../graph/mutations";

const FCMToken = (props) => {
  const [updateFCMToken, { data, loading, error }] = useMutation(
    UPDATE_FCM_TOKEN
  );

  useEffect(() => {
    firebase
      .messaging()
      .getToken()
      .then((token) => {
        setFCMToken(token);
      });
    onTokenRefreshListener = firebase.messaging().onTokenRefresh((token) => {
      setFCMToken(token);
    });
  }, [props]);

  const setFCMToken = (token) => {
    if (token) {
      console.log("FCM Token : ", token);
      updateFCMToken({ variables: { token } });
    }
  };

  return <Messanging />;
};

export default FCMToken;
