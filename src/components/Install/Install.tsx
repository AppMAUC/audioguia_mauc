import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useTranslation } from "../../features/Language/useTranslation";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

const Install: React.FC = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const evt = e as BeforeInstallPromptEvent;
      evt.preventDefault();
      setDeferredPrompt(evt);
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
        console.log(t('install.consoleAccepted'));
      } else {
        console.log(t('install.consoleDismissed'));
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <>
      {showInstallButton && (
        <Button
          onClick={handleInstallClick}
          style={{ marginLeft: "var(--spacing-25)", zIndex: 998 }}
          aria-label={t('install.buttonAriaLabel')}
        >
          {t('install.buttonText')}
        </Button>
      )}
    </>
  );
};

export default Install;