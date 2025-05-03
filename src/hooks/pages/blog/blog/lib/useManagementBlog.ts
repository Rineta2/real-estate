import { useState, useEffect } from "react";

import { BlogType } from "@/hooks/pages/blog/blog/types/Blog";

import { FetchBlog } from "@/hooks/pages/blog/blog/lib/FetchBlog";

export function useManagementBlog() {
  const [blog, setBlog] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("View All");
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const unsubscribe = FetchBlog((newBlog) => {
      const sortedBlog = newBlog.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBlog(sortedBlog);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Computed values
  const filteredBlog =
    selectedCategory === "View All"
      ? blog
      : blog.filter((blog) => blog.category === selectedCategory);

  const topBlog = blog[0];
  const otherBlog = filteredBlog.filter((blog) => blog !== topBlog);
  const paginatedBlog = otherBlog.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(otherBlog.length / ITEMS_PER_PAGE);

  return {
    // State
    blog,
    loading,
    selectedCategory,
    currentPage,
    // Computed values
    topBlog,
    paginatedBlog,
    totalPages,
    // Handlers
    setSelectedCategory,
    handlePageChange,
  };
}
