"use client"

import React, { useEffect, useState } from 'react'

import { ref, onValue, query, orderByChild, update } from 'firebase/database'

import { database } from '@/utils/firebase/firebase'

import { Contacts } from '@/hooks/dashboard/admins/contact/types/Contact'

import ContactSkelaton from "@/hooks/dashboard/admins/contact/ContactSkelaton"

import ContactCard from '@/hooks/dashboard/admins/contact/components/ContactCard'

import ViewMessageModal from '@/hooks/dashboard/admins/contact/components/ViewMessageModal'

import ReplyModal from '@/hooks/dashboard/admins/contact/components/ReplyModal'

import { toast } from 'react-hot-toast'

import { FaFilter } from 'react-icons/fa'

export default function ContactLayout() {
    const [contacts, setContacts] = useState<Contacts[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState<Contacts | null>(null)
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
    const [replyMessage, setReplyMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [repliedMessages, setRepliedMessages] = useState<Set<string>>(new Set())
    const [showFilter, setShowFilter] = useState(false)
    const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all')

    useEffect(() => {
        const contactsRef = ref(database, process.env.NEXT_PUBLIC_REALTIME_CONTACT)
        const contactsQuery = query(contactsRef, orderByChild('createdAt'))

        const unsubscribe = onValue(contactsQuery, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const contactsArray = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...(value as Omit<Contacts, 'id'>)
                })).reverse()

                setContacts(contactsArray)
            } else {
                setContacts([])
            }
            setLoading(false)
        }, (error) => {
            console.error('Error fetching contacts:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleViewMessage = async (message: Contacts) => {
        setSelectedMessage(message)

        if (message.status === 'unread') {
            const messageRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_CONTACT}/${message.id}`)
            try {
                await update(messageRef, {
                    ...message,
                    status: 'read'
                })
            } catch (error) {
                console.error('Error updating status:', error)
            }
        }
    }

    const handleReply = async () => {
        if (!selectedMessage || !replyMessage.trim()) return;

        setIsSending(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: selectedMessage.email,
                    subject: `Re: Message from ${selectedMessage.fullName}`,
                    message: replyMessage,
                    originalMessage: selectedMessage
                }),
            });

            const data = await response.json();
            if (data.success) {
                setReplyMessage('');
                setIsReplyModalOpen(false);
                setRepliedMessages(prev => new Set([...prev, selectedMessage.id]));
                toast.success('Reply sent successfully!', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        borderRadius: '12px',
                    },
                    icon: '✉️',
                });
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error sending reply:', error);
            toast.error('Failed to send reply. Please try again.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#EF4444',
                    color: '#fff',
                    borderRadius: '12px',
                },
            });
        } finally {
            setIsSending(false);
        }
    };

    const handleOpenReply = () => {
        setIsReplyModalOpen(true);
    };

    const handleCloseReply = () => {
        setIsReplyModalOpen(false);
        setReplyMessage('');
    };

    const handleCloseViewMessage = () => {
        setSelectedMessage(null);
    };

    const filteredContacts = contacts.filter(contact => {
        if (statusFilter === 'all') return true;
        return contact.status === statusFilter;
    });

    if (loading) {
        return <ContactSkelaton />
    }

    return (
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-3 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6">
                <div className="mb-3 sm:mb-0">
                    <h1 className="text-xl sm:text-2xl font-bold">Contact</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-xs sm:text-sm font-medium"><a href="/dashboard/admins">Dashboard</a></li>
                        <li className="text-xs sm:text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className="text-xs sm:text-sm font-medium">Contact</li>
                    </ul>
                </div>

                <div className="w-full sm:w-auto relative">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="w-full sm:w-auto bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-md flex items-center justify-center sm:justify-start gap-2"
                    >
                        <FaFilter className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-sm sm:text-base">Show Filter</span>
                    </button>

                    {showFilter && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setShowFilter(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === 'all' ? 'bg-gray-100' : ''}`}
                                >
                                    All Messages
                                </button>
                                <button
                                    onClick={() => {
                                        setStatusFilter('unread');
                                        setShowFilter(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === 'unread' ? 'bg-gray-100' : ''}`}
                                >
                                    Unread Messages
                                </button>
                                <button
                                    onClick={() => {
                                        setStatusFilter('read');
                                        setShowFilter(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === 'read' ? 'bg-gray-100' : ''}`}
                                >
                                    Read Messages
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map((message) => (
                    <ContactCard
                        key={message.id}
                        message={message}
                        onViewMessage={handleViewMessage}
                        repliedMessages={repliedMessages}
                    />
                ))}
            </div>

            <ViewMessageModal
                selectedMessage={selectedMessage}
                repliedMessages={repliedMessages}
                onClose={handleCloseViewMessage}
                onReply={handleOpenReply}
            />

            <ReplyModal
                isOpen={isReplyModalOpen}
                selectedMessage={selectedMessage}
                replyMessage={replyMessage}
                isSending={isSending}
                onReplyChange={setReplyMessage}
                onClose={handleCloseReply}
                onSend={handleReply}
            />
        </section>
    )
}