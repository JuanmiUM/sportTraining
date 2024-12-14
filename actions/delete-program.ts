"use server"

import * as z from "zod"
import { NewPasswordSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { currUserId } from "@/lib/auth";

export const deleteProgram = async (id: string) => {
  
  await db.program.delete({
    where: { 
      id: id,
    }
  });

  return { success: "El programa ha sido eliminado correctamente!" }
}
