import gql from 'graphql-tag';

export const CHECK_DELIVERY_DETAILS = gql`
  query {
    deliveryDetails @client {
      deliveryAddress {
        id
        address {
          address
          location {
            lat
            lng
          }
        }
      }
    }
  }
`;
