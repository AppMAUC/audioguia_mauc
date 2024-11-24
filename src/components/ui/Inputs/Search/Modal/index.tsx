import { Modal, Suggestions1, Suggestions2 } from "./Modal";
import { useState } from "react";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const suggestionsList = [
    { label: "Home" },
    { label: "Sobre" },
    { label: "Contato" },
    { label: "Acessibilidade" },
    { label: "Instalar" },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen((prev) => !prev)}>
        <Suggestions1 suggestionList={suggestionsList} />
        <Suggestions2 suggestionList={suggestionsList} />
      </Modal>
    </>
  );
};
