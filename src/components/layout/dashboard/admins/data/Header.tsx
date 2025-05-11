import { HiHome, HiOfficeBuilding } from "react-icons/hi";

import { GrGallery } from "react-icons/gr";

import { GrArticle } from "react-icons/gr";

import { CgProfile } from "react-icons/cg";

import { TiMessages } from "react-icons/ti";

import { TiContacts } from "react-icons/ti";

export interface MenuItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const menuItems: MenuItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard/admins",
        icon: HiHome,
    },

    {
        label: "Properties",
        href: "/dashboard/admins/properties",
        icon: HiOfficeBuilding,
    },


    {
        label: "Gallery",
        href: "/dashboard/admins/gallery",
        icon: GrGallery,
    },

    {
        label: "Blog",
        href: "/dashboard/admins/blog",
        icon: GrArticle,
    },

    {
        label: "Contact",
        href: "/dashboard/admins/contact",
        icon: TiContacts,
    },

    {
        label: "Message",
        href: "/dashboard/admins/message",
        icon: TiMessages,
    },

    {
        label: "Profile",
        href: "/dashboard/admins/profile",
        icon: CgProfile,
    },

    {
        label: "Home",
        href: "/",
        icon: HiHome,
    },
]; 