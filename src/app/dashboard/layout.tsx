"use client";

import { useAuth } from "@/utils/context/AuthContext";

import { Role } from "@/types/Auth";

import { useEffect, useState } from "react";

import SuperAdminHeader from "@/components/layout/dashboard/super-admins/Sidebar";

import AdminHeader from "@/components/layout/dashboard/admins/Header";

import Header from "@/components/layout/dashboard/Header";

import AccessDenied from "@/components/layout/dashboard/AccessDenied";

import { HiX } from "react-icons/hi";

import { usePropertiesData } from "@/hooks/dashboard/super-admins/properties/properties/lib/FetchProperties";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024;
        }
        return false;
    });
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);
    const { properties, isLoading: isLoadingProperties } = usePropertiesData();

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
            return;
        }

        const currentPath = window.location.pathname;

        if (currentPath.startsWith('/dashboard/super-admins')) {
            if (!hasRole(Role.SUPER_ADMIN)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.SUPER_ADMIN);
        } else if (currentPath.startsWith('/dashboard/admins')) {
            if (!hasRole(Role.ADMIN)) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }
            setCurrentRole(Role.ADMIN);
        } else {
            window.location.href = '/';
            return;
        }

        setIsAuthorized(true);
        setLoading(false);
    }, [hasRole, user]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading || isLoadingProperties) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        return <AccessDenied />;
    }

    const renderSidebar = () => {
        switch (currentRole) {
            case Role.SUPER_ADMIN:
                return <SuperAdminHeader onSidebarToggle={setIsSidebarOpen} />;
            case Role.ADMIN:
                return <AdminHeader onSidebarToggle={setIsSidebarOpen} />;
            default:
                return null;
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-30 w-80 h-screen transition-transform duration-300 ease-in-out bg-white border-r border-gray-100 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 lg:hidden"
                >
                    <HiX className="w-6 h-6" />
                </button>
                {renderSidebar()}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-80">
                {/* Header */}
                <Header onMenuClick={toggleSidebar} properties={properties} />

                {/* Page content */}
                <main className="flex-1 px-4 py-4 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
} 