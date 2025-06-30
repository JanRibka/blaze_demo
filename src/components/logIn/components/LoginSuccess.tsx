"use client";

import { ClientReplace } from "@/components/clientReplace/ClientReplace";

import type { LoginSuccessProps } from "../types";

export const LoginSuccess = ({ redirectPath }: LoginSuccessProps) => {
  return <ClientReplace to={redirectPath} />;
};
