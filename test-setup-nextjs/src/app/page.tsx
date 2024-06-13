"use client";
import { useRouter } from "next/navigation";
import React, { Suspense, useLayoutEffect } from "react";

export default function Page() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push("/home");
  }, []);
  return (
    <Suspense fallback="Loading...">
      <React.Fragment>Welcome to Root Home Page</React.Fragment>
    </Suspense>
  );
}
