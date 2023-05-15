import { Provider } from "react-redux";
import store from "../redux/store";
import Head from "next/head";
import "../styles/global.scss";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>My new cool app</title>
        <meta lang="en" />
        <meta name="description" content="SKDESIGN FRONTEND TEST" />
        <meta charSet="UTF-8" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
