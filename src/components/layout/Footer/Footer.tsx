import Image from "next/image";

import Link from "next/link";

import Logo from "@/base/assets/Logo.png";

import { socialMedia } from "@/components/layout/Header/data/Header";

export default function Footer() {
    return (
        <footer className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={130}
                            height={35}
                            className="brightness-0 hover:opacity-80 transition-opacity duration-300"
                        />
                        <p className="text-gray-600 text-sm font-medium tracking-wide">
                            More Comfortable. More Classy.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-8">
                        {['Home', 'About', 'Gallery', 'Blog', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-gray-600 hover:text-teal-600 text-sm font-medium transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Media */}
                    <div className="flex gap-5">
                        {socialMedia.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-teal-600 transition-colors duration-300 transform hover:scale-110"
                            >
                                <item.icon className="text-2xl" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-500 font-medium">
                        © 2025{' '}
                        <a
                            href="https://spacedigitalia.my.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
                        >
                            Space Digitalia
                        </a>
                        . All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
