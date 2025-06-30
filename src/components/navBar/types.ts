import { ButtonHTMLAttributes, HTMLAttributes } from "react";

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "glass" | "solid";
  sticky?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpperBarProps extends HTMLAttributes<HTMLElement> {}

export interface SignOutButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "minimal";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showText?: boolean;
  loading?: boolean;
}

export interface UserInfoProps {
  userName?: string;
  userEmail?: string;
  showAvatar?: boolean;
  className?: string;
}
