"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const credentials = { username: "admin", password: "admin123" };
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username === credentials.username &&
      formData.password === credentials.password
    ) {
      Cookies.set("username", formData.username);
      setIsLoggedIn(true);
      router.push("/");
    } else {
      alert("Invalid Credentials!");
    }
  };

  useEffect(() => {
    const user = Cookies.get("username");
    if (user) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {isLoggedIn ? (
        <div className="text-black flex flex-col items-center border-2 p-8 rounded-xl shadow-xl">
          <span>You are already logged in</span>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-600 py-1 px-2 text-white rounded-md mt-4"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-zinc-800 text-center">
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 text-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
