"use client"

import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import GalleryImage from "@/base/assets/gallery.jpg"

export default function GalleryHero() {
    return (
        <motion.div
            className="relative w-full h-[60vh] min-h-[400px] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="absolute inset-0">
                <Image
                    src={GalleryImage}
                    alt="Gallery Hero"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
            </div>

            <motion.div
                className="relative h-full flex items-center justify-center text-center px-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Our Gallery
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Explore our collection of stunning properties and discover your dream home
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    )
}
