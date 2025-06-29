"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { TRouteValue } from "@/lib/routes/routes";

interface Props {
  to: TRouteValue;
}

export function ClientReplace({ to }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [to, router]);

  return null;
}
