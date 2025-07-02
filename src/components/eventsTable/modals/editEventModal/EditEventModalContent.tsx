import { useRef, useState } from "react";

import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import ValidateDateInput from "@/components/validateDateInput/ValidateDateInput";
import ValidateInput from "@/components/validateInput/ValidateInput";
import { EventDTO } from "@/lib/dTOs/EventDTO";
import { parseDateTimeToDateValue } from "@/lib/utils/date";
import { nameof } from "@/lib/utils/nameof";
import eventFormValidationSchema, {
  TEventForm,
  TEventFormError,
} from "@/lib/validations/schemas/eventFormValidationSchema";
import { DateValue } from "@heroui/react";

type Props = {
  event: EventDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: TEventFormError;
  isPending?: boolean;
};

export default function EditEventModalContent({
  event,
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  const refTitle = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<TEventForm>({
    title: event.title,
    description: event.description,
    startAt: event.startAt,
    endAt: event.endAt,
    location: event.location,
  });

  const handleFieldChange = (
    field: keyof TEventForm,
    value: string | DateValue | null | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <ValidateInput
          ref={refTitle}
          name={nameof<TEventForm>("title")}
          value={formData.title}
          label="Nadpis"
          className="mb-4"
          required
          error={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={eventFormValidationSchema}
          onChange={(e) => handleFieldChange("title", e.target.value)}
        />
        <ValidateInput
          name={nameof<TEventForm>("description")}
          value={formData.description}
          label="Popis"
          className="mb-4"
          required
          error={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={eventFormValidationSchema}
          onChange={(e) => handleFieldChange("description", e.target.value)}
        />
        <ValidateDateInput
          name={nameof<TEventForm>("startAt")}
          value={parseDateTimeToDateValue(formData.startAt)}
          label="Začíná"
          className="mb-4"
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          validationSchema={eventFormValidationSchema}
          onChange={(value) => handleFieldChange("startAt", value)}
        />
        <ValidateDateInput
          name={nameof<TEventForm>("endAt")}
          value={parseDateTimeToDateValue(formData.endAt)}
          label="Končí"
          className="mb-4"
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          validationSchema={eventFormValidationSchema}
          onChange={(value) => handleFieldChange("endAt", value)}
        />
        <ValidateInput
          name={nameof<TEventForm>("location")}
          value={formData.location ?? ""}
          label="Umístění"
          className=""
          required
          error={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={eventFormValidationSchema}
          onChange={(e) => handleFieldChange("location", e.target.value)}
        />
      </div>
      <div className="flex py-2 px-1 justify-between">
        <Button color="danger" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={isPending}
          isLoading={isPending}
        >
          Uložit
        </Button>
      </div>
    </Form>
  );
}
