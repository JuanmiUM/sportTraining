"use client";

import React from "react";
import CustomButton from "@/components/ui/customButton";

export default function HomeNoLogin() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="bg-card shadow-2xl rounded-2xl flex mx-24 px-24">
      <div className="text-center sm:mx-0 sm:flex-auto sm:py-24 sm:text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Haz una breve visita por nuestros centros para poder conocernos más de
          cerca
        </h2>
        <p className="mt-6 text-gray-600 text-lg/8">
          También podrás ver las actividades e instalaciones
        </p>
        <div className="mt-20 flex items-center justify-center -mb-6">
          <CustomButton text="Realizar visita" link="/complejos" />
        </div>
        </div>
      </div>
    </div>
  );
}
