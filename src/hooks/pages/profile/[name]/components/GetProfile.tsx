import { getDocs } from "firebase/firestore";

import { FormatSlug } from "@/base/helper/FormatSlug";

import { db } from "@/utils/firebase/firebase";

import { collection } from "firebase/firestore";

import { UserAccount } from "@/types/Auth";

import { FirestoreTimestamp } from "@/hooks/pages/profile/[name]/types/ProfileDetails";

type TimestampInput = Date | FirestoreTimestamp | { seconds: number; nanoseconds: number } | null | undefined;

const convertToFirestoreTimestamp = (timestamp: TimestampInput): FirestoreTimestamp => {
    if (timestamp instanceof Date) {
        return {
            seconds: Math.floor(timestamp.getTime() / 1000),
            nanoseconds: 0
        };
    }
    // If it's already a Firestore timestamp, return it as is
    if (timestamp && typeof timestamp.seconds === 'number') {
        return timestamp as FirestoreTimestamp;
    }
    // Fallback to current timestamp if invalid
    const now = Math.floor(Date.now() / 1000);
    return {
        seconds: now,
        nanoseconds: 0
    };
};

export default async function getProfile(slug: string) {
    try {
        const accountsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string);
        const querySnapshot = await getDocs(accountsRef);

        const user = querySnapshot.docs.find(doc => {
            const data = doc.data();
            return FormatSlug(data.displayName) === slug;
        });

        if (!user) {
            return null;
        }

        const userData = user.data() as UserAccount;

        // Convert timestamps to FirestoreTimestamp format
        const convertedData = {
            ...userData,
            createdAt: convertToFirestoreTimestamp(userData.createdAt),
            updatedAt: convertToFirestoreTimestamp(userData.updatedAt)
        };

        return convertedData;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}