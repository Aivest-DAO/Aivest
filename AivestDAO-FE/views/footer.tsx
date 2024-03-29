import { useResponsive } from "../hooks/useResponsive";
import { Drawer } from "@mui/material";
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
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Footer() {
  const { isDesktopOrLaptop } = useResponsive();
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  function toggleDrawer() {
    setShowDrawer(!showDrawer);
  }

  if (isDesktopOrLaptop) {
    return (
      <div id="footer" className="footer">
        <div className="social">
          <div className="social-logo">
            <img
              onClick={() => {
                router.push("/");
              }}
              style={{ cursor: "pointer" }}
              className="logo"
              src="./logo.svg"
            />
            <span
              style={{ marginLeft: ".2em", color: "#ffffff", fontSize: "22px" }}
            >
              aivestDAO
            </span>
          </div>
          <div className="media">
            <img
              src="./social/Twitter.svg"
              onClick={() => {
                window.open("https://twitter.com/aivestDAO");
              }}
            ></img>
          </div>
          <div className="media">
            <img
              src="./social/Discord.svg"
              onClick={() => {
                window.open("https://discord.gg/spuZSTUGbc");
              }}
            ></img>
          </div>
        </div>
        <div className="copyright">2023 Copyright aivestDAO Limited</div>
      </div>
    );
  } else {
    return (
      <div id="footer" className="footer">
        <div className="social">
          <img
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
            className="logo"
            src="./logo.svg"
          />
          <span
            style={{ marginLeft: ".2em", color: "#ffffff", fontSize: "22px" }}
          >
            aivestDAO
          </span>
          <div className="media">
            <img
              src="./social/Twitter.svg"
              onClick={() => {
                window.open("https://twitter.com/aivestDAO");
              }}
            ></img>
          </div>
          <div className="media">
            <img
              src="./social/Discord.svg"
              onClick={() => {
                window.open("https://discord.gg/spuZSTUGbc");
              }}
            ></img>
          </div>
        </div>
        <div className="copyright">2023 Copyright aivestDAO Limited</div>
      </div>
    );
  }
}
