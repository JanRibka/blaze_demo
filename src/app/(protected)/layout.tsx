import { ClientReplace } from "@/components/clientReplace/ClientReplace";
import NavBar from "@/components/navBar/NavBar";
import PageContent from "@/components/pageContent/PageContent";
import PageTitle from "@/components/pageTitle/PageTitle";
import { auth } from "@/config/auth/auth";
import routes from "@/lib/routes/routes";

type Props = { children: React.ReactNode };

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    return <ClientReplace to={routes.LogIn} />;
  }

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavBar />
      <main className="h-full container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTitle>Události</PageTitle>
        <PageContent>{children}</PageContent>
      </main>
    </div>
  );
}
