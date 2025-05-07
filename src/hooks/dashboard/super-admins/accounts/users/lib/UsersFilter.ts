import { useState, useMemo } from "react";

import { UserAccount } from "@/types/Auth";

export function useUsersFilters(users: UserAccount[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    pageCount,
    paginatedUsers,
    itemsPerPage,
    filteredUsers,
  };
}
