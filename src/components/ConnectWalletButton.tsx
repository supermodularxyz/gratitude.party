import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "./Button";
import { truncate } from "utils/truncate";
import { useDisconnect } from "wagmi";

export const ConnectWalletButton = () => {
  const { disconnect } = useDisconnect();
  return <ConnectButton />;
  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, mounted }) => {
        if (!mounted) return null;
        if (account)
          return (
            <Button color="dark" onClick={disconnect}>
              {truncate(account.address)}
            </Button>
          );

        return (
          <Button color="dark" onClick={openConnectModal}>
            Connect
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
