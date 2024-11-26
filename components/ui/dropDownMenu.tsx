"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "./logoutButton";

interface DropDownMenuProps {
  name: string;
  email: string;
  image: string;
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({
  name,
  email,
  image,
}) => {

  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <Dropdown backdrop="blur" placement="bottom-end">
        <DropdownTrigger>
          {image ? (
            <Avatar
              radius="full"
              size="sm"
              isBordered
              color="default"
              as="button"
              showFallback
              className="transition-transform"
              src={image}
            />
          ) : (
            <Avatar
              radius="full"
              color="secondary"
              size="sm"
              isBordered
              as="button"
              showFallback
              className="transition-transform"
            />
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownSection title="Perfil" showDivider>
            <DropdownItem key="user" className="h-14 gap-2" onClick={() => {
                router.push("/perfil");
              }}
            >
              <p className="font-semibold">{name}</p>
              <p className="text-[12px] font-normal text-gray-500">{email}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Acciones">
            <DropdownItem key="logout" color="danger">
              <LogoutButton />
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
