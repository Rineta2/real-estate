import Image from "next/image";

import Link from "next/link";

import logo from "@/base/assets/Logo.png"

import { RxHamburgerMenu } from "react-icons/rx";

export const menu = [
    {
        name: "About",
        href: "#about",
    },
    {
        name: "Contact",
        href: "#contact",
    },
]

export default function Header() {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-gray-800">
            <div className="container px-4 md:px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 py-2 px-6 rounded-full bg-white">
                    <span>Menu</span><RxHamburgerMenu />
                </div>
                <div>
                    <Image src={logo} alt="logo" width={100} height={100} />
                </div>
                <div>
                    <ul className="flex items-center gap-4">
                        {menu.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-white">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}
