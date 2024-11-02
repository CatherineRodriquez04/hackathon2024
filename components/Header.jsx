"use client";

import Link from "next/link";
import { Button } from "./ui/button";

//components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-black">
      <div className="mx-8 flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl fonts-semibold hover:scale-110">
            Demo<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav & hire me button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
      {/* border */}
      <div className="mt-2 border border-black/10"></div>
    </header>
  );
};

export default Header;
