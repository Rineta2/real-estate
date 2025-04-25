"use client"

import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import forgotPasswordImg from "@/base/assets/forgot.jpg"

import { TextInput, Button } from 'flowbite-react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { useAuth } from '@/utils/context/AuthContext'

const forgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordLayout() {
    const { forgotPassword } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await forgotPassword(data.email)
        } catch (error) {
            console.error('Forgot password error:', error)
        }
    }

    return (
        <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white p-8 rounded-2xl shadow-xl'>
                {/* Left Column - Image */}
                <div className='flex flex-col items-center justify-center p-8'>
                    <Image
                        src={forgotPasswordImg}
                        alt="Forgot Password"
                        width={200}
                        height={200}
                        className='mb-4'
                    />
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Forgot Your Password?
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </p>
                </div>

                {/* Right Column - Forgot Password Form */}
                <div className='flex flex-col justify-center p-8'>
                    <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>
                        Reset Your Password
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <TextInput
                                {...register('email')}
                                id="email"
                                type="email"
                                placeholder="Email address"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
                        </Button>
                    </form>
                    <p className='mt-4 text-center text-sm text-gray-600'>
                        Remember your password?{' '}
                        <Link href="/signin" className='font-medium text-blue-600 hover:text-blue-500'>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
} 