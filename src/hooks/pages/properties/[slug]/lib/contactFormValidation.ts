import { z } from "zod";

import { database } from "@/utils/firebase/firebase";

import { ref, set, get, query, orderByChild, equalTo } from "firebase/database";

// Define the form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  phone: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit"),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(500, "Pesan maksimal 500 karakter"),
  contactMethod: z.enum(["whatsapp", "phone"], {
    errorMap: () => ({ message: "Pilih metode kontak" }),
  }),
});

// Infer the type from the schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Define message type
interface MessageData {
  name: string;
  phone: string;
  message: string;
  contactMethod: "whatsapp" | "phone";
  timestamp: number;
  status: "pending" | "read" | "replied";
}

// Validation function
export const validateContactForm = (data: ContactFormData) => {
  console.log("Validating form data:", data);

  try {
    const validatedData = contactFormSchema.parse(data);
    console.log("Validation passed:", validatedData);
    return { success: true, data: validatedData };
  } catch (error) {
    console.error("Validation error:", error);
    if (error instanceof z.ZodError) {
      const fieldErrors: Partial<ContactFormData> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          const fieldName = err.path[0].toString();
          if (fieldName === "contactMethod") {
            fieldErrors.contactMethod = err.message as
              | "whatsapp"
              | "phone"
              | undefined;
          } else {
            fieldErrors[
              fieldName as keyof Omit<ContactFormData, "contactMethod">
            ] = err.message;
          }
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: {} };
  }
};

// Function to check if user has already sent a message for this property
export const checkExistingMessage = async (
  propertyId: string,
  identifier: string
): Promise<boolean> => {
  try {
    const messagesRef = ref(
      database,
      `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${propertyId}`
    );

    try {
      // Check by phone number
      const phoneQuery = query(
        messagesRef,
        orderByChild("phone"),
        equalTo(identifier)
      );
      const phoneSnapshot = await get(phoneQuery);
      return phoneSnapshot.exists();
    } catch (queryError) {
      // If the index is not ready, fall back to fetching all messages
      console.warn("Index not ready, falling back to full fetch:", queryError);
      const snapshot = await get(messagesRef);

      if (snapshot.exists()) {
        const messages = snapshot.val() as Record<string, MessageData>;
        return Object.values(messages).some(
          (message) => message.phone === identifier
        );
      }

      return false;
    }
  } catch (error) {
    console.error("Error checking existing message:", error);
    throw new Error("Gagal memeriksa pesan yang sudah ada");
  }
};

// Function to submit form data to Firebase
export const submitContactForm = async (
  propertyId: string,
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if user has already sent a message by phone
    const identifier = formData.phone;
    const hasExistingMessage = await checkExistingMessage(
      propertyId,
      identifier
    );

    if (hasExistingMessage) {
      return {
        success: false,
        error:
          "Anda sudah mengirim pesan untuk properti ini, silahkan tunggu agent kami menghubungi Anda",
      };
    }

    // Create a new message reference with a unique key
    const newMessageRef = ref(
      database,
      `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${propertyId}/${Date.now()}`
    );

    // Prepare the message data
    const messageData: MessageData = {
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      contactMethod: formData.contactMethod,
      timestamp: Date.now(),
      status: "pending", // pending, read, replied
    };

    console.log("Message data to be saved:", messageData);

    // Save the message
    await set(newMessageRef, messageData);

    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "Terjadi kesalahan saat mengirim pesan",
    };
  }
};
