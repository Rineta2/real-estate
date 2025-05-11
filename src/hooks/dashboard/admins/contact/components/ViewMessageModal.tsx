import { HiX, HiMail, HiPhone, HiChatAlt2, HiCalendar } from 'react-icons/hi'

import { Modal, Button } from 'flowbite-react'

import { useState, useEffect } from 'react'

import { ViewMessageModalProps } from '@/hooks/dashboard/admins/contact/types/Contact'

export default function ViewMessageModal({ selectedMessage, repliedMessages, onReply, onClose }: ViewMessageModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (selectedMessage) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [selectedMessage]);

    if (!selectedMessage) return null;

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    const handleReply = () => {
        setIsOpen(false);
        onReply();
    };

    return (
        <Modal show={isOpen} size="2xl" onClose={handleClose}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0 p-6 rounded-t-lg">
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h3 className="font-bold text-2xl md:text-3xl tracking-tight">
                                    {selectedMessage.fullName}
                                </h3>
                                <p className="text-blue-100 text-sm mt-2 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${selectedMessage.status === 'read'
                                        ? 'bg-green-400'
                                        : 'bg-yellow-400'
                                        }`}></span>
                                    {selectedMessage.status === 'read' ? 'Read message' : 'New message'}
                                </p>
                            </div>
                            <Button color="alternative" size="xs" className="bg-white/10 hover:bg-white/20" onClick={handleClose}>
                                <HiX className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <HiMail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-gray-900 font-medium mt-1">{selectedMessage.email}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-4 hover:bg-gray-100/80 transition-colors">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <HiPhone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Phone</p>
                                        <p className="text-gray-900 font-medium mt-1">{selectedMessage.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100/80 transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <HiChatAlt2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Message</p>
                                    </div>
                                </div>
                                <p className="text-gray-900 whitespace-pre-wrap text-sm leading-relaxed pl-[56px]">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 px-2">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <HiCalendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Sent on</p>
                                    <p className="text-gray-900 font-medium mt-1">
                                        {new Date(selectedMessage.createdAt).toLocaleString('id-ID', {
                                            dateStyle: 'full',
                                            timeStyle: 'short'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 p-6 border-t border-gray-200">
                        {repliedMessages.has(selectedMessage.id) ? (
                            <Button color="success" disabled>
                                Replied
                            </Button>
                        ) : (
                            <Button onClick={handleReply}>
                                Reply
                            </Button>
                        )}
                        <Button color="alternative" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}