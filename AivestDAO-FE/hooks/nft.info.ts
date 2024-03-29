export interface NftItem {
  name: string;
  img: string;
  description: string;
  address: string;
  tokenID: number;
  tokenStandard: string;
  chain: string;
  lastupdated: string;
  royalty: string;
  expirationDate: string;
  totalVolume: string;
  owners: string;
  floorPrice: string;
  chatUrl: string;
  isFree?: boolean;
}
const nftInfos = [
  {
    name: "胡子观币",
    img: "./nft/胡子观币.png",
    description: "以传统图表技术分析为基石，行业投研和社区DAO为两翼",
    address: "0x29f561e528AD59975d5cF4dd3A2c82901c80d6ce",
    tokenID: 1938,
    tokenStandard: "ERC-721",
    chain: "Eth Goerli",
    lastupdated: "15 hours ago",
    royalty: "6%",
    expirationDate: "2023/12/31",
    totalVolume: "300 ETH",
    owners: "3,000",
    floorPrice: "0.08 ETH",
    chatUrl: "https://aivestdao-chatbot.streamlit.app/01/?embed=true",
  },
  {
    name: "Coin Bureau",
    img: "./nft/coin_bureau.png",
    description:
      "An educational resource for navigating the cryptocurrency markets. News, reviews and extensive trading analysis.",
    address: "0x0bce6c2411cd4403baaa04855146a165f6da3552",
    tokenID: 857,
    tokenStandard: "ERC-721",
    chain: "Eth Goerli",
    lastupdated: "1day 4 hours ago",
    royalty: "6%",
    expirationDate: "2023/12/31",
    totalVolume: "300 ETH",
    owners: "3,000",
    floorPrice: "0.08 ETH",
    chatUrl: "https://aivestdao-chatbot.streamlit.app/02/?embed=true",
  },
];
export default nftInfos;

export const FreeNftList = [
  {
    name: "Bankless",
    img: "",
    description: "",
    address: "",
    tokenID: 0,
    tokenStandard: "ERC-721",
    chain: "Eth Goerli",
    lastupdated: "15 hours ago",
    royalty: "6%",
    expirationDate: "2023/12/31",
    totalVolume: "300 ETH",
    owners: "3,000",
    floorPrice: "0.08 ETH",
    chatUrl: "https://aivestdao-chatbot.streamlit.app/03/?embed=true",
    isFree: true,
  },
];
