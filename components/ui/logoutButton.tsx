"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
export const LogoutButton = () => {
  return (
    <div className="flex items-center hover:cursor-pointer" onClick={() => signOut()}>
      <LogOut size={16} className="mr-4" />
      <p className="text-sm">Cerrar Sesión</p>
    </div>
  );
};
