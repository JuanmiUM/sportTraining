"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, ResetPasswordSchema } from "@/schemas/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/msg/FormError";
import { FormSuccess } from "@/components/msg/FormSuccess";
import { resetPassword } from "@/actions/reset-password";
import { newPassword } from "@/actions/new-password";
import { Checkbox } from "@/components/ui/checkbox";

const ForgotPassword = () => {
  const [emailSubmited, setEmailSubmited] = useState(false);
  const [email, setEmail] = useState("");
  const [isPendingEmail, startTransitionEmail] = useTransition();
  const [isPendingPassword, startTransitionPassword] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const emailForm = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password1: "",
      password2: "",
    },
  });

  const onSubmitEmail = (values: z.infer<typeof ResetPasswordSchema>) => {
    setSuccess("");
    setError("");

    startTransitionEmail(() => {
      resetPassword(values).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);

        if (res?.success) {
          emailForm.reset();
          setSuccess("");
          setError("");
          setEmailSubmited(true);
          setEmail(values.email);
        }
      });
    });
  };

  const onSubmitPasswords = (values: z.infer<typeof NewPasswordSchema>) => {
    setSuccess("");
    setError("");

    startTransitionPassword(() => {
      newPassword(email, values).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);

        if (res?.success) {
          passwordForm.reset();
        }
      });
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-[32rem] flex flex-col items-center">
      {/* Título */}
      <h1 className="font-impact text-4xl font-bold italic text-gray-800 text-center mb-4">
        <a href="/home">SPORT TRAINING</a>
      </h1>
      <h2 className="text-lg text-gray-600 text-center mt-5 mb-1">
        Recuperar Contraseña
      </h2>
      <div className="border-t border-gray-300 mb-7 w-full"></div>

      {!emailSubmited ? (
        <div className="w-full max-w-md">
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onSubmitEmail)}
              className="space-y-4"
            >
              <div>
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPendingEmail}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />

              <button
                disabled={isPendingEmail}
                type="submit"
                className="bg-turquoise w-full text-black hover:text-white py-2 px-4 rounded-lg shadow hover:bg-purple hover:shadow-md hover:shadow-gray-400 focus:bg-violet-500"
              >
                Comprobar correo
              </button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {/* Formulario */}
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmitPasswords)}
              className="space-y-4"
            >
              <div className="hidden"></div>
              <div>
                <FormField
                  control={passwordForm.control}
                  name="password1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nueva contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPendingPassword}
                          type={showPassword1 ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end mt-2 space-x-2">
                  <Checkbox
                    id="show1"
                    onCheckedChange={() => setShowPassword1(!showPassword1)}
                  />
                  <label
                    htmlFor="show1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mostrar contraseña
                  </label>
                </div>
              </div>

              <div>
                <FormField
                  control={passwordForm.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repetir contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPendingPassword}
                          type={showPassword2 ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end mt-2 space-x-2">
                  <Checkbox
                    id="show2"
                    onCheckedChange={() => setShowPassword2(!showPassword2)}
                  />
                  <label
                    htmlFor="show2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mostrar contraseña
                  </label>
                </div>
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <button
                disabled={isPendingPassword}
                type="submit"
                className="bg-turquoise w-full text-black hover:text-white py-2 px-4 rounded-lg shadow hover:bg-purple hover:shadow-md hover:shadow-gray-400 focus:bg-violet-500"
              >
                Actualizar contraseña
              </button>
            </form>
          </Form>
        </div>
      )}
      {/* Enlace para registrarse */}
      <div className="flex w-full justify-between items-center mt-4">
        <p className="text-sm text-left text-gray-600">
          ¿Ya tienes cuenta?
          <a
            href="/iniciar-sesion"
            className="ml-2 text-turquoise hover:underline hover:text-purple"
          >
            Iniciar Sesión
          </a>
        </p>
        <p className="text-sm text-center text-gray-600">
          ¿No tienes cuenta?{" "}
          <a
            href="/registrar"
            className="text-turquoise hover:underline hover:text-turquoise"
          >
            Registrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
