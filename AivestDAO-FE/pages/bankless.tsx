import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import NFTView from "../views/bankless";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useNetwork, useContractReads } from "wagmi";
import nftAbi from "../abis/nft.json";
import nftInfos, {FreeNftList} from "../hooks/nft.info";

const Bankless: NextPage = () => {
  const [chatDisplay, setChatDisplay] = useState(false);

  function toggleChatDisplay() {
    setChatDisplay(!chatDisplay);
  }

  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();

  /* jshint ignore:start*/

  /* jshint ignore:end*/
  const nftList = FreeNftList;

  // if (!isConnected || chain?.unsupported) {
  //   return (
  //     <main className="main-container">
  //       <div
  //         style={{
  //           textAlign: "center",
  //           height: "80vh",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <ConnectButton showBalance={false}></ConnectButton>
  //       </div>
  //     </main>
  //   );
  // }

  if (!nftList?.length) {
    return (
      <main className="main-container">
        <div
          style={{
            textAlign: "center",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Oops, you don&apos;t have AivestDAO NFT yet.</div>
        </div>
      </main>
    );
  }

  return (
    <>
      <NFTView nftList={nftList}></NFTView>
    </>
  );
};

export default Bankless;
