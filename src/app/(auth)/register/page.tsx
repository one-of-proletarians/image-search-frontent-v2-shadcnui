"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type RegisterSchemaType, registerSchema } from "@/schemes/zod";
import { Link } from "@/components/Link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/PasswordInput";

export default function Register() {
  const [pending, setPending] = useState(false);
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async () => {
    setPending(true);
  };

  return (
    <div>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 w-80">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-12"
                      disabled={pending}
                      placeholder="Имя"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      className="h-12"
                      disabled={pending}
                      placeholder="Повторите пароль"
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
              Регистрация
            </Button>
          </div>
        </form>
      </Form>
      <p className="mt-6 text-center">
        <span className="mr-1">Уже есть аккаунт?</span>
        <Link disabled={pending} href="/login">
          Вход
        </Link>
      </p>
    </div>
  );
}
