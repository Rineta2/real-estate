import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { TextInput, Textarea, Button, Checkbox } from 'flowbite-react';

import { CardContactType } from '@/hooks/pages/contact/types/contact'

import Link from 'next/link';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { contactFormSchema, ContactFormData } from '../validations/contact';

import { database } from '@/utils/firebase/firebase';

import { ref, push, set, query, orderByChild, get, equalTo } from 'firebase/database';

import toast from 'react-hot-toast';

interface CardLayoutProps {
    cardContact: CardContactType[];
}

export default function CardLayout({ cardContact }: CardLayoutProps) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: ContactFormData) => {
        if (isLoading) return;
        setIsLoading(true);
        const toastId = toast.loading('Checking your information...');

        try {
            const trimmedEmail = data.email.trim();
            const trimmedPhone = data.phoneNumber.trim();

            // Check for existing email
            const emailQuery = query(ref(database, process.env.NEXT_PUBLIC_REALTIME_CONTACT), orderByChild('email'), equalTo(trimmedEmail));
            const emailSnapshot = await get(emailQuery);

            if (emailSnapshot.exists()) {
                toast.error('This email is already registered. Please use a different email.', { id: toastId });
                setIsLoading(false);
                return;
            }

            // Check for existing phone number
            const phoneQuery = query(ref(database, process.env.NEXT_PUBLIC_REALTIME_CONTACT), orderByChild('phoneNumber'), equalTo(trimmedPhone));
            const phoneSnapshot = await get(phoneQuery);

            if (phoneSnapshot.exists()) {
                toast.error('This phone number is already registered. Please use a different phone number.', { id: toastId });
                setIsLoading(false);
                return;
            }

            const contactData = {
                fullName: data.fullName.trim(),
                email: trimmedEmail,
                phoneNumber: trimmedPhone,
                message: data.message.trim(),
                createdAt: new Date().toISOString(),
                status: 'unread'
            };

            // Create a new reference with a unique key
            const contactsRef = ref(database, process.env.NEXT_PUBLIC_REALTIME_CONTACT);
            const newContactRef = push(contactsRef);

            // Set the data
            await set(newContactRef, contactData);

            toast.success('Message sent successfully!', { id: toastId });
            reset();
        } catch (error: unknown) {
            console.error('Form submission error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.';
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='py-10 bg-neutral-50'>
            <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
                    {/* Contact Form Section */}
                    <div className='bg-white rounded-2xl p-6 sm:p-8 border border-gray-300 shadow-lg flex flex-col h-fit'>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900"
                        >
                            Send Us An Email
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="mb-8 text-gray-600 text-base sm:text-lg"
                        >
                            Step Into Our Contact Oasis: Where Questions Find Answers, And Your Presence Is Truly Treasured
                        </motion.p>

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <TextInput
                                        className="w-full focus:ring-2 focus:ring-red-400"
                                        type="text"
                                        placeholder="Full Name"
                                        disabled={isLoading}
                                        {...register('fullName')}
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                                    )}
                                </div>
                                <div>
                                    <TextInput
                                        className="w-full focus:ring-2 focus:ring-red-400"
                                        type="email"
                                        placeholder="Email"
                                        disabled={isLoading}
                                        {...register('email')}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <TextInput
                                        className="w-full focus:ring-2 focus:ring-red-400"
                                        type="text"
                                        placeholder="Phone Number"
                                        disabled={isLoading}
                                        {...register('phoneNumber')}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Textarea
                                    className="w-full focus:ring-2 focus:ring-red-400"
                                    placeholder="Your Message"
                                    rows={6}
                                    disabled={isLoading}
                                    {...register('message')}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Checkbox Section */}
                            <div className="flex items-start space-x-4">
                                <Checkbox
                                    id="terms"
                                    disabled={isLoading}
                                    {...register('terms')}
                                    className="focus:ring-red-400"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                    I agree to the <Link href="/terms" className="text-red-500 hover:text-red-600 font-medium">Terms and Conditions</Link> and <Link href="/privacy" className="text-red-500 hover:text-red-600 font-medium">Privacy Policy</Link>
                                </label>
                            </div>
                            {errors.terms && (
                                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : 'Send A Message'}
                            </Button>
                        </motion.form>
                    </div>
                    {/* Contact Info Section */}
                    <div className='bg-white rounded-2xl p-6 sm:p-8 border border-gray-300 shadow-lg flex flex-col h-fit'>
                        {cardContact.map((item, index) => (
                            <div key={index} className='space-y-6'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className='space-y-3'
                                >
                                    <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                                        {item.title}
                                    </h1>
                                    <p className='text-lg text-gray-600'>
                                        {item.description}
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                                    className='space-y-4'
                                >
                                    {item.card.map((cardItem, cardIndex) => (
                                        <Link
                                            key={cardIndex}
                                            href={cardItem.href}
                                            className='block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300'
                                        >
                                            <span className='block text-lg font-semibold text-gray-900 mb-1'>{cardItem.title}</span>
                                            <p className='text-gray-600'>{cardItem.description}</p>
                                        </Link>
                                    ))}
                                </motion.div>
                                {item.googleMapsIframe && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                                        className='space-y-4'
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900">Location</h3>
                                        <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                                            <div
                                                className="absolute inset-0 w-full h-full"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.googleMapsIframe.replace(
                                                        'width="600" height="450"',
                                                        'width="100%" height="100%" style="border:0; position:absolute; top:0; left:0; width:100%; height:100%;"'
                                                    )
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
