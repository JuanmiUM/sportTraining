import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main>
        <div className="min-h-screen flex flex-col ">
          {/* Header */}
        <Header />
        {/* Sección principal */}
          {children}
      </div>
      {/* Footer */}
        <Footer />
      </main>
    </SessionProvider>
  );
}
