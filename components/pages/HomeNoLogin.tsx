"use client";

import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function HomeNoLogin() {
  return (
    <div className="relative isolate overflow-hidden bg-card shadow-2xl rounded-3xl flex mx-24 px-24">
      <div className="text-center sm:mx-0 sm:flex-auto sm:py-24 sm:text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Haz una breve visita por nuestros centros para poder conocernos más de
          cerca
        </h2>
        <p className="mt-6 text-gray-600 text-lg/8">
          También podrás ver las actividades e instalaciones
        </p>
        <div className="mt-20 flex items-center justify-center -mb-6">
          <Button
            radius="lg"
            className="bg-gradient-to-tr text-md from-turquoise to-purple text-primary-foreground shadow-lg"
            as={Link}
            href="/dashboard/complejos"
            size="lg"
          >
            Realizar visita
          </Button>
        </div>
      </div>
    </div>
  );
}
