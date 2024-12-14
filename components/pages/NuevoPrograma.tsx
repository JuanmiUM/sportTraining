"use client";

import React, { useState, useEffect, useTransition } from "react";
import data from "@/data.json";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NewProgramSchema } from "@/schemas";
import { FormError } from "@/components/msg/FormError";
import { FormSuccess } from "@/components/msg/FormSuccess";
import { registerProgram } from "@/actions/new-program";

const NuevoPrograma = () => {
  const [sports, setSports] = useState(data.deportes);
  const [centers, setCenters] = useState(data.centros_deportivos);
  const [filteredCenters, setFilteredCenters] = useState(centers);
  const [filteredSports, setFilteredSports] = useState(sports);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm({
    resolver: zodResolver(NewProgramSchema),
    defaultValues: {
      startDate: "",
      numDays: 0,
      timeSlot: "",
      center: "",
      sport: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewProgramSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      registerProgram(values).then((res) => {
        setSuccess(res.success);
        setError(res.error);

        if (res.success) {
          form.reset(); // Vaciar el formulario
        }
      });
    });
  };

  const watchCenter = form.watch("center");
  const watchSport = form.watch("sport");

  useEffect(() => {
    if (watchCenter) {
      const selectedCenter = centers.find((c) => c.nombre === watchCenter);
      if (selectedCenter) {
        setFilteredSports(selectedCenter.especialidades);
      } else {
        setFilteredSports([]);
      }
    } else if (watchSport) {
      const validCenters = centers.filter((c) =>
        c.especialidades.includes(watchSport)
      );
      setFilteredCenters(validCenters);
    }
  }, [watchCenter, watchSport, centers]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="my-4 bg-white rounded-lg shadow-lg p-8 w-[32rem] flex flex-col items-center">
        {/* Título */}
        <h1 className="font-impact text-4xl font-bold italic text-gray-800 text-center mb-4">
          <a href="/home">SPORT TRAINING</a>
        </h1>
        <h2 className="text-lg text-gray-600 text-center mt-5 mb-1">
          Nuevo Programa
        </h2>
        <div className="border-t border-gray-300 mb-7 w-full"></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-md"
          >
            {/* Fecha de inicio */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de inicio</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Número de días */}
            <FormField
              control={form.control}
              name="numDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de días</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Franja horaria */}
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Franja horaria</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MAÑANAS" />
                        </FormControl>
                        <FormLabel className="font-normal">Mañanas</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="TARDES" />
                        </FormControl>
                        <FormLabel className="font-normal">Tardes</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Centro deportivo */}
            <FormField
              control={form.control}
              name="center"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro deportivo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un centro deportivo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredCenters.map((option) => (
                        <SelectItem key={option.nombre} value={option.nombre}>
                          {option.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deporte */}
            <FormField
              control={form.control}
              name="sport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deporte</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un deporte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredSports.map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSuccess message={success} />
            <FormError message={error} />

            {/* Botón de envío */}
            <button
              type="submit"
              className="bg-turquoise w-full text-black hover:text-white py-2 px-4 rounded-lg shadow hover:bg-purple hover:shadow-md hover:shadow-gray-400 focus:bg-violet-500"
              disabled={isPending}
            >
              Crear Programa
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NuevoPrograma;
