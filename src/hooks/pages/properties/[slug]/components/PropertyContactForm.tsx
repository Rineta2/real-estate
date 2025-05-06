import React, { useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { ContactFormData, validateContactForm, submitContactForm } from '@/hooks/pages/properties/[slug]/lib/contactFormValidation';

interface PropertyContactFormProps {
    propertyTitle: string;
    propertySlug: string;
}

export default function PropertyContactForm({ propertyTitle, propertySlug }: PropertyContactFormProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState<Partial<ContactFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            toast.error('Silakan login terlebih dahulu untuk menghubungi agent');
            setTimeout(() => {
                localStorage.setItem('redirectAfterLogin', window.location.pathname);
                router.push('/signin');
            }, 1500);
            return;
        }

        const validationResult = validateContactForm(formData);

        if (!validationResult.success) {
            setErrors(validationResult.errors || {});
            toast.error('Mohon periksa kembali form Anda');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await submitContactForm(propertySlug, formData, user.uid, user.photoURL);

            if (!result.success) {
                toast.error(result.error || 'Terjadi kesalahan saat mengirim pesan');
                return;
            }

            toast.success('Pesan berhasil dikirim!');

            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });
            setErrors({});

        } catch {
            toast.error('Terjadi kesalahan saat mengirim pesan');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <div>
                <input
                    type="text"
                    value={propertyTitle}
                    readOnly
                    className="block w-full rounded-lg border border-gray-200 bg-gray-100 text-gray-500 p-3 sm:p-4 text-sm sm:text-base cursor-not-allowed"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className={`block w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className={`block w-full rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hello, I am interested in..."
                    rows={3}
                    className={`block w-full rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base resize-none`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 bg-black text-white font-semibold text-base sm:text-lg rounded-lg sm:rounded-xl py-3 sm:py-4 w-full flex items-center justify-center gap-2 transition-colors ${isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-gray-900'
                    }`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                    </>
                ) : (
                    <>
                        {user ? 'Learn more' : 'Login to contact'}
                        <span className="text-yellow-400 text-lg sm:text-xl">→</span>
                    </>
                )}
            </button>
        </form>
    );
} 