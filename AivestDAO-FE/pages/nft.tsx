'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import NFTView from '../views/nft';
import NFTNewView from '../views/nft_new';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork, useContractReads, useContractRead, useContractWrite } from 'wagmi';
import nftAbi from '../abis/nft.json';
import newNftAbi from '../abis/ERC20TokenFactory.json';
import nftInfos, { FreeNftList } from '../hooks/nft.info';
import ERC20TokenFactory from '../abis/ERC20TokenFactory.json';
import ERC20Token from '../abis/ERC20Token.json';

const targetAddress = '0xc4228c769948Ac5E562D07c234856B154897720f';

const NFT: NextPage = () => {
  const { address } = useAccount();
  const [HexList, setHexList] = useState([]);
  const resultHex = useContractRead({
    address: targetAddress,
    abi: ERC20TokenFactory.abi,
    functionName: 'getDeployedTokens',
    onSuccess(data) {
      data && setHexList(data as any);
    },
  });
  console.log(resultHex, 'resultHex--');
  const menuRes = useContractReads({
    contracts: HexList.map(v => {
      return {
        address: v,
        abi: ERC20Token.abi,
        functionName: 'name',
        args: [],
      };
    }) as any,
  }) || { data: [] };
  const { data: menuList } = menuRes;
  // 查 Total supply
  const totalSupplyRes = useContractReads({
    contracts: HexList.map(v => {
      return {
        address: v,
        abi: ERC20Token.abi,
        functionName: 'totalSupply',
        args: [],
      };
    }) as any,
  }) || { data: [] };
  const { data: totalSupplyList } = totalSupplyRes;

  const tableList = useMemo(() => {
    if (!menuList || !totalSupplyList || !HexList) {
      return [];
    }
    return menuList.map((v, i) => {
      return {
        name: v.result,
        tokenPrice: '1 Aivest',
        address: HexList[i],
        marketCap: totalSupplyList && totalSupplyList[i].result?.toString(),
        monthlyReturn: 0,
        totalReturn: 0,
        maxDrawdown: 0,
        Holders: 0,
      };
    });
  }, [menuList, totalSupplyList, HexList]);

  console.log(tableList, 'tableList--');
  if (!tableList?.length) {
    return (
      <main className="main-container">
        <div
          style={{
            textAlign: 'center',
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div>Oops, you don&apos;t have AivestDAO NFT yet.</div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* <NFTView nftList={nftList}></NFTView> */}
      <NFTNewView nftList={tableList}></NFTNewView>
    </>
  );
};

export default NFT;
