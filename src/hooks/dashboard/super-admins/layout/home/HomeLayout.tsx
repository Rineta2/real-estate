import Link from "next/link";
import { FaPlus } from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";

export default function HomeLayout() {
    return (
        <section className="min-h-full">
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md">
                <div>
                    <h1 className="text-2xl font-bold">Home</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Layout</li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Home</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                        <FaPlus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>
        </section>
    )
}
