"use client"

import { useAuth } from '@/utils/context/AuthContext';

import { Role } from '@/types/Auth';

import SuperAdminsSkelaton from '@/hooks/dashboard/super-admins/accounts/super-admins/SuperAdminsSkelaton';

import { Pagination } from '@/base/helper/Pagination';

import UserTable from '@/hooks/dashboard/super-admins/accounts/super-admins/components/SuperAdminsTable';

import UserFormModal from '@/hooks/dashboard/super-admins/accounts/super-admins/modal/ContentModal';

import DeleteConfirmationModal from '@/hooks/dashboard/super-admins/accounts/super-admins/modal/DeleteModal';

import { useSuperAdminsManagement } from '@/hooks/dashboard/super-admins/accounts/super-admins/lib/SuperAdminsManagement';

import { useSuperAdminsFilters } from '@/hooks/dashboard/super-admins/accounts/super-admins/lib/SuperAdminsFilter';

import { AcountControls } from '@/hooks/dashboard/super-admins/accounts/super-admins/lib/AccountControls';

import FilterControls from '@/hooks/dashboard/super-admins/accounts/super-admins/components/FilterControls';

export default function AdminContent() {
    const { user } = useAuth();
    const {
        users,
        isLoading,
        isSubmitting,
        deletingId,
        handleModalSubmit,
        handleDeleteUser
    } = useSuperAdminsManagement();

    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        pageCount,
        paginatedUsers,
    } = useSuperAdminsFilters(users);

    const {
        showModal,
        setShowModal,
        modalMode,
        formData,
        setFormData,
        showDeleteModal,
        userToDelete,
        handleEditClick,
        handleCreateClick,
        handleDeleteClick,
        closeModals
    } = AcountControls();

    if (isLoading) return <SuperAdminsSkelaton />;
    if (!user || user.role !== Role.SUPER_ADMIN) {
        return <div>Anda tidak memiliki akses ke halaman ini</div>;
    }

    return (
        <section>
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-300 p-4 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Super Admins
                        </h1>
                        <p className='text-gray-500'>
                            Manage and track your accounts
                        </p>
                    </div>

                    <button
                        onClick={handleCreateClick}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Super Admin
                    </button>
                </div>
            </div>

            <FilterControls
                filters={{ searchTerm }}
                onFilterChange={({ searchTerm }) => {
                    if (searchTerm !== undefined) setSearchTerm(searchTerm);
                }}
            />

            <UserTable
                users={paginatedUsers}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                deletingId={deletingId}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
            />

            <UserFormModal
                showModal={showModal}
                modalMode={modalMode}
                formData={formData}
                isSubmitting={isSubmitting}
                onSubmit={() => {
                    handleModalSubmit(modalMode, formData).then(success => {
                        if (success) setShowModal(false);
                    });
                }}
                onClose={closeModals}
                setFormData={setFormData}
            />

            <DeleteConfirmationModal
                show={showDeleteModal}
                user={userToDelete}
                isDeleting={!!deletingId}
                onConfirm={(uid) => {
                    handleDeleteUser(uid).then(success => {
                        if (success) closeModals();
                    });
                }}
                onClose={closeModals}
            />
        </section>
    );
}