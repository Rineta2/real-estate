import { HiHome, HiOfficeBuilding } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiPagesFill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { GrArticle } from "react-icons/gr";
import { SiAboutdotme } from "react-icons/si";
import { CgProfile } from "react-icons/cg";

export interface MenuItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    subItems?: {
        label: string;
        href: string;
    }[];
}

export const menuItems: MenuItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard/admins",
        icon: HiHome,
    },
    {
        label: "Layout",
        href: "/dashboard/admins/layout",
        icon: LuLayoutDashboard,
        subItems: [
            {
                label: "Home",
                href: "/dashboard/admins/layout/home",
            },
            {
                label: "Featured",
                href: "/dashboard/admins/layout/featured",
            },
            {
                label: "Your Dream",
                href: "/dashboard/admins/layout/your-dream",
            },
            {
                label: "Faqs",
                href: "/dashboard/admins/layout/faqs",
            },
        ],
    },
    {
        label: "Pages",
        href: "/dashboard/admins/pages",
        icon: RiPagesFill,
        subItems: [
            {
                label: "Banner Contact",
                href: "/dashboard/admins/pages/banner-contact",
            },
            {
                label: "Card Contact",
                href: "/dashboard/admins/pages/card-contact",
            },
        ],
    },
    {
        label: "About",
        href: "/dashboard/admins/about",
        icon: SiAboutdotme,
        subItems: [
            {
                label: "Top About",
                href: "/dashboard/admins/about/top",
            },
            {
                label: "Art Of Living",
                href: "/dashboard/admins/about/art",
            },
            {
                label: "Card About",
                href: "/dashboard/admins/about/card",
            },
            {
                label: "About",
                href: "/dashboard/admins/about/about",
            },
        ],
    },
    {
        label: "Properties",
        href: "/dashboard/admins/properties",
        icon: HiOfficeBuilding,
        subItems: [
            {
                label: "All Properties",
                href: "/dashboard/admins/properties/properties",
            },
            {
                label: "Type",
                href: "/dashboard/admins/properties/type",
            },
            {
                label: "Locations",
                href: "/dashboard/admins/properties/locations",
            },
            {
                label: "Icons",
                href: "/dashboard/admins/properties/icons",
            },
        ],
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
        subItems: [
            {
                label: "All Blog",
                href: "/dashboard/admins/blog/blog",
            },
            {
                label: "Categories",
                href: "/dashboard/admins/blog/categories",
            },
        ],
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