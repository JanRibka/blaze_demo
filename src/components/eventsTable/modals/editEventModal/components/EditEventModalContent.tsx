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
} from "@/lib/validations/schemas/eventFormValidationSchema";
import { DateValue } from "@heroui/react";

import { EditEventModalContentProps } from "../types";

export default function EditEventModalContent({
  event,
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
  suppressOnChangeOnError,
}: EditEventModalContentProps) {
  const refTitle = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<EventDTO>({
    ...event,
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
      <div className="space-y-4">
        <ValidateInput
          ref={refTitle}
          name={nameof<TEventForm>("title")}
          value={formData.title}
          label="Předmět"
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
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          validationSchema={eventFormValidationSchema}
          onChange={(value) => handleFieldChange("startAt", value)}
          suppressOnChangeOnError={suppressOnChangeOnError}
        />
        <ValidateDateInput
          name={nameof<TEventForm>("endAt")}
          value={parseDateTimeToDateValue(formData.endAt)}
          label="Končí"
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          validationSchema={eventFormValidationSchema}
          onChange={(value) => handleFieldChange("endAt", value)}
          suppressOnChangeOnError={suppressOnChangeOnError}
        />
        <ValidateInput
          name={nameof<TEventForm>("location")}
          value={formData.location ?? ""}
          label="Umístění"
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
