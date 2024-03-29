"use client";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import Chat from "../containers/chat";
import dynamic from "next/dynamic";
import { NftItem } from "../hooks/nft.info";
const ConnectButton = dynamic(
  async () => {
    const { ConnectButton: Component } = await import("@rainbow-me/rainbowkit");
    return { default: Component };
  },
  {
    ssr: false,
  }
);

export default function BanklessView({ nftList }: { nftList: NftItem[] }) {
  const hasNFT = true;

  const [selectedNft, setSelectedNft] = useState<NftItem | null>(nftList?.[0]||null);

  return (
    <main className="main-container nft-page">
      <div className="nft-view">
        <div className="nft-select">
          <div className="title">AI NFT</div>
          <div className="nft-list">
            {nftList?.length &&
              nftList?.map((item, index) => {
                return (
                  <div
                    className={
                      "nft-item" +
                      (item.name == selectedNft?.name ? " selected" : "")
                    }
                    key={index}
                    onClick={() => {
                      setSelectedNft(nftList[index]);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="nft-details">
          <div className="nft-info">
            <div className="title">Read Before You Chat</div>
            <div className="bankless-notice">
              1. Please be aware that each IP address is limited to asking 5
              questions, use them wisely;
              <br />
              <br />
              2. Participate in the $100,000 Token Airdrop by asking the Bankless
              chatbot and stand a chance to become an OG, winning freemint NFTs;
              <br />
              <br />
              3. For more information on giveaways and airdrops, join our Discord
              community: <a className="link" href="https://discord.com/invite/jPCjFvef" target="_blank">https://discord.com/invite/jPCjFvef</a>
            </div>
          </div>

          <div className="nft-chat">
            {selectedNft && (
              <>
                <div className="title">Let's Chat</div>
                <div className="chat-view">
                  <iframe
                    src={selectedNft.chatUrl}
                    style={{ width: "100%", height: "100%" }}
                  ></iframe>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
