
import { FiHome, FiSettings } from "react-icons/fi";

import { FaHistory, FaBookmark } from "react-icons/fa";

export const menuItems = [
    {
        icon: FiHome,
        label: "Dashboard",
        href: "/dashboard/user",
    },

    {
        icon: FaHistory,
        label: "History",
        href: "/dashboard/user/history",
    },

    {
        icon: FaBookmark,
        label: "Bookmarks",
        href: "/dashboard/user/bookmarks",
    },

    {
        icon: FiSettings,
        label: "Pengaturan",
        href: "/dashboard/user/profile",
        subItems: [
            { label: "Profile", href: "/dashboard/user/profile" },
            { label: "Security", href: "/dashboard/user/profile/security" },
        ],
    },

    {
        icon: FiHome,
        label: "Home",
        href: "/",
    },
];
