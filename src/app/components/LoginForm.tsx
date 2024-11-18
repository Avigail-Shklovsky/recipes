"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import userStore, { UserState } from "@/app/store/use-store/userStore";
import { loginAxiosForGetToken } from "../services/auth";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = userStore((state: UserState) => state.setUser);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
       console.error("NODE_ENV:", process.env.NODE_ENV);
    try {
      const response = await loginAxiosForGetToken(email, password);
      if (response) {
        setUser({ email, password });
        console.log("Signin successful");
        router.push("/homePage");
        clearData();
      } else {
        setError("password or email are wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="bg-slate-300 space-y-12 w-full h-[400px] text-black p-8">
      <div className="flex justify-center  space-x-4 mb-6">
        <button
          className={`px-6 py-2 text-xl font-semibold ${"bg-transparent text-[#7864EA] border-b-2 border-[#7864EA]"}`}
        >
          Login
        </button>
      </div>

      <form onSubmit={onSubmit}>
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
            autoComplete="current-password"
          />
        </div>
        <button className="w-full bg-[#7864EA] text-white py-2 mt-4 rounded">
          Login
        </button>
        {error && <p className="text-red-700 mt-4">{error}</p>}
      </form>
    </div>
  );
};
