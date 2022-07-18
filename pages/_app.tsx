import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "../components/UI/Layout";
import { ThemeProvider } from "../states/context/theme/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
