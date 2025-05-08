"use client"
import React, { useState, useEffect } from 'react'
import { ref, get } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged, User } from 'firebase/auth'
import { database, auth, db } from '../../../../utils/firebase/firebase'

interface Message {
    id: string;
    propertyId: string;
    contactMethod: string;
    message: string;
    name: string;
    phone: string;
    status: string;
    timestamp: number;
}

interface Property {
    id: string;
    slug: string;
    title?: string;
    hasMessages: boolean;
}

export default function MessageLayout() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [propertyId, setPropertyId] = useState<string>("all");
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertiesWithMessages, setPropertiesWithMessages] = useState<string[]>([]);
    const [loadingProperties, setLoadingProperties] = useState<boolean>(true);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // Fetch property IDs from Firestore and check for messages one by one
    useEffect(() => {
        if (!user) return;

        const fetchProperties = async () => {
            try {
                setLoadingProperties(true);
                const propertiesCollectionName = process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES || 'properties';
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
                                const propertyMessagesRef = ref(database, `messages/${property.slug}`);
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
                setError("Failed to load properties");
            } finally {
                setLoadingProperties(false);
            }
        };

        fetchProperties();
    }, [user]);

    // Function to fetch messages for a specific property
    const fetchMessagesForProperty = React.useCallback(async (propSlug: string) => {
        try {
            setLoading(true);
            setError(null);

            if (propSlug === "all") {
                // Fetch messages for all properties with messages
                const allMessages: Message[] = [];

                // Using the stored list of property slugs with messages
                for (const slug of propertiesWithMessages) {
                    try {
                        const messagesRef = ref(database, `messages/${slug}`);
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
                const messagesRef = ref(database, `messages/${propSlug}`);
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
            setError(`Failed to load messages for property ${propSlug}`);
        } finally {
            setLoading(false);
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

    if (!user) return <div>Please log in to view messages</div>;

    if (loadingProperties) return <div>Loading properties...</div>;

    return (
        <div className="messages-container">
            <h2>Messages</h2>

            <div className="property-selector">
                <label htmlFor="property-select">Select Property: </label>
                <select
                    id="property-select"
                    value={propertyId}
                    onChange={handlePropertyChange}
                >
                    <option value="all">All Properties</option>
                    {properties.map(property => (
                        <option key={property.id} value={property.slug}>
                            {property.title || property.slug}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div>Loading messages...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : messages.length === 0 ? (
                <p>No messages found</p>
            ) : (
                <ul className="message-list">
                    {messages.map((message) => (
                        <li key={`${message.propertyId}-${message.id}`} className="message-item">
                            <div className="message-header">
                                <strong>{message.name}</strong> - {message.phone}
                                {propertyId === "all" && (
                                    <span className="property-tag">Property: {message.propertyId}</span>
                                )}
                            </div>
                            <div className="message-content">
                                <p>{message.message}</p>
                            </div>
                            <div className="message-footer">
                                <span>Contact via: {message.contactMethod}</span>
                                <span className={`message-status status-${message.status}`}>
                                    Status: {message.status}
                                </span>
                                <span className="message-time">
                                    {new Date(message.timestamp).toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}