"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import userStore, { UserState } from "@/app/store/use-store/userStore";

export const LoginForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const setUser = userStore((state: UserState) => state.setUser);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await login();
    } else {
      await signUp();
    }
  };

  const signUp = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/postUser",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Signup successful");
      setUser({ username, email, password });
      clearData();
    } catch (error) {
      handleError(error, "Account creation failed.");
    }
  };

  const login = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/getUserByEmail?email=${email}`
      );

      if (res.data.exists) {
        if (password === res.data.user.password) {
          setUser(res.data.user);
          console.log("Signin successful");

          clearData();
        } else {
          setError("Incorrect password. Please try again.");
        }
      } else {
        setError("User does not exist with this email.");
      }
    } catch (error) {
      handleError(error, "Error occurred while checking user.");
    }
  };

  const clearData = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    if (router) {
      router.push("/home");
      console.log(router, "ghjkl;");
    }
    setIsLogin(false);
  };

  const handleError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      setError(error.response.data.message || defaultMessage);
      setIsLogin(true);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 space-y-12 w-full h-[400px] text-black p-8">
      <div className="flex justify-center  space-x-4 mb-6">
        <button
          onClick={toggleForm}
          className={`px-6 py-2 text-xl font-semibold ${
            isLogin
              ? "bg-[#7864EA] text-white rounded-t-lg"
              : "bg-transparent text-[#7864EA] border-b-2 border-[#7864EA]"
          }`}
        >
          Login
        </button>
        <button
          onClick={toggleForm}
          className={`px-6 py-2 text-xl font-semibold ${
            !isLogin
              ? "bg-[#7864EA] text-white rounded-t-lg"
              : "bg-transparent text-[#7864EA] border-b-2 border-[#7864EA]"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={onSubmit}>
        {!isLogin && (
          <div className="grid w-full items-center gap-1.5">
            <label htmlFor="username">Username:</label>
            <input
              className="w-full"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
            />
          </div>
        )}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email:</label>
          <input
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="password">Password:</label>
          <input
            className="w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
        <button className="w-full bg-[#7864EA] text-white py-2 mt-4 rounded">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        {error && <p className="text-red-700 mt-4">{error}</p>}
      </form>
    </div>
  );
};
