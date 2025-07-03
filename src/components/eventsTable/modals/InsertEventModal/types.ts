export interface InsertEventModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
}

export interface InsertEventModalContentProps {
  onCancel: () => void;
  action: (formData: FormData) => Promise<void>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: Record<string, string>;
  isPending: boolean;
  suppressOnChangeOnError: boolean;
}
