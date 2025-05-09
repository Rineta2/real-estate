import { NextResponse } from "next/server";
import { auth } from "@/utils/firebase/admins";
import { cookies } from "next/headers";

// Set session expiration to 5 days
const SESSION_EXPIRATION_DAYS = 5;

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "ID token is required" },
        { status: 400 }
      );
    }

    // Verify the Firebase ID token
    await auth.verifyIdToken(idToken);

    // Create session cookie
    const expiresIn = SESSION_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiresIn / 1000, // Convert to seconds
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 401 }
    );
  }
}

// Endpoint to verify session and get user data
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    return NextResponse.json({
      authenticated: true,
      uid: decodedClaims.uid,
    });
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
