"use client";
import { useAuth } from "@/context/authContext"; 
import { usePathname } from "next/navigation"; 

function Header() {
  const { token, logout } = useAuth(); 
  const pathname = usePathname(); 

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4">
      <h1 className="text-3xl font-bold text-white">Manager</h1>
      {token && pathname === "/items" && ( 
        <button
          onClick={logout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;