import { ApolloClient, InMemoryCache } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { API_URL } = require("next/config").default().publicRuntimeConfig;

export const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
});
