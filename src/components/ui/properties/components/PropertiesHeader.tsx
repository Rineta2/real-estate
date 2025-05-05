import React from 'react';

import { motion } from 'framer-motion';

export default function PropertiesHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='flex items-center justify-center flex-col gap-8 mb-20'
        >
            <h3 className='text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight'>Based on your location</h3>
            <p className='text-gray-600 text-center max-w-2xl text-lg sm:text-xl'>Some of our picked properties near your location.</p>
        </motion.div>
    );
} 