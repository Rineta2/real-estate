import { HiX } from 'react-icons/hi'

import { Modal, Button, Textarea } from 'flowbite-react'

import { ReplyModalProps } from '@/hooks/dashboard/admins/contact/types/Contact'

export default function ReplyModal({
    isOpen,
    selectedMessage,
    replyMessage,
    isSending,
    onReplyChange,
    onClose,
    onSend
}: ReplyModalProps) {
    if (!selectedMessage) return null;

    return (
        <Modal show={isOpen} size="2xl" onClose={onClose}>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0 p-6 rounded-t-lg">
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <h3 className="font-bold text-2xl md:text-3xl tracking-tight">
                                    Reply to {selectedMessage.fullName}
                                </h3>
                                <p className="text-blue-100 text-sm mt-2">
                                    Replying to: {selectedMessage.email}
                                </p>
                            </div>
                            <Button color="alternative" size="xs" className="bg-white/10 hover:bg-white/20" onClick={onClose}>
                                <HiX className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm font-medium text-gray-500 mb-2">Original Message:</p>
                            <p className="text-gray-700 text-sm">{selectedMessage.message}</p>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Your Reply</label>
                            <Textarea
                                value={replyMessage}
                                onChange={(e) => onReplyChange(e.target.value)}
                                placeholder="Type your reply here..."
                                rows={6}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 p-6 border-t border-gray-200">
                        <Button color="alternative" onClick={onClose} disabled={isSending}>
                            Cancel
                        </Button>
                        <Button
                            onClick={onSend}
                            disabled={!replyMessage.trim() || isSending}
                            color={replyMessage.trim() && !isSending ? "primary" : "alternative"}
                        >
                            {isSending ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                'Send Reply'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}