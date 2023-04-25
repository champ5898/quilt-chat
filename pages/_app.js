import "@/styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

let auth = "";
// const endpoint = process.env.GRAPHQL_URI;
if (typeof window !== "undefined") {
  const token = sessionStorage.getItem("token");
  auth = "Bearer " + token;
}

const client = new ApolloClient({
  uri: "https://api.lounge-quilt.com/",
  cache: new InMemoryCache(),
  headers: {
    authorization: auth,
  },
});

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
