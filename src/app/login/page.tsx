"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    console.log(result); // Log the result for debugging
    
    
    if (result?.error) {
      toast.error("Invalid credentials. Please try again."); // Show error toast
    } else {
      toast.success("Successfully logged in!"); // Show success toast
      router.push("/"); // Redirect after successful login
    }
  };

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center rounded">
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[100%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2 rounded">
          <Image src="/loginBg.png" alt="Login Background" fill className="object-cover" />
        </div>
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-indigo-950 text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>

          {/* Email and Password Sign In Form */}
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="p-4 bg-blue-500 text-white rounded-md">
              Sign in with Email
            </button>
          </form>

          <button 
            className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md" 
            onClick={() => signIn("google")}
          >
            <Image src="/google.png" alt="Google Icon" width={20} height={20} className="object-contain" />
            <span>Sign in with Google</span>
          </button>
          <p className="text-sm text-center">
            Don't have an account? <Link href="/register" className="text-blue-500 underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;