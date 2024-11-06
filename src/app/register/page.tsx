"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const RegisterPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error state
  
    // Check if fields are filled
    if (!email || !password || !phoneNumber) {
      setError("All fields are required.");
      return;
    }
  
    const payload = { email, password, phoneNumber };
    console.log("Sending payload:", payload); // Log the payload
  
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (res.ok) {
      const result = await res.json();
      console.log("Registration successful:", result);
      toast.success("Registration successful!"); // Show success notification
      router.push("/"); // Redirect to home after successful registration
    } else {
      let errorData;
      try {
        errorData = await res.json(); // Attempt to get JSON response
      } catch (error) {
        console.error("Failed to parse error response:", error);
        errorData = { message: "An unexpected error occurred." }; // Fallback message
      }
  
      if (res.status === 404) {
        console.error("Resource not found:", errorData); // Log 404 error
        setError("The requested resource was not found."); // Set specific error message
        toast.error("The requested resource was not found."); // Show specific error notification
      } else {
        console.error("Error response:", errorData); // Log other errors
        setError(errorData.message || "An error occurred"); // Set general error message
        toast.error(errorData.message || "An error occurred"); // Show general error notification
      }
    }
  };  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center rounded">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[100%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2 rounded">
          <Image src="https://ik.imagekit.io/bja2qwwdjjy/_Pngtree_user%20login%20or%20authenticate%20icon_5056093_yg98dGG8w.png?updatedAt=1730925285632" alt="Register Background" fill className="object-cover" />
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
          </ form>
          <p className="mt-4 text-center">
          Already have an account? 
          <a href="/login" className="text-indigo-950  flex flex-col hover:underline"> Log in here</a>
        </p>
        </div>
      </div>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default RegisterPage;