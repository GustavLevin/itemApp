// "use client";
// import { useAuth } from "@/context/authContext";

// import Link from "next/link";

// function Header() {
//   const auth = useAuth();

//   return (
//     <header className="flex items-center justify-between bg-gray-800 p-4">
//       <h1 className="text-3xl font-bold text-white">Library</h1>
//       {auth.token ? (
//         <Link
//           href="/"
//           onClick={auth.logout}
//           className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
//         >
//           Logout
//         </Link>
//       ) : (
//         <Link
//           href="/"
//           className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
//         >
//           Login
//         </Link>
//       )}
//     </header>
//   );
// }
// export default Header;
"use client";
import { useAuth } from "@/context/authContext"; // Ensure correct path
import { usePathname } from "next/navigation"; // Import usePathname to determine the current route

function Header() {
  const { token, logout } = useAuth(); // Destructure token and logout function from auth context
  const pathname = usePathname(); // Get the current pathname

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4">
      <h1 className="text-3xl font-bold text-white">Library</h1>
      {token && pathname === "/items" && ( // Show Logout only when logged in and on /items page
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