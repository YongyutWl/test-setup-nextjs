"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const windowObject = typeof window !== "undefined";
  const localStorageObject = windowObject ? window.localStorage : null;
  const isLoggedIn = localStorageObject
    ? localStorageObject.getItem("isLoggedIn")
    : null;

  console.log(isLoggedIn);

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    console.log(router);
  }, [router, isLoggedIn]);
  return <Provider store={store}>{children}</Provider>;
}
