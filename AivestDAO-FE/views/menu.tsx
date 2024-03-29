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
import { useAccount } from "wagmi";

export default function Menu() {
  const { isDesktopOrLaptop } = useResponsive();
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const { address } = useAccount();


  function toggleDrawer() {
    setShowDrawer(!showDrawer);
  }

  function toFairLaunch() {
    if(address) {
      router.push("/nft");
    }
    if(!isDesktopOrLaptop) {
      toggleDrawer();
    }
  }

  if (isDesktopOrLaptop) {
    return (
      <div
        id="menu"
        className="menu"
        style={{
          background: '#262626',
        }}>
        <div className="menu-wrapper">
          <div className="left">
            <img
              onClick={() => {
                router.push('/');
              }}
              style={{ cursor: 'pointer' }}
              className="logo"
              src="./logo.svg"
            />
            <span style={{ marginLeft: '1em', color: '#ffffff', fontSize: '22px' }}>aivestDAO</span>
          </div>
          <div
            className="middle"
            style={{
              width: '300px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
            }}>
            <div
              className={'link' + (router.pathname === '' ? ' active' : '')}
              title="Coming Soon"
              onClick={() => {
                window.open('https://aivestdao.gitbook.io/aivestdao-whitepaper/');
              }}>
              Docs
            </div>
            <div
              className={'link' + (router.pathname === '/ai-chat' ? ' active' : '')}
              title="Coming Soon"
              onClick={() => {
                router.push('/ai-chat');
              }}>
              AI Models
            </div>
            <div
              className={'link' + (router.pathname === '/nft' ? ' active' : '')}
              title="Coming Soon"
              onClick={toFairLaunch}
            >
              Fair Launch
            </div>
          </div>
          <div className="right">
            {typeof window != 'undefined' && <ConnectButton showBalance={false} style={{}}></ConnectButton>}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="menu" className="menu">
        <div className="menu-wrapper" style={{ padding: "0 12px" }}>
          <div className="left">
            <img
              onClick={() => {
                router.push("/");
              }}
              style={{ cursor: "pointer" }}
              className="logo"
              src="./logo.svg"
            />
          </div>
          <div className="right">
            <MenuIcon onClick={toggleDrawer}></MenuIcon>
            <Drawer
              anchor={"right"}
              open={showDrawer}
              onClose={() => toggleDrawer()}
              PaperProps={{
                style: {
                  background: "#000000",
                },
              }}
            >
              <div data-rk>
                <ConnectButton showBalance={false}></ConnectButton>
              </div>
              <div className="nav">
                <div
                  className={"link" + (router.pathname === "" ? " active" : "")}
                  title="Coming Soon"
                  onClick={() => {
                    window.open(
                      "https://aivestdao.gitbook.io/aivestdao-whitepaper/"
                    );
                    toggleDrawer();
                  }}
                >
                  Docs
                </div>
                <div
                  className={"link" + (router.pathname === "" ? " active" : "")}
                  title="Coming Soon"
                >
                  AI Models
                </div>
                <div
                  className={
                    "link" + (router.pathname === "/nft" ? " active" : "")
                  }
                  title="Coming Soon"
                  onClick={toFairLaunch}
                >
                  Fair Launch
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}
