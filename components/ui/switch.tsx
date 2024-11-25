'use client'

import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { updateRememberMe } from "@/data/user";
export default function SwitchComponent({ id, isSelected: initialSelected }: { id: string, isSelected: boolean }) {
  const [isSelected, setIsSelected] = useState(initialSelected);

  const handleChange = async (value: boolean) => {
    setIsSelected(value);
    await updateRememberMe(id, value);
  }

  return (
    <Switch 
      size="sm" 
      isSelected={isSelected}
      onValueChange={handleChange}
    />
  );
}
