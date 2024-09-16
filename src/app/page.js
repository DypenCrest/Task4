"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const user = Cookies.get("username");
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove("username");
    router.push("/login");
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        {isLoading ? (
          <span className="text-black">Loading...</span>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-6 text-blue-600">Dashboard</h1>
            <p className="text-lg text-gray-600 mb-4">
              Welcome to the Dashboard! You are now logged in and authenticated
              succesfully!
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 py-1 px-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
