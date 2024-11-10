"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const UserLinks = () => {
  const { status } = useSession();

  // Render a loading state while the session is being determined
  if (status === "loading") {
    return <div>Loading...</div>; // You can replace this with a spinner or placeholder
  }

  return (
    <div>
       
      {status === "authenticated" ? (
        <div className="bg-customGreen text-indigo-950">
         
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>Logout</span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
      {/* <Link href="/orders">Orders</Link> */}
    </div>
  );
}

export default UserLinks;