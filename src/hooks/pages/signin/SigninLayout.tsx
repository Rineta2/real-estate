"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import loginImg from "@/base/assets/signin.jpg"
import { TextInput, Checkbox, Button } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, SignInFormData } from '@/lib/validations/auth'
import { useAuth } from '@/utils/context/AuthContext'

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const { login, loginWithGoogle } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInFormData) => {
        try {
            await login(data.email, data.password)
        } catch (error) {
            console.error('Sign in error:', error)
        }
    }

    return (
        <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white p-8 rounded-2xl shadow-xl'>
                {/* Back to Home Link */}
                <div className='absolute top-4 left-4'>
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Left Column - Image */}
                <div className='flex flex-col items-center justify-center p-8'>
                    <Image
                        src={loginImg}
                        alt="Logo"
                        width={200}
                        height={200}
                        className='mb-4'
                    />
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Welcome Back
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Sign in to access your account and manage your properties
                    </p>
                </div>

                {/* Right Column - Sign In Form */}
                <div className='flex flex-col justify-center p-8'>
                    <h2 className='text-3xl font-extrabold text-gray-900 mb-6'>
                        Sign in to your account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div className='space-y-4'>
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
                            <div className="relative">
                                <TextInput
                                    {...register('password')}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    )}
                                </button>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <Checkbox
                                    {...register('rememberMe')}
                                    id="remember-me"
                                />
                                <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>
                                    Remember me
                                </label>
                            </div>

                            <div className='text-sm'>
                                <Link href="/forgot-password" className='font-medium text-blue-600 hover:text-blue-500'>
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={loginWithGoogle}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Sign in with Google</span>
                        </Button>
                    </form>
                    <p className='mt-4 text-center text-sm text-gray-600'>
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className='font-medium text-blue-600 hover:text-blue-500'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
