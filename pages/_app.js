import "semantic-ui-css/semantic.min.css";
import "@/styles/globals.css";
import { UserProvider } from "@/context/AuthContext";
function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default App
