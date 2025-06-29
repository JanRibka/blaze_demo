"use client";

import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export default function UpperBar() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <section className="h-16 2xl:h-20 flex items-center justify-end px-6 md:px-9 transition-all duration-200 ease-linear">
      <div className="">
        <button
          className=" w-full h-full text-left flex items-center gap-2"
          onClick={handleSignOut}
        >
          {<FaSignOutAlt />}
          <span className="flex-1">Odhlásit se</span>
        </button>
      </div>
    </section>
  );
}
