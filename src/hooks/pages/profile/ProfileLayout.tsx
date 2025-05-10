"use client"

import React, { useState, useEffect } from 'react';

import { toast } from 'react-hot-toast';

import { useAuth } from '@/utils/context/AuthContext';

import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import Image from 'next/image';

import imagekitInstance from '@/utils/imagekit/imagekit';

import { format } from 'date-fns';

import { id } from 'date-fns/locale';

import ProfileSkelaton from '@/hooks/pages/profile/ProfileSkelaton';

import { UserAccount } from "@/types/Auth";

import { FiUser } from 'react-icons/fi';

import { TextInput, Button } from 'flowbite-react';

import Link from 'next/link';

import { IoMdArrowRoundBack } from "react-icons/io";

type TimestampType = {
    seconds: number;
    nanoseconds: number;
} | Date | null;

export default function ProfileContent() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserAccount | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user?.uid) return;

            try {
                const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setProfile(userSnap.data() as UserAccount);
                } else {
                    setError('User profile not found');
                }
            } catch {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user?.uid]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.uid || !editedProfile) return;

        setIsSaving(true);
        try {
            let photoURL = editedProfile.photoURL;

            // Handle image upload if there's a selected file
            if (selectedFile) {
                try {
                    // Convert to base64
                    const base64Image = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            resolve(reader.result as string);
                        };
                        reader.readAsDataURL(selectedFile!);
                    });

                    // Upload to ImageKit
                    const uploadResponse = await imagekitInstance.upload({
                        file: base64Image,
                        fileName: `profile-${user.uid}-${Date.now()}`,
                        folder: '/profile-images'
                    });

                    photoURL = uploadResponse.url;
                } catch (err) {
                    console.error('Error uploading image:', err);
                    toast.error('Gagal mengupload foto');
                    setIsSaving(false);
                    return;
                }
            }

            const userRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, user.uid);
            const updateData = {
                displayName: editedProfile.displayName,
                email: editedProfile.email,
                photoURL: photoURL,
                phoneNumber: editedProfile.phoneNumber,
                updatedAt: serverTimestamp()
            };
            await updateDoc(userRef, updateData);
            setProfile({ ...editedProfile, photoURL });
            setIsEditing(false);
            setImagePreview(null);
            setSelectedFile(null);
            toast.success('Profil berhasil diperbarui');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile');
            toast.error('Gagal memperbarui profil');
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setSelectedFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(null);
        setImagePreview(null);
        setSelectedFile(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => prev ? { ...prev, [name]: value } : null);
    };

    const formatTimestamp = (timestamp: TimestampType) => {
        if (!timestamp) return '-';

        // Handle Firestore Timestamp
        if ('seconds' in timestamp) {
            return format(new Date(timestamp.seconds * 1000), 'dd MMMM yyyy, HH:mm:ss', { locale: id });
        }

        // Handle Date object
        if (timestamp instanceof Date) {
            return format(timestamp, 'dd MMMM yyyy, HH:mm:ss', { locale: id });
        }

        return '-';
    };

    if (loading) {
        return <ProfileSkelaton />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!profile) {
        return <div>No profile data available</div>;
    }

    const stats = [
        { label: 'Role', value: 'User' },
        { label: 'Member Sejak', value: formatTimestamp(profile.createdAt) },
        { label: 'Status Account', value: profile.isActive ? 'Aktif' : 'Tidak Aktif' }
    ];

    return (
        <section className="min-h-full relative">
            {/* Back Home Button */}
            <div className="absolute top-6 left-4 z-10 bg-white rounded-full py-2 px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200"
                >
                    <IoMdArrowRoundBack className="w-5 h-5" />
                    <span>Kembali ke home</span>
                </Link>
            </div>

            {/* Header Gradient & Profile Image */}
            <div className="relative">
                <div className="h-40 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-b-3xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }} />
                </div>
                <div className="absolute left-1/2 top-20 transform -translate-x-1/2">
                    {profile.photoURL ? (
                        <Image
                            src={profile.photoURL}
                            alt="Profile"
                            width={128}
                            height={128}
                            className="rounded-full border-4 border-white shadow-xl w-32 h-32 object-cover bg-white"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            <FiUser className="w-16 h-16 text-gray-400" />
                        </div>
                    )}
                </div>
            </div>

            {/* Name, Info, Stats */}
            <div className="mt-20 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-gray-900">{profile.displayName}</h1>
                <div className="flex gap-6 mt-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-4 px-8 text-center min-w-[110px] border border-gray-100">
                            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Profile Form */}
            <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-white rounded-3xl border border-gray-200 shadow p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Profile Fields */}
                        <div className="space-y-6">
                            {[{
                                label: 'Nama',
                                name: 'displayName',
                                value: isEditing ? editedProfile?.displayName : profile.displayName,
                                type: 'text'
                            }, {
                                label: 'Email',
                                value: profile.email,
                                readOnly: true
                            }, {
                                label: 'Nomor Telepon',
                                name: 'phoneNumber',
                                value: isEditing ? editedProfile?.phoneNumber : (profile.phoneNumber || '-'),
                                type: 'tel'
                            }, {
                                label: 'Terakhir Diperbarui',
                                value: formatTimestamp(profile.updatedAt),
                                readOnly: true
                            }].map((field, index) => (
                                <div key={index} className="group p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <label className="text-xs font-medium text-gray-600 block mb-1">{field.label}</label>
                                    <div className="mt-1">
                                        {isEditing && !field.readOnly ? (
                                            <TextInput
                                                type={field.type}
                                                name={field.name}
                                                value={field.value || ''}
                                                onChange={handleChange}
                                                placeholder={`Masukkan ${field.label}`}
                                                sizing="lg"
                                                className="w-full"
                                            />
                                        ) : (
                                            <p className="text-gray-800 text-base">{field.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Profile Image Upload (edit mode only) */}
                        {isEditing && (
                            <div className="flex flex-col items-center justify-center mt-8">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="profile-image-upload"
                                />
                                <label
                                    htmlFor="profile-image-upload"
                                    className={`inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 
                                            rounded-xl hover:bg-indigo-50 transition-all duration-300 font-medium 
                                            border-2 border-indigo-100 hover:border-indigo-200 shadow-sm
                                            active:scale-95 cursor-pointer ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    style={{ pointerEvents: isSaving ? 'none' : 'auto' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {isSaving ? 'Mengupload...' : 'Pilih Foto'}
                                </label>

                                {imagePreview && (
                                    <div className="mt-4 flex flex-col items-center">
                                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-gray-400 mt-4">
                                    Ukuran gambar: maks. 1 MB<br />Format gambar: JPEG, PNG
                                </p>
                            </div>
                        )}

                        {isEditing && (
                            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                                <Button
                                    color="gray"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                    size="lg"
                                    className="w-full sm:w-auto bg-gray-500"
                                >
                                    Batal
                                </Button>
                                <Button
                                    color="purple"
                                    type="submit"
                                    disabled={isSaving}
                                    size="lg"
                                    className="w-full sm:w-auto bg-primary"
                                >
                                    {isSaving ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </div>
                        )}
                    </form>

                    {!isEditing && (
                        <div className="flex justify-center mt-6">
                            <Button
                                color="purple"
                                onClick={handleEdit}
                                size="lg"
                                className="bg-primary"
                            >
                                Edit Profil
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}