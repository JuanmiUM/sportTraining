"use server";

import HomeNoLogin from "@/components/pages/home/HomeNoLogin";
import HomeLogin from "@/components/pages/home/HomeLogin";
import { auth } from "@/auth";
import PageTitle from "@/components/ui/PageTitle";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col flex-1 items-center w-full">
      {session ? (
        <div className="flex flex-col flex-1 w-full px-8">
          <PageTitle text={session.user?.name || ""} welcome={true} />
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
