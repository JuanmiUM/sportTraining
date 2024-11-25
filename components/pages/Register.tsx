"use client";

import React, { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/msg/FormError";
import { FormSuccess } from "@/components/msg/FormSuccess";
import { Input } from "@/components/ui/input";

const Register = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      sport: "",
      city: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      register(values).then((res) => {
        setSuccess(res.success);
        setError(res.error);

        if (res.success) {
          form.reset(); // Vaciar el formulario
        }
      });
    });
  };

  return (
    <div className="my-4 bg-white rounded-lg shadow-lg p-8 w-[32rem] flex flex-col items-center">
      {/* Título */}
      <h1 className="font-impact text-4xl font-bold italic text-gray-800 text-center mb-4">
        <a href="/home">SPORT TRAINING</a>
      </h1>
      <h2 className="text-lg text-gray-600 text-center mt-5 mb-1">Registrar</h2>
      <div className="border-t border-gray-300 mb-7 w-full"></div>

      {/* Formulario */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Fecha de nacimiento y Deporte favorito */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deporte favorito</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Ciudad */}
          <div>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Correo */}
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

          {/* Contraseña */}
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

          <FormSuccess message={success} />
          <FormError message={error} />

          {/* Botón de registro */}
          <button
            type="submit"
            className="bg-turquoise w-full text-black hover:text-white py-2 px-4 rounded-lg shadow hover:bg-purple hover:shadow-md hover:shadow-gray-400 focus:bg-violet-500"
            disabled={isPending}
          >
            Registrar
          </button>
        </form>
      </Form>

      {/* Enlace de iniciar sesión */}
      <div className="flex w-full justify-left items-center mt-4">
        <p className="text-sm text-left text-gray-600">
          ¿Ya tienes cuenta?
          <a
            href="/iniciar-sesion"
            className="ml-2 text-turquoise hover:underline hover:text-purple"
          >
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
};
export default Register;
