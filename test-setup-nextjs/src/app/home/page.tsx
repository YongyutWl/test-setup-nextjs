"use client";
import { Suspense } from "react";
import HomePage from "../../components/home";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Suspense fallback="Loading...">
        <HomePage />
      </Suspense>
    </div>
  );
};

export default LoginPage;
