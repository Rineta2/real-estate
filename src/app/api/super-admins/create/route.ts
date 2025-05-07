import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/admins";

import { Role } from "@/types/Auth";

interface FirebaseErrorType {
  code?: string;
  message: string;
}

interface CreateAdminRequest {
  email: string;
  password: string;
  displayName: string;
  role: Role.SUPER_ADMIN;
}

export async function POST(request: Request) {
  try {
    const { email, password, displayName, role } =
      (await request.json()) as CreateAdminRequest;

    // Validate role
    if (role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 }
      );
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });

    // Add user data to Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(userRecord.uid)
      .set({
        uid: userRecord.uid,
        email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        photoURL: "",
        phoneNumber: "",
      });

    return NextResponse.json({
      message: `${
        role === Role.SUPER_ADMIN ? "Super Admins" : "Super Admins"
      } created successfully`,
    });
  } catch (error: unknown) {
    console.error("Error creating admin:", error);

    const firebaseError = error as FirebaseErrorType;
    const errorMessage = firebaseError.message || "Failed to create admin";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
