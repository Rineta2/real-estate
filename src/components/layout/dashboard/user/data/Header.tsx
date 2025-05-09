import { HiHome } from "react-icons/hi";

import { CgProfile } from "react-icons/cg";

import { TiMessages } from "react-icons/ti";

export const menuItems = [
    {
        label: "Dashboard",
        href: "/dashboard/users",
        icon: HiHome,
    },

    {
        label: "Message",
        href: "/dashboard/users/message",
        icon: TiMessages,
    },

    {
        label: "Profile",
        href: "/dashboard/users/profile",
        icon: CgProfile,
    },

    {
        label: "Home",
        href: "/",
        icon: HiHome,
    },
];
