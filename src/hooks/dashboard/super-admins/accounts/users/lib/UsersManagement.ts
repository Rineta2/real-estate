import { useState, useEffect } from "react";

import { UserAccount } from "@/types/Auth";

import { usersService } from "@/hooks/dashboard/super-admins/accounts/users/lib/usersService";

import { UserFormData } from "@/hooks/dashboard/super-admins/accounts/users/types/Users";

import toast from "react-hot-toast";

export function useUsersManagement() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const allUsers = await usersService.fetchUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal mengambil data admins");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleModalSubmit = async (
    modalMode: "create" | "edit",
    formData: UserFormData
  ) => {
    try {
      setIsSubmitting(true);
      if (modalMode === "create") {
        await usersService.createUser({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          role: formData.role,
        });
      } else {
        await usersService.updateUser({
          uid: formData.uid,
          email: formData.email,
          displayName: formData.displayName,
          ...(formData.password && { password: formData.password }),
        });
      }

      toast.success(
        `Users berhasil ${
          modalMode === "create" ? "ditambahkan" : "diperbarui"
        }`
      );
      await fetchUsers();
      return true;
    } catch {
      toast.error(
        `Gagal ${modalMode === "create" ? "menambahkan" : "memperbarui"} Users`
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (uid: string) => {
    try {
      setDeletingId(uid);
      await usersService.deleteUser(uid);
      toast.success("Users berhasil dihapus");
      await fetchUsers();
      return true;
    } catch {
      toast.error("Gagal menghapus Users");
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    users,
    isLoading,
    isSubmitting,
    deletingId,
    handleModalSubmit,
    handleDeleteUser,
    fetchUsers,
  };
}
