import { createHttpLink } from "./apollo/http-link";
import { localCache } from "./apollo/local-cache";
import { ApolloClient } from "apollo-boost";

export function createApolloClient() {
  const httpLink = createHttpLink();

  const apolloClient = new ApolloClient({
    link: httpLink,
    connectToDevTools: __DEV__,
    cache: localCache,
  });

  return apolloClient;
}
