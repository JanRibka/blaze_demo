import Link from "next/link";

import routes from "@/lib/routes/routes";

export default function CreateAccount() {
  return (
    <section className="pt-6 border-t border-slate-200/60">
      <div className="text-center">
        <p className="text-sm text-slate-600">
          Nemáte účet?{" "}
          <Link
            href={routes.SignUp}
            className="font-semibold text-primary hover:text-primary/80 underline decoration-2 underline-offset-2 transition-colors duration-200"
          >
            Vytvořte si jej
          </Link>
        </p>
      </div>
    </section>
  );
}
