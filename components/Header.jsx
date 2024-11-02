"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

//logo
import Logo from "../public/assets/logo.png";

//components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-4 xl:py-4 text-black">
      <div className="mx-8 flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <Image src={Logo} alt="Logo" width={125} height={125} className="hover:scale-105" />
        </Link>

        <div className="flex-1 text-left mx-[20px]">
          <h1 className="h1 text-[35px]">
            Beyond Boundaries<span className="text-[40px] font-semibold text-accent">.</span>
          </h1>
          <p className="h3 text-[20px] text-accent">Discover New Horizons</p>
        </div>

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
      <div className="mt-2 border border-[#69AC5A]"></div>
    </header>
  );
};

export default Header;
