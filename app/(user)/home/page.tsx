"use server";

import HomeNoLogin from "@/components/pages/home/HomeNoLogin";
import HomeLogin from "@/components/pages/home/HomeLogin";
import { auth } from "@/auth";
import Bienvenida from "@/components/msg/Bienvenida";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col flex-1 items-center w-full">
      {session ? (
        <div className="flex flex-col flex-1 w-full px-8">
          <Bienvenida name={session.user?.name || ""} />
          <div className="flex-1 flex items-center justify-center">
            <HomeLogin userId={session.user?.id || ""} />
          </div>
        </div>
      ) : (
        <HomeNoLogin />
      )}
    </main>
  );
}
