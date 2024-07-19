"use client";

import type { OAuthProviderType } from "next-auth/providers/index";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FC, MouseEvent } from "react";

import { Button, ButtonProps } from "./ui/button";

interface AuthButtonProps extends ButtonProps {
  callbackUrl?: string;
  redirect?: boolean;
  provider: OAuthProviderType;
}

export const AuthButton: FC<AuthButtonProps> = ({
  callbackUrl: cbu = "/",
  redirect = true,
  provider,
  onClick,

  ...rest
}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || cbu;
  const signInHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    signIn(provider, {
      callbackUrl,
      redirect,
    });
  };

  return <Button onClick={signInHandler} {...rest} />;
};
