import { useRef } from "react";

import Button from "@/components/button/Button";
import Form from "@/components/form/Form";
import ValidateDateInput from "@/components/validateDateInput/ValidateDateInput";
import ValidateInput from "@/components/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import eventFormValidationSchema, {
  TEventForm,
  TEventFormError,
} from "@/lib/validations/schemas/eventFormValidationSchema";

type Props = {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: TEventFormError;
  isPending?: boolean;
};

export default function InsertEventModalContent({
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
}: Props) {
  const refTitle = useRef<HTMLInputElement>(null);

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
          label="Nadpis"
          className="mb-4"
          required
          error={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={eventFormValidationSchema}
        />
        <ValidateInput
          name={nameof<TEventForm>("description")}
          label="Popis"
          className="mb-4"
          required
          error={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={eventFormValidationSchema}
        />
        <ValidateDateInput
          name={nameof<TEventForm>("startAt")}
          label="Začíná"
          className="mb-4"
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          validationSchema={eventFormValidationSchema}
        />
        <ValidateDateInput
          name={nameof<TEventForm>("endAt")}
          label="Končí"
          className="mb-4"
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          validationSchema={eventFormValidationSchema}
        />
        <ValidateInput
          name={nameof<TEventForm>("location")}
          label="Umístění"
          className=""
          required
          error={errors}
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
          validationSchema={eventFormValidationSchema}
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
