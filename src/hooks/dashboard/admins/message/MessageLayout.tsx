"use client"

import React, { useState, useEffect } from 'react'

import { ref, get, update } from 'firebase/database'

import { collection, getDocs } from 'firebase/firestore'

import { onAuthStateChanged, User } from 'firebase/auth'

import { database, auth, db } from '@/utils/firebase/firebase'

import MessageSkelaton from '@/hooks/dashboard/admins/message/MessageSkelaton'

import { formatPhoneForWhatsApp } from '@/base/helper/FormatPhone'

import { Message, Property, ContactMethodFilter, StatusFilter } from '@/hooks/dashboard/admins/message/types/Message'

import dynamic from 'next/dynamic'

import Card from '@/hooks/dashboard/admins/message/components/Card'

const WhatsappModal = dynamic(() => import('@/hooks/dashboard/admins/message/modal/WhatsappModal'), { ssr: false })

const PhoneModal = dynamic(() => import('@/hooks/dashboard/admins/message/modal/PhoneModal'), { ssr: false })

const Filter = dynamic(() => import('@/hooks/dashboard/admins/message/components/Filter'), { ssr: false })

export default function MessageLayout() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [propertyId, setPropertyId] = useState<string>("all");
    const [contactMethodFilter, setContactMethodFilter] = useState<ContactMethodFilter>('all');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertiesWithMessages, setPropertiesWithMessages] = useState<string[]>([]);
    const [loadingProperties, setLoadingProperties] = useState<boolean>(true);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [showReplyModal, setShowReplyModal] = useState<boolean>(false);
    const [showCallModal, setShowCallModal] = useState<boolean>(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState<string>('');

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // Apply filters whenever messages or filter values change
    useEffect(() => {
        let filtered = messages;

        // Apply contact method filter
        if (contactMethodFilter !== 'all') {
            filtered = filtered.filter(message => message.contactMethod === contactMethodFilter);
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(message => message.status === statusFilter);
        }

        setFilteredMessages(filtered);
    }, [messages, contactMethodFilter, statusFilter]);

    // Fetch property IDs from Firestore and check for messages one by one
    useEffect(() => {
        if (!user) return;

        const fetchProperties = async () => {
            try {
                setLoadingProperties(true);
                const propertiesCollectionName = process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string;
                const propertiesRef = collection(db, propertiesCollectionName);
                const snapshot = await getDocs(propertiesRef);

                if (!snapshot.empty) {
                    // Get all properties from Firestore
                    const allProperties = snapshot.docs.map(doc => ({
                        id: doc.id,
                        slug: doc.data().slug || doc.id,
                        title: doc.data().title,
                        hasMessages: false
                    }));

                    // Check each property for messages individually
                    const propertiesWithMessageStatus = await Promise.all(
                        allProperties.map(async (property) => {
                            try {
                                const propertyMessagesRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${property.slug}`);
                                const propertyMessagesSnapshot = await get(propertyMessagesRef);

                                return {
                                    ...property,
                                    hasMessages: propertyMessagesSnapshot.exists()
                                };
                            } catch {
                                console.log(`Cannot access messages for ${property.slug}`);
                                return property; // Return property without messages flag if access denied
                            }
                        })
                    );

                    // Filter to only properties with messages
                    const filteredProperties = propertiesWithMessageStatus.filter(
                        property => property.hasMessages
                    );

                    // Store the list of property slugs that have messages
                    const slugsWithMessages = filteredProperties.map(p => p.slug);
                    setPropertiesWithMessages(slugsWithMessages);

                    setProperties(filteredProperties);
                } else {
                    console.log("No properties found in Firestore");
                }
            } catch (err) {
                console.error("Error fetching properties:", err);
            } finally {
                setLoadingProperties(false);
            }
        };

        fetchProperties();
    }, [user]);

    // Function to fetch messages for a specific property
    const fetchMessagesForProperty = React.useCallback(async (propSlug: string) => {
        try {
            if (propSlug === "all") {
                // Fetch messages for all properties with messages
                const allMessages: Message[] = [];

                // Using the stored list of property slugs with messages
                for (const slug of propertiesWithMessages) {
                    try {
                        const messagesRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${slug}`);
                        const snapshot = await get(messagesRef);

                        if (snapshot.exists()) {
                            const propertyMessages = snapshot.val();

                            Object.keys(propertyMessages).forEach(messageId => {
                                allMessages.push({
                                    id: messageId,
                                    propertyId: slug,
                                    ...propertyMessages[messageId]
                                });
                            });
                        }
                    } catch (error) {
                        console.error(`Error fetching messages for property ${slug}:`, error);
                        // Continue with other properties even if one fails
                    }
                }

                // Sort messages by timestamp (newest first)
                allMessages.sort((a, b) => b.timestamp - a.timestamp);
                setMessages(allMessages);
            } else {
                // Get reference to a specific property's messages
                const messagesRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${propSlug}`);
                const snapshot = await get(messagesRef);

                if (snapshot.exists()) {
                    const allMessages: Message[] = [];
                    const propertyMessages = snapshot.val();

                    // Iterate through messages under this propertyId
                    Object.keys(propertyMessages).forEach(messageId => {
                        allMessages.push({
                            id: messageId,
                            propertyId: propSlug,
                            ...propertyMessages[messageId]
                        });
                    });

                    // Sort messages by timestamp (newest first)
                    allMessages.sort((a, b) => b.timestamp - a.timestamp);

                    setMessages(allMessages);
                } else {
                    console.log(`No messages available for property ${propSlug}`);
                    setMessages([]);
                }
            }
        } catch (err) {
            console.error(`Error fetching messages for property ${propSlug}:`, err);
        }
    }, [propertiesWithMessages]);

    // Fetch messages when authenticated and property ID changes
    useEffect(() => {
        if (user && (propertyId === "all" || propertiesWithMessages.includes(propertyId))) {
            fetchMessagesForProperty(propertyId);
        }
    }, [user, propertyId, propertiesWithMessages, fetchMessagesForProperty]);

    // Handle property ID change
    const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPropertyId(e.target.value);
    };

    // Handle contact method filter change
    const handleContactMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setContactMethodFilter(e.target.value as ContactMethodFilter);
    };

    // Handle status filter change
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value as StatusFilter);
    };

    // Function to toggle filter visibility
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Handle opening the reply modal
    const handleOpenReplyModal = (message: Message) => {
        setSelectedMessage(message);
        setReplyText('');
        setShowReplyModal(true);
    };

    // Handle opening the call modal
    const handleOpenCallModal = (message: Message) => {
        setSelectedMessage(message);
        setShowCallModal(true);
    };

    // Handle sending the WhatsApp message
    const handleSendWhatsApp = async () => {
        if (!selectedMessage) return;

        // Format the timestamp to a readable date and time
        const messageDate = new Date(selectedMessage.timestamp);
        const formattedDate = messageDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        const formattedTime = messageDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // WhatsApp formatting using Unicode characters instead of markdown
        const fullMessage =
            `𝗥𝗘𝗔𝗟 𝗘𝗦𝗧𝗔𝗧𝗘\n\n` +
            `𝗣𝗿𝗼𝗽𝗲𝗿𝘁𝘆: ${selectedMessage.propertyId}\n\n` +
            `𝗧𝗮𝗻𝗴𝗮𝗹 𝗣𝗲𝘀𝗮𝗻: ${formattedDate}, ${formattedTime}\n\n` +
            `𝗣𝗲𝘀𝗮𝗻 𝗔𝗻𝗱𝗮:\n"${selectedMessage.message}"\n\n` +
            `𝗕𝗮𝗹𝗮𝘀𝗮𝗻 𝗞𝗮𝗺𝗶:\n${replyText}\n\n` +
            `Terima kasih telah menghubungi kami!`;

        const whatsappLink = `https://wa.me/${formatPhoneForWhatsApp(selectedMessage.phone)}?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');

        try {
            // Update the message status in Firebase
            const messageRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${selectedMessage.propertyId}/${selectedMessage.id}`);
            await update(messageRef, {
                status: 'replied'
            });

            // Update local state
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === selectedMessage.id && msg.propertyId === selectedMessage.propertyId
                        ? { ...msg, status: 'replied' }
                        : msg
                )
            );

            // Also update filtered messages
            setFilteredMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === selectedMessage.id && msg.propertyId === selectedMessage.propertyId
                        ? { ...msg, status: 'replied' }
                        : msg
                )
            );

            console.log(`Message status updated to replied for: ${selectedMessage.id}`);
        } catch (err) {
            console.error("Error updating message status:", err);
        }

        setShowReplyModal(false);
    };

    // Handle making a call and updating status
    const handleMakeCall = async () => {
        if (!selectedMessage) return;

        try {
            // Update the message status in Firebase
            const messageRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${selectedMessage.propertyId}/${selectedMessage.id}`);
            await update(messageRef, {
                status: 'replied'
            });

            // Update local state
            setMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === selectedMessage.id && msg.propertyId === selectedMessage.propertyId
                        ? { ...msg, status: 'replied' }
                        : msg
                )
            );

            // Also update filtered messages
            setFilteredMessages(prevMessages =>
                prevMessages.map(msg =>
                    msg.id === selectedMessage.id && msg.propertyId === selectedMessage.propertyId
                        ? { ...msg, status: 'replied' }
                        : msg
                )
            );

            console.log(`Message status updated to replied for: ${selectedMessage.id}`);

            // Open phone dialer
            window.location.href = `tel:${selectedMessage.phone}`;
        } catch (err) {
            console.error("Error updating message status:", err);
        }

        setShowCallModal(false);
    };

    if (loadingProperties) return <MessageSkelaton />;

    return (
        <section>
            <Filter
                showFilters={showFilters}
                toggleFilters={toggleFilters}
                propertyId={propertyId}
                contactMethodFilter={contactMethodFilter}
                statusFilter={statusFilter}
                properties={properties}
                handlePropertyChange={handlePropertyChange}
                handleContactMethodChange={handleContactMethodChange}
                handleStatusChange={handleStatusChange}
            />

            {filteredMessages.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-gray-100/50 p-4 sm:p-8 text-center">
                    <p className="text-gray-500">No messages found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {filteredMessages.map((message) => (
                        <Card
                            key={`${message.propertyId}-${message.id}`}
                            message={message}
                            propertyId={propertyId}
                            onReply={handleOpenReplyModal}
                            onCall={handleOpenCallModal}
                        />
                    ))}
                </div>
            )}

            {/* Reply Modal */}
            <WhatsappModal
                isOpen={showReplyModal}
                onClose={() => setShowReplyModal(false)}
                selectedMessage={selectedMessage}
                replyText={replyText}
                setReplyText={setReplyText}
                handleSendWhatsApp={handleSendWhatsApp}
            />

            {/* Call Modal */}
            <PhoneModal
                isOpen={showCallModal}
                onClose={() => setShowCallModal(false)}
                selectedMessage={selectedMessage}
                handleMakeCall={handleMakeCall}
            />
        </section>
    )
}