import gql from "graphql-tag";

export const ME = gql`
  {
    me {
      id
      email
      mobile
      mobileVerified
      emailVerified
      country
      lastName
      firstName
      image
    }
  }
`;

export const CATEGORY = gql`
  {
    categories {
      id
      name
      title
      tags
      countLanguage
      image
    }
  }
`;

export const LANGUAGE = gql`
  {
    languages {
      id
      name
      title
      tags
      countQuestion
      image
    }
  }
`;

export const QUESTION = gql`
  {
    questions {
      id
      title
      data
      language
      source
    }
  }
`;
