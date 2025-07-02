import { useState } from "react";

import { TEventFormError } from "@/lib/validations/schemas/eventFormValidationSchema";
import { validateEventForm } from "@/lib/validations/validations/validateEventForm";

export default function useEditEventValidation() {
  const [error, setError] = useState<TEventFormError>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateEventForm(data);

    if (!validationResult.success) {
      event.preventDefault();
      setError({ ...validationResult.error, timestamp: Date.now().toString() });
      return false;
    }

    setError({});
    return true;
  };

  return { error, setError, validate };
}
