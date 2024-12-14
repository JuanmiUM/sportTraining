"use server"

import * as z from "zod"
import { NewPasswordSchema } from "@/schemas/index"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { currUserId } from "@/lib/auth";

export const newStartDate = async (id: string, newStartDate: Date) => {
  
  await db.program.update({
    where: { 
      id: id,
    },
    data: {
      startDate: newStartDate
    }
  });

  return { success: "La fecha ha sido actualizada correctamente!" }
}
