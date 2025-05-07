import { useState } from "react";

import { UserAccount, Role } from "@/types/Auth";

export function AcountControls() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState({
    uid: "",
    email: "",
    password: "",
    displayName: "",
    role: Role.USER,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserAccount | null>(null);

  const handleEditClick = (users: UserAccount) => {
    setFormData({
      uid: users.uid,
      email: users.email,
      password: "",
      displayName: users.displayName,
      role: users.role,
    });
    setModalMode("edit");
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setFormData({
      uid: "",
      email: "",
      password: "",
      displayName: "",
      role: Role.USER,
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleDeleteClick = (user: UserAccount) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return {
    showModal,
    setShowModal,
    modalMode,
    formData,
    setFormData,
    showDeleteModal,
    setShowDeleteModal,
    userToDelete,
    handleEditClick,
    handleCreateClick,
    handleDeleteClick,
    closeModals,
  };
}
