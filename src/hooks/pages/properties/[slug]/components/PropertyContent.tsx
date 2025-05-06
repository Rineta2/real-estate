import React from 'react';

interface PropertyContentProps {
    content: string;
}

export default function PropertyContent({ content }: PropertyContentProps) {
    if (!content) return null;

    return (
        <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden p-3 sm:p-4 mt-6 sm:mt-8 md:mt-10'>
            <h2 className="font-semibold text-base sm:text-lg mb-2">Content</h2>
            <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                prose-headings:text-gray-900 
                prose-p:text-gray-700 
                prose-strong:text-gray-900 
                prose-a:text-blue-600 hover:prose-a:text-blue-800
                
                [&_h3]:text-base sm:[&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 sm:[&_h3]:mb-3 [&_h3]:mt-3 sm:[&_h3]:mt-4 md:[&_h3]:mt-6
                
                [&_p]:mb-2 sm:[&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base
                [&_p:empty]:hidden
                
                [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-1.5 sm:[&_ol]:space-y-2 [&_ol]:my-2 sm:[&_ol]:my-3
                [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-1.5 sm:[&_ul]:space-y-2 [&_ul]:my-2 sm:[&_ul]:my-3
                
                [&_li]:relative [&_li]:pl-3 sm:[&_li]:pl-4 md:[&_li]:pl-5 [&_li]:text-gray-700 [&_li]:text-sm sm:[&_li]:text-base
                
                [&_li[data-list=bullet]]:before:content-["•"]
                [&_li[data-list=bullet]]:before:absolute
                [&_li[data-list=bullet]]:before:left-0
                [&_li[data-list=bullet]]:before:text-gray-500
                [&_li[data-list=bullet]]:before:font-bold
                [&_li[data-list=bullet]]:before:text-sm sm:[&_li[data-list=bullet]]:before:text-base md:[&_li[data-list=bullet]]:before:text-lg
                
                [&_li[data-list=ordered]]:before:absolute
                [&_li[data-list=ordered]]:before:left-0
                [&_li[data-list=ordered]]:before:text-gray-700
                [&_li[data-list=ordered]]:before:font-semibold
                [&_li[data-list=ordered]]:before:counter-reset
                [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                
                [&_strong]:text-gray-900 [&_strong]:font-semibold
                
                [&_.ql-ui]:hidden
                
                [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                
                [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:my-3 sm:[&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:text-sm sm:[&_blockquote]:text-base
                
                [&_img]:my-3 sm:[&_img]:my-4 [&_img]:rounded-lg [&_img]:shadow-md
                
                [&_pre]:bg-gray-100 [&_pre]:p-2 sm:[&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                [&_code]:bg-gray-100 [&_code]:px-1.5 sm:[&_code]:px-2 [&_code]:py-0.5 sm:[&_code]:py-1 [&_code]:rounded [&_code]:text-xs sm:[&_code]:text-sm
                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 sm:[&_table]:my-4
                [&_th]:bg-gray-100 [&_th]:p-1.5 sm:[&_th]:p-2 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:text-xs sm:[&_th]:text-sm
                [&_td]:p-1.5 sm:[&_td]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:text-xs sm:[&_td]:text-sm
                
                [&_hr]:my-4 sm:[&_hr]:my-6 [&_hr]:border-gray-200
                
                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:my-4 [&_iframe]:shadow-md'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            </div>
        </div>
    );
} 