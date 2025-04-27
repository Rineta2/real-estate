import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

import Link from 'next/link'

import { FaPlus } from 'react-icons/fa'

export default function PropertiesLayout() {
    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Gallery</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Properties</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>
        </section>
    )
}
