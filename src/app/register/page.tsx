"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const RegisterPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error state

    // Check if fields are filled
    if (!email || !password || !phoneNumber) {
      setError("All fields are required.");
      return;
    }

    console.log("Form submitted", { email, password, phoneNumber }); // Debugging log

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, phoneNumber }), // Include email, password, and phone number
    });

    if (res.ok) {
      const result = await res.json();
      console.log('Registration successful:', result);
      toast.success('Registration successful!'); // Show success toast
      router.push("/"); // Redirect to home after successful registration
    } else {
      const errorData = await res.json();
      setError(errorData.message || 'Registration failed');
      toast.error(errorData.message || 'Registration failed'); // Show error toast
    }
  };

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center rounded">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2 rounded">
          <Image src="/registerBg.png" alt="Register Background" fill className="object-cover" />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-indigo-950 text-xl xl:text-3xl">Create an Account</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Phone Number:</label>
              <input 
                type="text" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
                className="p-2 border rounded"
 />
            </div>
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded">Register</button>
          </form>
        </div>
      </div>
      <ToastContainer className="top-center"/> {/* Add ToastContainer to render toasts */}
    </div>
  );
};

export default RegisterPage;