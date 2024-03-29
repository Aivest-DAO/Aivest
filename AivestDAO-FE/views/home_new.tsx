"use client";
import Image from "next/image";
import Script from "next/script";
// import {ConnectButton} from "@rainbow-me/rainbowkit";
import { useEffect, useMemo, useState } from "react";
import Chat from "../containers/chat";
import dynamic from "next/dynamic";
const ConnectButton = dynamic(
  async () => {
    const { ConnectButton: Component } = await import("@rainbow-me/rainbowkit");
    return { default: Component };
  },
  {
    ssr: false,
  }
);
import { useRouter } from "next/router";
import { useResponsive } from "../hooks/useResponsive";

const Partnership = function () {
  const { isDesktopOrLaptop, isTabletOrMobile } = useResponsive();
  const router = useRouter();
  const tabs = [
    {
      img: "./home/hunter.svg",
      label: "Airdrop Hunter",
      content: [
        {
          img: "./home/hunter-1.png",
          label: "@AirdropAlert",
        },
        {
          img: "./home/hunter-2.png",
          label: "@Ed_x0101",
        },
        {
          img: "./home/hunter-3.png",
          label: "@maid_crypto",
        },
        {
          img: "./home/hunter-4.png",
          label: "@Sandyy_06",
        },
        {
          img: "./home/hunter-5.png",
          label: "@WukongDiscover",
        },
      ],
    },
    {
      img: "./home/patterns.svg",
      label: "Chart Patterns",
      content: [
        {
          img: "./home/patterns-1.png",
          label: "@0xNing0x",
        },
        {
          img: "./home/patterns-2.png",
          label: "@BitcoinZhong",
        },
        {
          img: "./home/patterns-3.png",
          label: "@BTC521",
        },
        {
          img: "./home/patterns-4.png",
          label: "@Dahuzi_eth",
        },
        {
          img: "./home/patterns-5.png",
          label: "@tocuee",
        },
      ],
    },
    {
      img: "./home/portal.svg",
      label: "Information Portal",
      content: [
        {
          img: "./home/portal-1.png",
          label: "@coinbureau",
        },
        {
          img: "./home/portal-2.png",
          label: "@gazza_jenks",
        },
        {
          img: "./home/portal-3.png",
          label: "@Liqquidity",
        },
        {
          img: "./home/portal-4.png",
          label: "@saylor",
        },
        {
          img: "./home/portal-5.png",
          label: "@Tom Mitchelhill",
        },
      ],
    },
  ];
  const [activeTabLabel, setActiveTabLabel] = useState("Airdrop Hunter"); // Airdrop Hunter, Chart Patterns, Information Portal

  const activeContent = useMemo(() => {
    return tabs.find((item) => item.label === activeTabLabel)?.content || [];
  }, [activeTabLabel]);

  return (
    <div className="partnership">
      <div className="partnership-tabs">
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {tabs.map((item) => {
            return (
              <div
                className={
                  "partnership-tab" +
                  (item.label === activeTabLabel ? " active" : "")
                }
                onClick={() => {
                  setActiveTabLabel(item.label);
                }}
              >
                <img src={item.img}></img>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>
        {isDesktopOrLaptop && (
          <div
            className="link"
            title="Coming Soon"
            onClick={() => {
              router.push("/nft");
            }}
          >
            Chat With our AI NFTs
          </div>
        )}
      </div>
      {isTabletOrMobile && (
        <div
          className="link"
          title="Coming Soon"
          onClick={() => {
            router.push("/nft");
          }}
        >
          Chat With our AI NFTs
        </div>
      )}
      <div className="partnership-contents">
        {activeContent.map((item) => {
          return (
            <div className="partnership-content">
              <img src={item.img}></img>
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
      }}
      className="main-container"
    >
      <div className="intro">
        <div className="background-video-wrapper">
          <div className="background-video-box">
            <video
              className="background-video"
              src="./background.mp4"
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
        <div className="intro-title">
          New AI Experience Across The Decentralized
          <br />
          Community of Crypto Investors
        </div>
        <div className="intro-description">
          Share your crypto information and get rewards.
          <br /> Access investing insights from crypto experts all over the
          world.
          <br /> Ask for investing suggestions/decisions with AI NFT.
        </div>
      </div>
      <div>
        <Partnership></Partnership>
      </div>
    </div>
  );
}
