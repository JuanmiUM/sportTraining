import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";

import { font } from "@/config/fonts";
import { clsx } from "clsx";
import bg from "@/public/img/bg.png";
import  Providers from "./providers";

export const metadata: Metadata = {
  title: "SportTraining",
  description: "Trabaja sin mirar la hora y comprarás sin mirar el precio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
      <html lang="es">
        <body
          className={clsx(
            "bg-background bg-cover bg-center min-h-screen",
            font.className
          )}
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundAttachment: "fixed",
          }}
        >
          <Providers session={session}>{children}</Providers>
        </body>
      </html>
  );
}
function getServerSession(authOptions: any) {
  throw new Error("Function not implemented.");
}

