import { forwardRef } from "react";

import { useNavBarStyles } from "./hooks/useNavbarStyles";
import { NavBarProps } from "./types";
import UpperBar from "./UpperBar";

const NavBar = forwardRef<HTMLElement, NavBarProps>(
  ({ variant = "default", sticky = true, className, ...restProps }, ref) => {
    const { getNavBarStyles } = useNavBarStyles();

    return (
      <header
        ref={ref}
        className={getNavBarStyles({ variant, sticky, className })}
        role="banner"
        aria-label="Hlavní navigace"
        {...restProps}
      >
        <UpperBar />
      </header>
    );
  }
);

NavBar.displayName = "NavBar";

export default NavBar;
