import { ClientReplace } from "@/components/clientReplace/ClientReplace";
import NavBar from "@/components/navBar/NavBar";
import { auth } from "@/config/auth/auth";
import routes from "@/lib/routes/routes";

type Props = { children: React.ReactNode };

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    return <ClientReplace to={routes.LogIn} />;
  }

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <NavBar />
      <main className="">{children}</main>
    </div>
  );
}
