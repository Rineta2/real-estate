import { FilterControlsProps } from '@/hooks/dashboard/super-admins/accounts/admins/types/Admins';

export default function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            />
        </div>
    );
}