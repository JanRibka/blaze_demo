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

export interface ValidationError {
  [key: string]: string;
}

export interface ActionResponse {
  success: boolean;
  error?: string | ValidationError;
}

export interface ToastOptions {
  title: string;
  description: string;
  color: "success" | "danger" | "warning" | "default";
}
