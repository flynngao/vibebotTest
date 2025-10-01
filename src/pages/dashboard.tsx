import AuthenticatedPage from "@/components/authenticated-page";
import Section from "@/components/section";
import { usePrivy } from "@privy-io/react-auth";
import { links } from "@/lib/links";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // You can also import other linking methods, like linkWallet, linkEmail, linkDiscord, etc.
  const { user, linkPhone, linkGoogle, linkApple } = usePrivy();
  return (
    <AuthenticatedPage>
      <Section>
        <p className="text-md mt-2 font-bold uppercase ">
          Your User Object
        </p>
        <p className="mt-2 text-sm ">
          Inspect your linked accounts, or{" "}
          <a
            href={links.docs.userObject}
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            learn more
          </a>
          .
        </p>
        <textarea
          value={JSON.stringify(user, null, 2)}
          className="mt-4 h-64 w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50 disabled:bg-slate-700"
          rows={JSON.stringify(user, null, 2).split("\n").length}
          readOnly
        />
      </Section>
      <Section>
        <p className="text-md mt-8 font-bold uppercase ">
          Account Linking
        </p>
        <p className="mt-2 text-sm ">
          Link additional login methods, or{" "}
          <a
            href={links.docs.linking}
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            learn more
          </a>
          .
        </p>
        <div className="flex flex-row gap-2">
          <Button
            className="my-4 w-1/3"
            onClick={linkGoogle}
            disabled={!!user?.google}
          >
            Google
          </Button>
          <Button
            className="my-4 w-1/3"
            onClick={linkApple}
            disabled={!!user?.apple}
          >
            Apple
          </Button>
          <Button
            className="my-4 w-1/3"
            onClick={linkPhone}
            disabled={!!user?.phone}
          >
            Phone
          </Button>
        </div>
      </Section>
    </AuthenticatedPage>
  );
};

export default Dashboard;
