import gql from 'graphql-tag';

export const UPDATE_SERVICE = gql`
  mutation UpdateService($service: String!) {
    updateService(service: $service) @client
  }
`;
