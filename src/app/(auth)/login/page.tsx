"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthButton } from "@/components/AuthButton";
import { FacebookIcon, GoogleIcon } from "@/components/icons";
import { loginSchema, type LoginSchemaType } from "@/schemes/zod";
import { Link } from "@/components/Link";
import { PasswordInput } from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function Login() {
  const form = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const [pending, setPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const onSubmit = async (user: LoginSchemaType) => {
    try {
      setPending(true);
      setIsError(false);

      const response = await signIn("credentials", {
        ...user,
        callbackUrl: "/",
        redirect: false,
      });

      if (response?.error) {
        setIsError(true);
      } else {
        router.push("/");
      }

      setPending(false);
    } catch (e) {}
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        {!isError && (
          <div className="flex rounded bg-red-700/50 mb-2 p-2 text-sm items-center justify-center">
            E-mail или пароль введены неверно
          </div>
        )}

        <div className="grid gap-2 w-80">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={pending}
                    placeholder="E-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    className="h-12"
                    disabled={pending}
                    placeholder="Пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="h-12"
            color="primary"
            disabled={pending}
            size="lg"
            type="submit"
          >
            Войти
          </Button>
          <div className="flex items-center pt-4 justify-center">
            <span>Нет аккаунта?</span>
            <Link
              className="text-blue-700 hover:underline ml-2"
              disabled={pending}
              href="/register"
            >
              Зарегистрироваться
            </Link>
          </div>

          <div className="flex items-center py-4">
            <Separator className="flex-1" />
            <p className="mx-2">или</p>
            <Separator className="flex-1" />
          </div>

          <div className="flex justify-center gap-2">
            <AuthButton
              className="flex-1"
              disabled={pending}
              provider="google"
              onClick={() => setPending(true)}
            >
              <GoogleIcon className="w-5 h-5" />
              Google
            </AuthButton>
            <AuthButton
              className="flex-1"
              disabled={pending}
              provider="facebook"
              onClick={() => setPending(true)}
            >
              <FacebookIcon className="w-5 h-5" />
              Facebook
            </AuthButton>
          </div>

          <Link
            className="text-center text-blue-700 hover:underline mt-10"
            disabled={pending}
            href=""
          >
            Забыли пароль?
          </Link>
        </div>
      </form>
    </Form>
  );
}
