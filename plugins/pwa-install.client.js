let deferredPrompt = null;

export const usePWAInstall = () => {
  const showInstallButton = ref(false);

  if (process.client) {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault(); // prevent browser mini-banner
      deferredPrompt = e;
      showInstallButton.value = true;
    });
  }

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    deferredPrompt = null;
    showInstallButton.value = false;
    return choiceResult.outcome;
  };

  return { showInstallButton, promptInstall };
};
