import { HiHome, HiUsers, HiOfficeBuilding, HiDocumentReport, HiCog } from 'react-icons/hi';

import { LuLayoutDashboard } from "react-icons/lu";

export const menuItems = [
    {
        label: 'Dashboard',
        href: '/dashboard/super-admins',
        icon: HiHome
    },

    {
        label: 'Layout',
        href: '/dashboard/super-admins/layout',
        icon: LuLayoutDashboard,
        subItems: [
            {
                label: 'Home',
                href: '/dashboard/super-admins/layout/home'
            },

            {
                label: 'Featured',
                href: '/dashboard/super-admins/layout/featured'
            },

            {
                label: 'Services',
                href: '/dashboard/super-admins/layout/services'
            },

            {
                label: 'Your Dream',
                href: '/dashboard/super-admins/layout/your-dream'
            },

            {
                label: 'Faqs',
                href: '/dashboard/super-admins/layout/faqs'
            },
        ]
    },

    {
        label: 'Users',
        href: '/dashboard/super-admins/users',
        icon: HiUsers,
        subItems: [
            {
                label: 'All Users',
                href: '/dashboard/super-admins/users'
            },
            {
                label: 'Add User',
                href: '/dashboard/super-admins/users/add'
            }
        ]
    },

    {
        label: 'Properties',
        href: '/dashboard/super-admins/properties',
        icon: HiOfficeBuilding,
        subItems: [
            {
                label: 'All Properties',
                href: '/dashboard/super-admins/properties'
            },
            {
                label: 'Add Property',
                href: '/dashboard/super-admins/properties/add'
            },
            {
                label: 'Categories',
                href: '/dashboard/super-admins/properties/categories'
            }
        ]
    },
    {
        label: 'Reports',
        href: '/dashboard/super-admins/reports',
        icon: HiDocumentReport
    },
    {
        label: 'Settings',
        href: '/dashboard/super-admins/settings',
        icon: HiCog
    }
]; 