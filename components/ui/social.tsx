'use client'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { LOGIN_REDIRECT } from "@/lib/routes";



export const Social = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { 
      callbackUrl: LOGIN_REDIRECT
    });
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full hover:bg-gray-200"
        variant={"outline"}
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full hover:bg-gray-200"
        variant={"outline"}
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
