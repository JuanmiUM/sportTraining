'use server'

import Programas from "@/components/pages/Programas";
import { auth } from "@/auth";

const ProgramasPage = async () => {
  const session = await auth();

  return (
      <Programas userId={session?.user?.id || ""} />
  );
}

export default ProgramasPage;