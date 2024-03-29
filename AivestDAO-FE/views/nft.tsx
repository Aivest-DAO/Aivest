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

export default function NFTView({ nftList }: { nftList: NftItem[] }) {
  const hasNFT = true;

  const [selectedNft, setSelectedNft] = useState<NftItem | null>(null);

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
          {selectedNft && !selectedNft.isFree && (
            <div className="nft-info">
              <>
                <div className="title">Profile</div>
                <div className="profile-detail">
                  <img src={selectedNft.img} style={{ width: "100%" }}></img>
                  <div className="sub-title">About &gt;</div>
                  <div className="description">{selectedNft.description}</div>
                  <br />

                  <div className="sub-title">Details &gt;</div>
                  {[
                    [
                      "Contract Address",
                      selectedNft.address.replace(
                        /^(.{6}).+(.{4})$/g,
                        "$1...$2"
                      ),
                    ],
                    ["Token ID", selectedNft.tokenID],
                    ["Token Standard", selectedNft.tokenStandard],
                    ["Chain", selectedNft.chain],
                    ["Last Updated", selectedNft.lastupdated],
                    ["Royalty", selectedNft.royalty],
                    ["Expiration Date", selectedNft.expirationDate],
                  ].map((arr, index) => {
                    return (
                      <div className="row">
                        <div className="col">{arr[0]}</div>
                        <div className="col">{arr[1]}</div>
                      </div>
                    );
                  })}

                  <br />

                  <div className="stats">
                    {[
                      [selectedNft.totalVolume, "Total Volume"],
                      [selectedNft.owners, "Owners"],
                      [selectedNft.floorPrice, "Floor Price"],
                    ].map((arr, index) => {
                      return (
                        <div className="stat">
                          <div className="num">{arr[0]}</div>
                          <div className="text">{arr[1]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            </div>
          )}

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
