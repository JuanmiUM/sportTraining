import { Button } from "@nextui-org/react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import logo from "@/public/blue-logo.svg";
import { DropDownMenu } from "@/components/ui/dropDownMenu";
import { auth } from "@/auth";
import { LOGIN_REDIRECT } from "@/lib/routes";

const Header: React.FC = async () => {
  const session = await auth();

  return (
    <header className="bg-background">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 md:px-8"
      >
        <div className="flex flex-1">
          <a href={LOGIN_REDIRECT} className="-ml-2">
            <img alt="Blue Logo" src={logo.src} className="h-16 w-auto" />
          </a>
        </div>
        {session ? (
          <div className="hidden md:flex md:gap-x-12">
            <Link
              href="/centros-deportivos"
              className="px-2 border-2 border-background text-md font-semibold text-foreground hover:border-b-turquoise"
            >
              Centros Deportivos
            </Link>
            <Link
              href="/programas"
              className="px-2 border-2 border-background text-md font-semibold text-foreground hover:border-b-turquoise"
            >
              Programas
            </Link>
          </div>
        ) : null}
        {session ? (
          <div className="hidden md:flex md:flex-1 md:justify-end sm:items-center md:space-x-4">
            <DropDownMenu
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
          </div>
        ) : (
          <div className="hidden md:flex md:flex-1 md:justify-end sm:items-center md:space-x-4">
            <Button
              className="bg-turquoise text-black hover:text-white hover:bg-purple"
              endContent={<LogIn className="h-auto w-4" />}
              as={Link}
              href="/iniciar-sesion"
            >
              Iniciar sesión
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
