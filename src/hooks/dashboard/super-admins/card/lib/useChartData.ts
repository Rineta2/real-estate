import { useState, useEffect, useCallback } from "react";

import { collection, getDocs } from "firebase/firestore";

import { ref, get } from "firebase/database";

import { db, database } from "@/utils/firebase/firebase";

import { format } from "date-fns";

import { toast } from "react-hot-toast";

import { ChartData } from "@/hooks/dashboard/super-admins/card/types/dashboard";

import { initialChartData } from "@/hooks/dashboard/super-admins/card/config/chart";

import { Properties } from "@/hooks/dashboard/super-admins/properties/properties/types/properties";

import { UserAccount, Role } from "@/types/Auth";

import { User } from "firebase/auth";

export function useChartData(user: User | null) {
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Properties[]>([]);
  const [userStats, setUserStats] = useState({
    total: 0,
    superAdmins: 0,
    admins: 0,
    regularUsers: 0,
  });

  // Helper function to get date range for a month
  const getMonthDateRange = useCallback((monthsAgo: number) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsAgo);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);
    endDate.setHours(23, 59, 59, 999);

    return { startDate, endDate };
  }, []);

  // Fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const months = 6;
        const labels: string[] = [];
        const propertyData: number[] = [];
        const inquiryData: number[] = [];
        const userData: number[] = [];

        // Generate labels for the selected time range
        for (let i = months - 1; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          labels.push(format(date, "MMM"));
        }

        // Fetch properties data
        const propertiesRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string
        );
        const propertiesSnapshot = await getDocs(propertiesRef);
        const propertiesList = propertiesSnapshot.docs.map((doc) => ({
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Properties[];
        setProperties(propertiesList);

        // Fetch users data
        const usersRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string
        );
        const usersSnapshot = await getDocs(usersRef);
        const usersList = usersSnapshot.docs.map((doc) => ({
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as UserAccount[];

        // Calculate user statistics
        const stats = {
          total: usersList.length,
          superAdmins: usersList.filter((u) => u.role === Role.SUPER_ADMIN)
            .length,
          admins: usersList.filter((u) => u.role === Role.ADMIN).length,
          regularUsers: usersList.filter((u) => u.role === Role.USER).length,
        };
        setUserStats(stats);

        // Count data for each month
        for (let i = months - 1; i >= 0; i--) {
          const { startDate, endDate } = getMonthDateRange(i);

          // Count properties
          const propertiesInMonth = propertiesList.filter(
            (property) =>
              property.createdAt &&
              property.createdAt >= startDate &&
              property.createdAt <= endDate
          ).length;
          propertyData.push(propertiesInMonth);

          // Count new users
          const usersInMonth = usersList.filter(
            (user) =>
              user.createdAt &&
              user.createdAt >= startDate &&
              user.createdAt <= endDate
          ).length;
          userData.push(usersInMonth);

          // Initialize inquiry data
          inquiryData.push(0);
        }

        // Fetch messages data
        try {
          const allProperties = propertiesList.map((property) => ({
            id: property.id,
            slug: property.slug || property.id,
            title: property.title,
          }));

          // Reset inquiry data
          inquiryData.fill(0);

          // Count inquiries for each month
          for (let i = months - 1; i >= 0; i--) {
            const { startDate, endDate } = getMonthDateRange(i);
            let inquiriesInMonth = 0;

            for (const property of allProperties) {
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
                    const messageDate = new Date(messageData.timestamp);
                    if (messageDate >= startDate && messageDate <= endDate) {
                      inquiriesInMonth++;
                    }
                  });
                }
              } catch (error) {
                console.warn(
                  `Cannot access messages for ${property.slug}:`,
                  error
                );
              }
            }
            inquiryData[i] = inquiriesInMonth;
          }
        } catch (error) {
          console.warn("Could not fetch messages data:", error);
          toast.error(
            "Unable to load inquiry data. Showing only property listings and user data."
          );
        }

        setChartData((prev) => ({
          ...prev,
          labels,
          datasets: [
            {
              ...prev.datasets[0],
              data: propertyData,
            },
            {
              ...prev.datasets[1],
              data: inquiryData,
            },
            {
              ...prev.datasets[2],
              data: userData,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching chart data:", error);
        toast.error("Failed to load chart data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [user, getMonthDateRange]);

  return {
    chartData,
    isLoading,
    properties,
    userStats,
  };
}
