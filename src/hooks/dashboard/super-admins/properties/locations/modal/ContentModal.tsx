import React, { useState } from 'react';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/properties/locations/types/schema';

export const ContentModal: React.FC<ContentModalProps> = ({
    isEditing,
    formData,
    setFormData,
    handleSubmit,
    isSubmitting,
    onClose
}) => {
    const [newCity, setNewCity] = useState('');

    const handleAddCity = () => {
        if (newCity.trim()) {
            setFormData({
                ...formData,
                city: [...formData.city, { city: newCity.trim() }]
            });
            setNewCity('');
        }
    };

    const handleRemoveCity = (index: number) => {
        setFormData({
            ...formData,
            city: formData.city.filter((_, i) => i !== index)
        });
    };

    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {isEditing ? 'Edit Property Locations' : 'Create New Property Locations'}
                                </h3>
                                <p className="text-sm text-gray-500">Fill in the information below to {isEditing ? 'update' : 'create'} your property locations</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }} className="space-y-6">
                            {/* Form Fields */}
                            <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                <div className="form-control flex flex-col gap-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Provinsi</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                        value={formData.province}
                                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                        placeholder="Enter province name"
                                    />
                                </div>

                                <div className="form-control flex flex-col gap-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Cities</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                            value={newCity}
                                            onChange={(e) => setNewCity(e.target.value)}
                                            placeholder="Enter city name"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddCity}
                                            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {formData.city.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {formData.city.map((city, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100">
                                                    <span className="text-gray-700">{city.city}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveCity(index)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md font-medium"
                                    disabled={isSubmitting}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-indigo-100 hover:shadow-lg font-medium flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving Changes...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{isEditing ? 'Save Changes' : 'Create'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
};