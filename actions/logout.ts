'use server'
import { LOGOUT_REDIRECT } from "@/lib/routes"

import { signOut } from "@/auth";

export const logout = async () => {
  // some server
    await signOut({ redirectTo: LOGOUT_REDIRECT } 
  );
}