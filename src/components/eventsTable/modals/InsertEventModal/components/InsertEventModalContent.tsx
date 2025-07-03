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
  suppressOnChangeOnError: boolean;
};

export default function InsertEventModalContent({
  onCancel,
  action,
  onSubmit,
  errors,
  isPending,
  suppressOnChangeOnError,
}: Props) {
  const refTitle = useRef<HTMLInputElement>(null);

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
          label="Nadpis"
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
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          hourCycle={24}
          validationSchema={eventFormValidationSchema}
          suppressOnChangeOnError={suppressOnChangeOnError}
        />
        <ValidateDateInput
          name={nameof<TEventForm>("endAt")}
          label="Končí"
          error={errors}
          fullWidth
          variant="faded"
          color="primary"
          granularity="minute"
          hourCycle={24}
          validationSchema={eventFormValidationSchema}
          suppressOnChangeOnError={suppressOnChangeOnError}
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
