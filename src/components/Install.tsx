// src/App.tsx
import React, { useState, useEffect } from "react";

const Install: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the PWA install prompt");
      } else {
        console.log("User dismissed the PWA install prompt");
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <div>
      {showInstallButton && (
        <button onClick={handleInstallClick}>Instalar Aplicativo</button>
      )}
    </div>
  );
};

export default Install;
