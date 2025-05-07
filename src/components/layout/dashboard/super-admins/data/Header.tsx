import { HiHome, HiOfficeBuilding } from "react-icons/hi";

import { LuLayoutDashboard } from "react-icons/lu";

import { RiPagesFill } from "react-icons/ri";

import { GrGallery } from "react-icons/gr";

import { GrArticle } from "react-icons/gr";

import { SiAboutdotme } from "react-icons/si";

import { CgProfile } from "react-icons/cg";

import { MdManageAccounts } from "react-icons/md";

export const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard/super-admins",
    icon: HiHome,
  },

  {
    label: "Layout",
    href: "/dashboard/super-admins/layout",
    icon: LuLayoutDashboard,
    subItems: [
      {
        label: "Home",
        href: "/dashboard/super-admins/layout/home",
      },

      {
        label: "Featured",
        href: "/dashboard/super-admins/layout/featured",
      },

      {
        label: "Your Dream",
        href: "/dashboard/super-admins/layout/your-dream",
      },

      {
        label: "Faqs",
        href: "/dashboard/super-admins/layout/faqs",
      },
    ],
  },

  {
    label: "Pages",
    href: "/dashboard/super-admins/pages",
    icon: RiPagesFill,
    subItems: [
      {
        label: "Banner Contact",
        href: "/dashboard/super-admins/pages/banner-contact",
      },

      {
        label: "Card Contact",
        href: "/dashboard/super-admins/pages/card-contact",
      },
    ],
  },

  {
    label: "About",
    href: "/dashboard/super-admins/about",
    icon: SiAboutdotme,
    subItems: [
      {
        label: "Top About",
        href: "/dashboard/super-admins/about/top",
      },

      {
        label: "Art Of Living",
        href: "/dashboard/super-admins/about/art",
      },

      {
        label: "Card About",
        href: "/dashboard/super-admins/about/card",
      },

      {
        label: "About",
        href: "/dashboard/super-admins/about/about",
      },
    ],
  },

  {
    label: "Properties",
    href: "/dashboard/super-admins/properties",
    icon: HiOfficeBuilding,
    subItems: [
      {
        label: "All Properties",
        href: "/dashboard/super-admins/properties/properties",
      },

      {
        label: "Type",
        href: "/dashboard/super-admins/properties/type",
      },

      {
        label: "Locations",
        href: "/dashboard/super-admins/properties/locations",
      },

      {
        label: "Icons",
        href: "/dashboard/super-admins/properties/icons",
      },
    ],
  },

  {
    label: "Gallery",
    href: "/dashboard/super-admins/gallery",
    icon: GrGallery,
  },

  {
    label: "Blog",
    href: "/dashboard/super-admins/blog",
    icon: GrArticle,
    subItems: [
      {
        label: "All Blog",
        href: "/dashboard/super-admins/blog/blog",
      },

      {
        label: "Categories",
        href: "/dashboard/super-admins/blog/categories",
      },
    ],
  },

  {
    label: "Accounts",
    href: "/dashboard/super-admins/accounts",
    icon: MdManageAccounts,
    subItems: [
      {
        label: "Super Admins",
        href: "/dashboard/super-admins/accounts/super-admins",
      },
      {
        label: "Admins",
        href: "/dashboard/super-admins/accounts/admins",
      },
      {
        label: "Users",
        href: "/dashboard/super-admins/accounts/users",
      },
    ],
  },

  {
    label: "Profile",
    href: "/dashboard/super-admins/profile",
    icon: CgProfile,
  },

  {
    label: "Home",
    href: "/",
    icon: HiHome,
  },
];
