import { useState, useEffect } from "react";

import { BlogType } from "@/hooks/pages/blog/blog/types/Blog";

import { PropertiesType } from "@/components/ui/properties/types/Properties";

import { UserAccount } from "@/hooks/pages/profile/[name]/types/ProfileDetails";

import { FetchBlog } from "@/hooks/pages/blog/blog/lib/FetchBlog";

import { FetchProperties } from "@/components/ui/properties/utils/FetchProperties";

import getProfile from "@/hooks/pages/profile/[name]/components/GetProfile";

export function useProfileDetails(name: string) {
  const [profile, setProfile] = useState<UserAccount | null>(null);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [properties, setProperties] = useState<PropertiesType[]>([]);
  const [activeTab, setActiveTab] = useState<"blog" | "properties">("blog");
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profileData = await getProfile(name);
        setProfile(profileData);
        if (!profileData) {
          setIsContentLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
        setIsContentLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  useEffect(() => {
    if (!profile) return;

    setIsContentLoading(true);
    const unsubscribeBlogs = FetchBlog((allBlogs) => {
      setBlogs(
        allBlogs.filter((blog) => blog.author.name === profile.displayName)
      );
      setIsContentLoading(false);
    });

    const unsubscribeProperties = FetchProperties((allProperties) => {
      setProperties(
        allProperties.filter(
          (property) => property.author?.name === profile.displayName
        )
      );
      setIsContentLoading(false);
    });

    return () => {
      unsubscribeBlogs();
      unsubscribeProperties();
    };
  }, [profile]);

  return {
    profile,
    blogs,
    properties,
    activeTab,
    setActiveTab,
    isLoading,
    isContentLoading,
    currentPage,
    setCurrentPage,
  };
}
