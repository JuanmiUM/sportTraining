"use server";


import { ChartColumn, Settings, BookUser, History, CircleHelp, Star, Lightbulb, LogOut } from "lucide-react"
import React from "react";
import Switch from "@/components/ui/switch";
import { auth } from "@/auth";
import { Avatar } from "@nextui-org/react";
import { LogoutButton } from "@/components/ui/logoutButton";

export default async function UserProfileMenu() {
  const session = await auth();

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      {/* Contenedor principal */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        {/* Información del usuario */}
        <div className="flex items-center mb-6">
          <div className="relative">
            {session?.user?.image ? (
              <Avatar
                radius="full"
                size="lg"
                isBordered
                color="default"
                as="button"
                showFallback
                className="transition-transform"
                src={session?.user?.image}
              />
            ) : (
              <Avatar
                radius="full"
                color="secondary"
                size="lg"
                isBordered
                as="button"
                showFallback
                className="transition-transform"
              />
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-md font-bold">{session?.user?.name}</h2>
            <p className="text-gray-500 text-sm">{session?.user?.email}</p>
          </div>
        </div>

        {/* Lista de opciones */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <ChartColumn 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Análisis & Datos</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <Settings 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Configuración</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <BookUser 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Invitar amigos</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <History 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Historial</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <CircleHelp 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Centro de Ayuda</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <Star 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Obtener Premium</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <Lightbulb 
                size={16}
                className="mr-4" 
              />
              <p className="text-sm">Recordarme al iniciar sesión</p>
            </div>
            {/* Toggle */}
            <Switch
              id={session?.user?.id || ""}
              isSelected={session?.user?.remember || false}
            />
          </div>

          <div className="flex items-center justify-between">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};