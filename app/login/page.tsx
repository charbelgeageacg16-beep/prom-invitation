"use client";

import { useState } from "react";
import { teachers } from "@/lib/teachers";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function normalize(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\s-]/g, "");
  }

  function handleLogin() {
    const normalizedInput = normalize(name);

    const found = teachers.find(
      (teacher) => normalize(teacher) === normalizedInput
    );

    if (found) {
        localStorage.setItem("teacherName", found);
        setError("");
        window.location.href = "/";
    }else {
        setError("Name not found. Please try again.");
    } 
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl italic mb-8">
          Teacher Login
        </h1>

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black rounded-full px-6 py-3 w-80 text-center mb-4"
        />

        <br />

        <button
          onClick={handleLogin}
          className="border-2 border-black rounded-full px-8 py-3"
        >
          Continue
        </button>

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}