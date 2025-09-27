"use client"; // needed because usePathname is a client hook
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const Header = () => {
    const pathname = usePathname(); // get current route

    const navLinks = [
        { href: "/", label: "Home" }, // <-- Added Home link
        { href: "/signup", label: "Signup" },
        { href: "/login", label: "Login" },
        { href: "/user/add-website", label: "Website-Registration" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-white">
                    BugHead
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition ${pathname === link.href
                                    ? "text-yellow-300 font-bold underline"
                                    : "text-white hover:text-gray-200"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Icon */}
                <button className="md:hidden p-2 rounded-lg hover:bg-white/20">
                    <Menu size={24} className="text-white" />
                </button>
            </div>
        </header>
    );
};

export default Header;
