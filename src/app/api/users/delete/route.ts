import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/admins";

export async function DELETE(request: Request) {
  try {
    const { uid } = await request.json();

    // Delete from Firebase Auth
    await auth.deleteUser(uid);

    // Delete from Firestore
    await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(uid)
      .delete();

    return NextResponse.json({ message: "Users deleted successfully" });
  } catch (error) {
    console.error("Error deleting Users:", error);
    return NextResponse.json(
      { error: "Failed to delete Users" },
      { status: 500 }
    );
  }
}
