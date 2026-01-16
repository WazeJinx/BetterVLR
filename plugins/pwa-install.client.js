// /plugins/pwa-install.client.js
import { ref } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  const deferredPrompt = ref(null);
  const showInstallButton = ref(false);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // prevent default mini banner
    deferredPrompt.value = e;
    showInstallButton.value = true;
  });

  const promptInstall = async () => {
    if (!deferredPrompt.value) return;
    deferredPrompt.value.prompt();
    const choice = await deferredPrompt.value.userChoice;
    deferredPrompt.value = null;
    showInstallButton.value = false;
    return choice.outcome;
  };

  // Provide globally
  nuxtApp.provide("pwaInstall", {
    showInstallButton,
    promptInstall,
  });
});
