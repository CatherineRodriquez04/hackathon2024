"use client";

import { useState } from 'react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import {  CiMenuFries } from 'react-icons/ci';

const links = [
    {
        name: 'home',
        path: '/',
    },
    {
        name: 'about',
        path: '/about',
    },
    {
        name: 'services',
        path: '/services',
    },
    // {
    //     name: 'communication',
    //     path: '/communication',
    // },
    {
        name: 'contact',
        path: '/contact',
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
            {/* logo */}
            <div className="mt-32 mb-20 text-center text-2xl">
                <Link href="/" onClick={handleLinkClick}>
                    <h1 className="text-4xl font-semibold">Demo<span className="text-accent">.</span></h1>
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