import Lovable from "@/components/svg/Lovable";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isAndroid } from "react-device-detect";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [installationPrompt, setInstallationPrompt] = useState<any>();
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    // Set up an `onComplete` callback to run when `login` completes
    onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
      console.log("🔑 ✅ Login success", {
        user,
        isNewUser,
        wasPreviouslyAuthenticated,
      });
      router.push("/dashboard");
    },
    // Set up an `onError` callback to run when there is a `login` error
    onError(error) {
      console.log("🔑 🚨 Login error", { error });
    },
  });

  useEffect(() => {
    // Helps you prompt your users to install your PWA
    // See https://web.dev/learn/pwa/installation-prompt/
    // iOS Safari does not have this event, so you will have
    // to prompt users to add the PWA via your own UI (e.g. a
    // pop-up modal)
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setIsInstalled(false);
      setInstallationPrompt(e);
    });
  }, []);

  useEffect(() => {
    // Detect if the PWA is installed
    // https://web.dev/learn/pwa/detection/#detecting-the-transfer
    window.addEventListener("DOMContentLoaded", () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    });
  });

  const promptToInstall = async () => {
    if (!installationPrompt) return;
    installationPrompt.prompt();
    installationPrompt.userChoice.then((response: { outcome: string }) => {
      setIsInstalled(response.outcome === "accepted");
    });
  };

  return (
    <>
      <Head>
        <title>Privy PWA Template</title>
      </Head>
      <main>
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <Lovable />
		  <br/>
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Vibebot Privy PWA Template
          </h1>

          <div className="mt-2 w-1/2">
            {!isInstalled && isAndroid ? (
              <Button className="my-4 w-full" onClick={promptToInstall}>
                Install App
              </Button>
            ) : (
              <Button
                className="my-4 w-full "
                onClick={login}
                // Always check that Privy is `ready` and the user is not `authenticated` before calling `login`
                disabled={!ready || authenticated}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
