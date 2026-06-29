"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function UserSync() {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user) return;

    fetch(`${SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: "user",
      }),
    });
  }, [session]);

  return null;
}
