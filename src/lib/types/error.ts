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
