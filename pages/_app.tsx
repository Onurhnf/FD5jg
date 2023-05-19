import store from "@/store/Store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let isAuthenticated = false;
    // Check if user is authenticated
    if (localStorage.getItem("pitonToken")) {
      isAuthenticated = true;
    }

    // Redirect to login/register page if not authenticated
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
