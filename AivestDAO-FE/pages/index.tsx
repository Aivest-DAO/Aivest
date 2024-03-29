import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import HomeView from "../views/home_new";
import Chat from "../containers/chat";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [chatDisplay, setChatDisplay] = useState(false);

  function toggleChatDisplay() {
    setChatDisplay(!chatDisplay);
  }

  return (
    <>
      <HomeView></HomeView>
      <Chat display={chatDisplay}></Chat>
      {chatDisplay && (
        <div
          className={styles.mask}
          onClick={() => {
            toggleChatDisplay();
          }}
        ></div>
      )}
      {!chatDisplay && (
        <div className={styles.floating}>
          <div className={styles.card}>
            <img
              onClick={() => {
                toggleChatDisplay();
              }}
              width={'72'}
              style={{
                filter:'grayscale(0)'
              }}
              src="./chat_input.png"
              alt={'Ask me'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
