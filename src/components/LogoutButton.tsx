"use client";

import { signOut } from "next-auth/react";
import { FC } from "react";
import { Button, ButtonProps } from "./ui/button";

export const LogoutButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      {...props}
    />
  );
};
