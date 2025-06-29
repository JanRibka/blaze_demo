import Card from "@/components/card/Card";
import CardBody from "@/components/cardBody/CardBody";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="h-full">
      <div className="flex items-center justify-center h-full">
        <Card className="w-full sm:w-[30rem]" shadow="lg">
          <CardBody className="w-full">{children}</CardBody>
        </Card>
      </div>
    </main>
  );
}
