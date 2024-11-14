// AccessibilityMenu.tsx
import React from "react";
import { useAccessibility } from "./useAccessibility";
import { useTheme } from "../Theme/ThemeProvider";

const AccessibilityMenu: React.FC = () => {
  const {
    fontSize,
    spacing,
    increaseFontSize,
    decreaseFontSize,
    increaseSpacing,
    decreaseSpacing,
    reset,
  } = useAccessibility();
  const { toggleTheme } = useTheme();

  const handleReset = () => {
    // resetar tamanho da fonte e espaçamento
    toggleTheme("default");
    reset();
  };

  return (
    <div>
      <h2>Menu Acessibilidade</h2>
      <p>Escolha o tema:</p>

      <button onClick={handleReset}>Redefinir</button>
      <button onClick={() => toggleTheme("light")}>Claro</button>
      <button onClick={() => toggleTheme("dark")}>Escuro</button>

      <div>
        <p>Tamanho da fonte: {fontSize}</p>
        <button onClick={increaseFontSize}>Aumentar Tamanho</button>
        <button onClick={decreaseFontSize}>Diminuir Tamanho</button>
      </div>

      <div>
        <p>Espaçamento: {spacing}</p>
        <button onClick={increaseSpacing}>Aumentar Espaçamento</button>
        <button onClick={decreaseSpacing}>Diminuir Espaçamento</button>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
