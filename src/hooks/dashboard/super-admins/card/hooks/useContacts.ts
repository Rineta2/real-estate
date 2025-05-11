import { useState, useEffect } from "react";
import { ref, query, orderByChild, onValue } from "firebase/database";
import { database } from "@/utils/firebase/firebase";
import { toast } from "react-hot-toast";
import { ContactMessage, FirebaseContactMessage } from "../types/dashboard";
import { User } from "firebase/auth";

export function useContacts(user: User | null) {
  const [recentContacts, setRecentContacts] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetchRecentContacts = async () => {
      if (!user) return;

      try {
        const contactsRef = ref(
          database,
          process.env.NEXT_PUBLIC_REALTIME_CONTACT
        );
        const contactsQuery = query(contactsRef, orderByChild("createdAt"));

        const unsubscribe = onValue(
          contactsQuery,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const contactsArray = Object.entries(data)
                .map(([id, value]) => ({
                  id,
                  ...(value as FirebaseContactMessage),
                }))
                .reverse();

              setRecentContacts(contactsArray.slice(0, 10));
            } else {
              setRecentContacts([]);
            }
          },
          (error) => {
            console.error("Error fetching contacts:", error);
            toast.error("Failed to load recent contacts");
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching recent contacts:", error);
        toast.error("Failed to load recent contacts");
      }
    };

    fetchRecentContacts();
  }, [user]);

  return { recentContacts };
}
