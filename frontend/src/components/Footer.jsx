import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-500 to-black text-white py-10 mt-">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold">BugHead</h2>
                        <p className="mt-3 text-sm text-gray-200 leading-relaxed">
                            BugHead helps developers and testers collaborate by reporting,
                            tracking, and fixing issues seamlessly.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:underline hover:text-yellow-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:underline hover:text-yellow-300">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline hover:text-yellow-300">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="hover:underline hover:text-yellow-300">
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:underline hover:text-yellow-300">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-300 transition">
                                GitHub
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-300 transition">
                                Twitter
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-yellow-300 transition">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-gray-200">
                    © {new Date().getFullYear()} BugHead. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;