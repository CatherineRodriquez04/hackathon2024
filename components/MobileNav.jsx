"use client";

import { useState } from 'react';
import { Link } from 'react-scroll';
import { CiMenuFries } from 'react-icons/ci';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Image from "next/image"; 
//import Icon from "../public/assets/logo.png";

//import { useDarkMode } from '@/app/darkMode';


const links = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
];

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    // const { isDarkMode } = useDarkMode();
    const isDarkMode = false;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={() => setIsOpen(true)}>
                <CiMenuFries className="text-[32px] text-accent" />
            </SheetTrigger>
            <SheetContent className={`flex flex-col items-center mobileBg ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="mt-32 mb-10 justify-center items-center">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        {/* <Image src={Icon} alt="Logo" width={250} height={250} /> */}
                    </Link>
                </div>
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path} // Target section id
                        smooth={true} // Smooth scrolling
                        duration={500} // Scroll duration
                        offset={-70} // Offset to account for sticky navbars if any
                        onClick={() => setIsOpen(false)} // Close the mobile nav
                        className="capitalize text-[20px] font-russo"
                    >
                        {link.name}
                    </Link>
                ))}
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;