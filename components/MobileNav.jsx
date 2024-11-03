"use client";

import { useState } from 'react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import {  CiMenuFries } from 'react-icons/ci';

import Image from 'next/image';

//logo
import Logo from '../public/assets/logo.png';

const links = [
    {
        name: 'home',
        path: '/',
    },
    // {
    //     name: 'about',
    //     path: '#about',
    // },
    {
        name: 'map',
        path: '/map',
    },
];


const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleLinkClick = () => {
        setIsOpen(false); // Close the sheet
    };

    return <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="flex justify-center items-center" onClick={() => setIsOpen(true)}>
            <CiMenuFries className="text-[32px] text-accent" />
        </SheetTrigger>
        <SheetContent  className="flex flex-col">
        <div className="flex justify-center items-center mt-32 mb-10">
            <Link href="/">
                <Image 
                    src={Logo} 
                    alt="Logo" 
                    width={170} 
                    height={170} 
                    className="hover:scale-105 transition-transform" 
                />
            </Link>
        </div>

            {/* nav */}
            <nav className="flex flex-col justify-center items-center gap-8">
                {links.map((link) => {
                    return <Link 
                            href={link.path} 
                            key={link.path} 
                            className={`${link.path === pathname && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
                            onClick={handleLinkClick}
                            >
                            {link.name}
                        </Link>
                })}
            </nav>
        </SheetContent>
    </Sheet>;
};

export default MobileNav;