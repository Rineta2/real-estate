import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/admins";

import { Role } from "@/types/Auth";

interface FirebaseErrorType {
  code?: string;
  message: string;
}

interface CreateUsersRequest {
  email: string;
  password: string;
  displayName: string;
  role: Role.USER;
}

export async function POST(request: Request) {
  try {
    const { email, password, displayName, role } =
      (await request.json()) as CreateUsersRequest;

    // Validate role
    if (role !== Role.USER) {
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
      message: `${role === Role.USER ? "Users" : "Users"} created successfully`,
    });
  } catch (error: unknown) {
    console.error("Error creating users:", error);

    const firebaseError = error as FirebaseErrorType;
    const errorMessage = firebaseError.message || "Failed to create users";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
