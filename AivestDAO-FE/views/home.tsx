"use client";
import Image from "next/image";
import Script from "next/script";
// import {ConnectButton} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
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
import Menu from "./menu";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <div id="page-container" style={{ margin: "0 auto" }}>
        <div className="swiper-wrapper">
          {
            new Array(13).fill(0)
            .map((item, index)=>{
              return <img className="swiper-slide" src={`./home/${index+1}.png`} key={index}></img>
            })
          }
        </div>
      </div>
    </div>
  );
}
