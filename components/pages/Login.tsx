"use client";

import React from "react";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/msg/FormError";
import { login } from "@/actions/login";
import { Social } from "@/components/ui/social";
const Login = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values)
        .then((res) => {
          if (res?.error) {
            setError(res.error);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="my-4 bg-white rounded-lg shadow-lg p-8 w-[32rem] flex flex-col items-center">
      <h1 className="font-impact text-4xl font-bold italic text-gray-800 text-center mb-4">
        <a href="/home">SPORT TRAINING</a>
      </h1>
      <h2 className="text-lg text-gray-600 text-center mt-5 mb-1">
        Iniciar Sesión
      </h2>
      <div className="border-t border-gray-300 mb-7 w-full"></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md"
        >
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end mt-2 space-x-2">
              <Checkbox
                id="show"
                onCheckedChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor="show"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mostrar contraseña
              </label>
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="flex justify-between items-center text-sm">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Recordarme
                  </FormLabel>
                </FormItem>
              )}
            />
            <a
              href="/restablecer-contrasena"
              className="text-turquoise hover:underline hover:text-purple"
            >
              ¿Ha olvidado la contraseña?
            </a>
          </div>
          <FormError message={error} />

          {/* Botón de inicio de sesión */}
          <button
            disabled={isPending}
            type="submit"
            className="bg-turquoise w-full text-black hover:text-white py-2 px-4 rounded-lg shadow hover:bg-purple hover:shadow-md hover:shadow-gray-400 focus:bg-violet-500"
          >
            Iniciar Sesión
          </button>
        </form>
      </Form>
      <div className="mt-4 w-full max-w-md">
        <Social />
      </div>
      {/* Registro */}
      <div className="flex w-full justify-left items-center mt-4">
        <p className="text-sm text-left text-gray-600">
          ¿No tienes cuenta?
          <a
            href="/registrar"
            className="ml-2 text-turquoise hover:underline hover:text-purple"
          >
            Registrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
