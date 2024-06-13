"use client";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <React.Fragment>Welcome to Root Home Page</React.Fragment>
    </Suspense>
  );
}
