import Card from "@/components/card/Card";
import CardBody from "@/components/cardBody/CardBody";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card
            className="backdrop-blur-sm bg-white/95 dark:bg-slate-800/95 border border-slate-200/60 dark:border-slate-700/60"
            shadow="lg"
          >
            <CardBody className="p-8 sm:p-10">{children}</CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
