"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { newStartDate } from "@/actions/new-date";
import { deleteProgram } from "@/actions/delete-program";

export default function ProgramButton({
  text,
  type,
  progId,
}: {
  text: string;
  type: string;
  progId?: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newDate, setNewDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleConfirm = async (onClose: () => void) => {
    const currentDate = new Date();
    const selectedDate = new Date(newDate);

    if (selectedDate < currentDate) {
      setErrorMessage("La fecha no puede ser anterior a la fecha actual.");
      return;
    }
    if (!progId) {
      setErrorMessage("No se ha encontrado el nombre del programa.");
      return;
    }
    
    try {
      await newStartDate(progId, selectedDate);
      onClose();
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar la fecha:", error);
      setErrorMessage("Ocurrió un error al actualizar la fecha.");
    }
  };

  const handleConfirm2 = async (onClose: () => void) => {

    if (!progId) {
      setErrorMessage("No se ha encontrado el nombre del programa.");
      return;
    }
    
    try {
      await deleteProgram(progId);
      onClose();
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el programa:", error);
      setErrorMessage("Ocurrió un error al eliminar el programa.");
    }
  };


  return (
    <div>
      {type === "modify" && (
        <>
          <Button
            variant="bordered"
            color="primary"
            className="text-lg text-normal w-32"
            onPress={onOpen}
          >
            {text}
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modificar fecha de inicio
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex max-w-sm flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Input
                        label="Nueva fecha inicio"
                        type="date"
                        variant="underlined"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>
                    {errorMessage && (
                      <div>
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => handleConfirm(onClose)}
                    >
                      Confirmar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}

      {type === "delete" && (
        <>
        <Button
          color="danger"
          className="text-lg text-normal w-32"
          onPress={onOpen}
        >
          {text}
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Eliminar programa de entrenamiento
                </ModalHeader>
                <ModalBody>
                  <div className="flex max-w-sm flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <p>¿Seguro que quiere eliminar el programa?</p>
                  </div>
                  {errorMessage && (
                    <div>
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => handleConfirm2(onClose)}
                  >
                    Confirmar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )}
      {type === "add" && (
        <div className="w-full h-full">
          <Button
            as={Link}
            href="/programas/nuevo-programa"
            className="bg-white text-lg text-normal px-6 hover:bg-gray-100"
          >
            {text}
          </Button>
        </div>
      )}
    </div>
  );
}
