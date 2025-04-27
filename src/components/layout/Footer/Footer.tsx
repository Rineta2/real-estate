import Image from "next/image";

import Link from "next/link";

import Logo from "@/base/assets/Logo.png";

export default function Footer() {
    return (
        <footer className="py-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-14">
                <div className="md:grid md:grid-cols-4 md:gap-8">
                    {/* Logo and Tagline */}
                    <div className="mb-8 md:mb-0">
                        <Image src={Logo} alt="Logo" width={150} height={40} className="mb-4 brightness-0" />
                        <div className="text-gray-600 text-sm">
                            <p>More Comfortable.</p>
                            <p>More Classy.</p>
                        </div>
                    </div>

                    {/* Navigation Links - Stack on mobile, Grid on desktop */}
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Company Section */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
                            <ul className="space-y-2">
                                <li><Link href="#about" className="text-gray-600 hover:text-gray-900 text-sm">About us</Link></li>
                                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Blog</Link></li>
                                <li><Link href="/careers" className="text-gray-600 hover:text-gray-900 text-sm">Careers</Link></li>
                                <li><Link href="/customers" className="text-gray-600 hover:text-gray-900 text-sm">Customers</Link></li>
                                <li><Link href="/brand" className="text-gray-600 hover:text-gray-900 text-sm">Brand</Link></li>
                            </ul>
                        </div>

                        {/* Product Section */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
                            <ul className="space-y-2">
                                <li><Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link></li>
                                <li><Link href="/integrations" className="text-gray-600 hover:text-gray-900 text-sm">Integrations</Link></li>
                                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</Link></li>
                            </ul>
                        </div>

                        {/* Resources Section */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                            <ul className="space-y-2">
                                <li><Link href="/community" className="text-gray-600 hover:text-gray-900 text-sm">Community</Link></li>
                                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link></li>
                                <li><Link href="/dpa" className="text-gray-600 hover:text-gray-900 text-sm">DPA</Link></li>
                                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <p className="text-sm text-gray-600 mb-4 md:mb-0">© 2024 All rights reserved</p>
                        <ul className="space-y-2 md:space-y-0 md:flex md:space-x-6">
                            <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Policy service</Link></li>
                            <li><Link href="/cookie" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
                            <li><Link href="/partners" className="text-sm text-gray-600 hover:text-gray-900">Partners</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
