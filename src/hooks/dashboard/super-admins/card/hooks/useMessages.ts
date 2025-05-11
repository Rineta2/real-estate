import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "@/utils/firebase/firebase";
import { toast } from "react-hot-toast";
import { Message } from "../types/dashboard";
import { Properties } from "../../properties/properties/types/properties";
import { User } from "firebase/auth";

export function useMessages(user: User | null, properties: Properties[]) {
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchRecentMessages = async () => {
      if (!user) return;

      try {
        const allMessages: Message[] = [];

        for (const property of properties) {
          try {
            const messagesRef = ref(
              database,
              `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${property.slug}`
            );
            const messagesSnapshot = await get(messagesRef);

            if (messagesSnapshot.exists()) {
              const messages = messagesSnapshot.val();
              Object.keys(messages).forEach((messageId) => {
                const messageData = messages[messageId];
                allMessages.push({
                  id: messageId,
                  propertyId: property.slug,
                  ...messageData,
                });
              });
            }
          } catch (error) {
            console.warn(`Cannot access messages for ${property.slug}:`, error);
          }
        }

        // Sort messages by timestamp (newest first) and take the most recent 10
        const sortedMessages = allMessages
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 10);

        setRecentMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching recent messages:", error);
        toast.error("Failed to load recent messages");
      }
    };

    fetchRecentMessages();
  }, [user, properties]);

  return { recentMessages };
}
