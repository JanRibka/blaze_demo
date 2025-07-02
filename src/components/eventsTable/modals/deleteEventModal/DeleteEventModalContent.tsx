import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import { EventDTO } from "@/lib/dTOs/EventDTO";

type Props = {
  event: EventDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
};

export default function DeleteEventModalContent({
  event,
  onCancel,
  action,
  isPending,
}: Props) {
  return (
    <Form action={action} className="flex flex-col gap-5" noValidate>
      <p>
        Opravdu chcete smazat událost <strong>{event?.title}</strong>?
      </p>
      <div className="flex py-2 px-1 justify-between">
        <Button color="success" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <Button
          type="submit"
          color="danger"
          disabled={isPending}
          isLoading={isPending}
        >
          Smazat
        </Button>
      </div>
    </Form>
  );
}
