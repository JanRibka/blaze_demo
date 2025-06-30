"use client";

import Link from "next/link";
import { forwardRef, memo } from "react";
import { FaHome } from "react-icons/fa";

import routes from "@/lib/routes/routes";

import SignOutButton from "./components/SignOutButton";
import { useNavBarStyles } from "./hooks/useNavbarStyles";
import { UpperBarProps } from "./types";

const UpperBar = memo(
  forwardRef<HTMLElement, UpperBarProps>(({ className, ...restProps }, ref) => {
    const { getUpperBarStyles } = useNavBarStyles();

    return (
      <section
        ref={ref}
        className={getUpperBarStyles(className)}
        role="toolbar"
        aria-label="Uživatelské akce"
        {...restProps}
      >
        <div className="flex items-center">
          <Link href={routes.Root}>
            <FaHome className="text-2xl" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-6 w-px bg-gray-300 hidden sm:block" />

          <SignOutButton
            variant="ghost"
            size="md"
            showIcon={true}
            showText={true}
          />
        </div>
      </section>
    );
  })
);

UpperBar.displayName = "UpperBar";

export default UpperBar;
