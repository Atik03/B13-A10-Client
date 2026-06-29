"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function useUserRole() {
  const { data: session, isPending } = authClient.useSession();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      if (isPending) return;

      if (!session?.user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${session.user.email}`,
        );

        const data = await res.json();

        setRole(data?.role || null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, [session, isPending]);

  return {
    role,
    loading,
    session,
    user: session?.user,
  };
}
