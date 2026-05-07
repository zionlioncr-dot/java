import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export default client;
