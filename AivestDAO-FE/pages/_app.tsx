import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  zora
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";
import Script from "next/script";
import Menu from '../views/menu'
import './nft.css';
import { useRouter } from "next/router";
import { useEffect } from "react";
import '../styles/global.css'
import Footer from "../views/footer";
import './ai-chat.css';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "aivestDAO",
  projectId: "d3b0d4244da7bceafa5d0bd74ceeddcd",
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
});

const RainbowKitCustomTheme  = darkTheme({});
RainbowKitCustomTheme.colors.accentColor = '#ffffff';
RainbowKitCustomTheme.colors.accentColorForeground = '#262626';
RainbowKitCustomTheme.radii.connectButton = '20px';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(()=>{
    try{
      eval('window.resize()');
    } catch(e){

    }
  }, [router])
  return (
    <>
      <Head>
        <title>aivestDAO</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="shortcut icon" href="./favicon.ico" />
        <meta name="viewport" content="initial-scale=1,width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="./manifest.json" />
        <link rel="stylesheet" href="./Web3_AI_files/css" />
        <link href="./Web3_AI_files/main.1e617147.css" rel="stylesheet" />
      </Head>
      <Script src={"https://unpkg.com/swiper@8/swiper-bundle.min.js"}></Script>
      <Script src="./Web3_AI_files/main.65097c05.js"></Script>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={RainbowKitCustomTheme}>
          <main>
            <div id="app" style={{ display: "flex" }}>
              <Menu></Menu>
              <div id="sidebar">
                <div id="outline"></div>
              </div>
              <Component {...pageProps} />
              <Footer></Footer>
            </div>
            <Script src={"/global_new.js"}></Script>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
