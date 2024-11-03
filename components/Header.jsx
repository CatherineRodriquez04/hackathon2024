/** @format */

"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//logo
import Logo from "../public/assets/logo.png";

//components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

//firebase
import { auth } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Dropdown = ({ onLogout, onDeleteAccount }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
        onClick={onLogout}
      >
        Logout
      </button>
      <button
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
        onClick={onDeleteAccount}
      >
        Delete Account
      </button>
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      router.push("/login"); // Redirect after logout
    });
  };

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await user.delete(); // This will delete the current user
        router.push("/login"); // Redirect after account deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        // Handle error, e.g., show a notification
      }
    }
  };

  return (
    <header className="py-4 xl:py-4 text-black relative">
      <div className="xl:mx-8 mx-3 flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={125}
            height={125}
            className="hover:scale-105"
          />
        </Link>

        <div className="flex-1 text-left mx-[20px]">
          <h1 className="h1 xl:text-[35px] text-[22px]">
            Beyond Boundaries
            <span className="text-[40px] font-semibold text-accent">.</span>
          </h1>
          <p className="h3 xl:text-[20px] text-[17px] text-accent">
            Discover New Horizons
          </p>
        </div>

        {/* desktop nav & profile options */}
        <div className="hidden xl:flex items-center gap-8 relative">
          <Nav />
          {user ? (
            <>
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link href="/chat">
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </Link>
                {dropdownOpen && (
                  <Dropdown
                    onLogout={handleLogout}
                    onDeleteAccount={handleDeleteAccount}
                  />
                )}
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
      {/* border */}
      <div className="mt-2 border border-[#69AC5A]"></div>
    </header>
  );
};

export default Header;
