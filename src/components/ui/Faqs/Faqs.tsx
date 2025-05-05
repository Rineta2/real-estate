"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { FetchFaqs } from "@/components/ui/Faqs/utils/FetchFaqs"

import { FaqsType } from "@/components/ui/Faqs/types/Faqs"

import FaqsSkelaton from '@/components/ui/Faqs/FaqsSkelaton'

import { FaPlus } from "react-icons/fa6";

export default function Faqs() {
    const [content, setContent] = useState<FaqsType[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedFaqs, setExpandedFaqs] = useState<number[]>([0]);

    useEffect(() => {
        const unsubscribe = FetchFaqs((newFaqs) => {
            setContent(newFaqs);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleFaq = (index: number) => {
        setExpandedFaqs(prev =>
            prev.includes(index)
                ? []
                : [index]
        );
    };

    if (loading) {
        return <FaqsSkelaton />;
    }

    const title = content.length > 0 ? content[0].title : '';
    const description = content.length > 0 ? content[0].description : '';
    const faqs = content.length > 0 ? content[0].faqs : [];

    return (
        <section className='py-8 sm:py-10 md:py-14 lg:py-28 bg-neutral-50 overflow-hidden' id='faqs'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12'>
                    <motion.div
                        className='flex flex-col space-y-2 sm:space-y-3 md:space-y-4'
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'>{title}</h1>
                        <p className='text-sm md:text-base lg:text-lg text-gray-600'>{description}</p>
                    </motion.div>

                    <motion.div
                        className='space-y-2 sm:space-y-3 md:space-y-4'
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {faqs.map((item, idx) => {
                            const isExpanded = expandedFaqs.includes(idx);
                            return (
                                <motion.div
                                    key={idx}
                                    className='border rounded-lg p-2 sm:p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors'
                                    onClick={() => toggleFaq(idx)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <div className='flex justify-between items-center'>
                                        <h3 className='font-semibold capitalize text-lg md:text-xl'>{item.title}</h3>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FaPlus className='w-4 h-4 sm:w-5 sm:h-5' />
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isExpanded ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className='text-sm md:text-base mt-2 text-gray-600'>{item.description}</p>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
