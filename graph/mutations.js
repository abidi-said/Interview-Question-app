import gql from "graphql-tag";

export const UPDATE_FCM_TOKEN = gql`
  mutation UpdateFCMToken($token: String!) {
    updateFcmToken(token: $token)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($user: UserInput!) {
    updateProfile(user: $user) {
      id
      email
      mobile
      country
      firstName
      lastName
      image
      username
      job
      birthdate
    }
  }
`;
