import Image from "next/image";

import Link from "next/link";

import logo from "@/base/assets/Logo.png"

import { RxHamburgerMenu } from "react-icons/rx";

import { IoClose } from "react-icons/io5";

import { menuHamburger, socialMedia } from "@/components/layout/Header/data/Header"

import { IoLocationOutline } from "react-icons/io5";

import React, { useEffect, useState } from "react";

import { useAuth } from "@/utils/context/AuthContext";

import { motion, AnimatePresence } from 'framer-motion';

import ProfileMenu from "./ProfileMenu";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    // Close menu when clicking a link
    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 180);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const menuVariants = {
        closed: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            }
        },
        open: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 30 },
        open: { opacity: 1, y: 0, transition: { ease: "easeOut" } }
    };

    const socialVariants = {
        closed: { opacity: 0, x: 30 },
        open: { opacity: 1, x: 0, transition: { ease: "easeOut" } }
    };

    const locationVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0, transition: { ease: "easeOut", delay: 0.6 } }
    };

    return (
        <header className={`fixed ${isMenuOpen ? 'top-0' : 'top-2'} left-0 right-0 z-50 flex justify-center items-start h-24 px-3 lg:px-12`}>
            <div className="w-full max-w-7xl mx-auto rounded-xl bg-white shadow-lg px-4 py-3 flex items-center justify-between h-16 relative">
                {/* Hamburger Kiri */}
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-10 h-10 rounded-md text-[#2d223a] hover:bg-[#edeafd] transition-all duration-200"
                >
                    {isMenuOpen ?
                        <IoClose className="text-2xl" /> :
                        <RxHamburgerMenu className="text-2xl" />
                    }
                </button>

                {/* Logo Tengah */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
                    <Image
                        src={logo}
                        alt="logo"
                        width={110}
                        height={40}
                        className="object-contain filter brightness-0 w-[80px] h-auto md:w-[110px]"
                    />
                </div>

                {/* Tombol Aksi Kanan */}
                <div className="flex items-center gap-2">
                    {user ? (
                        <ProfileMenu
                            isProfileOpen={isProfileOpen}
                            toggleProfile={toggleProfile}
                        />
                    ) : (
                        <Link
                            href="/signin"
                            className="py-2 px-4 rounded-full bg-white/10 font-medium hover:bg-[#a996fd]/20 hover:text-[#a996fd] transition-all duration-300 text-sm text-[#2d223a]"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Full-screen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-3xl"
                        style={{ zIndex: 100 }}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={toggleMenu}
                            className="absolute top-6 md:top-10 right-6 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-teal-400/20 text-white hover:text-teal-400 transition-all duration-300 z-50"
                        >
                            <IoClose className="text-xl md:text-2xl" />
                        </motion.button>

                        <div className="container mx-auto px-4 md:px-10 h-full flex flex-col justify-center">
                            <div className="grid md:grid-cols-[1fr,auto] gap-8 md:gap-10 items-center">
                                <div>
                                    <motion.nav
                                        variants={menuVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        className="py-8 md:py-10"
                                    >
                                        <ul className="flex flex-col gap-6 md:gap-8 items-center md:items-start">
                                            {menuHamburger.map((item) => (
                                                (item.name === "Login" && user) ? null : (
                                                    <motion.li
                                                        key={item.href}
                                                        variants={itemVariants}
                                                        className="overflow-hidden"
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            onClick={handleMenuItemClick}
                                                            className="block relative overflow-hidden group"
                                                        >
                                                            <motion.span
                                                                className={`flex items-center text-2xl md:text-3xl font-medium py-2 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-100%] ${isMenuOpen ? "text-white" : scrolled ? "text-black" : "text-white"}`}
                                                            >
                                                                {item.name}
                                                            </motion.span>
                                                            <motion.span
                                                                className="absolute top-full left-0 flex items-center text-teal-400 text-2xl md:text-3xl font-medium py-2 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-100%]"
                                                            >
                                                                {item.name}
                                                            </motion.span>
                                                        </Link>
                                                    </motion.li>
                                                )
                                            ))}
                                        </ul>
                                    </motion.nav>

                                    {/* Location Information */}
                                    <motion.div
                                        variants={locationVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        className="mt-12 md:mt-16 flex items-center gap-3 md:items-start"
                                    >
                                        <IoLocationOutline className="text-white/70 text-xl md:text-2xl" />
                                        <div>
                                            <h4 className="text-white/90 font-medium text-sm md:text-base">Visit Us</h4>
                                            <p className="text-white/70 text-xs md:text-sm mt-1">123 Business Avenue, Suite 500<br />New York, NY 10001</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Social Media Grid */}
                                <motion.div
                                    variants={menuVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="hidden md:grid grid-cols-2 gap-6 justify-items-center"
                                >
                                    {socialMedia.map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variants={socialVariants}
                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-teal-400/20 hover:text-teal-400 transition-all duration-300 hover:scale-110"
                                            whileHover={{ y: -5 }}
                                        >
                                            <item.icon className="text-xl" />
                                        </motion.a>
                                    ))}
                                </motion.div>

                                {/* Mobile Social Media */}
                                <motion.div
                                    variants={menuVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="md:hidden flex flex-wrap justify-center gap-4 mt-8"
                                >
                                    {socialMedia.map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variants={socialVariants}
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-teal-400/20 hover:text-teal-400 transition-all duration-300"
                                        >
                                            <item.icon className="text-lg" />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </div>

                            <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center">
                                <p className="text-white/40 text-xs md:text-sm">© 2025 <a href="https://spacedigitalia.my.id" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-all duration-300">Space Digitalia</a></p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
