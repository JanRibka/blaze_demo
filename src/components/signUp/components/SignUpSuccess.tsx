"use client";

import { ClientReplace } from "@/components/clientReplace/ClientReplace";
import routes from "@/lib/routes/routes";

export default function SignUpSuccess() {
  return <ClientReplace to={routes.LogIn} />;
}
