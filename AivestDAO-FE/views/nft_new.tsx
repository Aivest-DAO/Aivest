'use client';
import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import Chat from '../containers/chat';
import dynamic from 'next/dynamic';
import { NftItem } from '../hooks/nft.info';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { useAccount, useContractRead, useContractReads, useContractWrite, useBalance } from 'wagmi';
import ERC20TokenFactory from '../abis/ERC20TokenFactory.json';
import ERC20Token from '../abis/ERC20Token.json';
const factoryAddress = '0xc4228c769948Ac5E562D07c234856B154897720f';
const aiAddress = '0x7Db08f3CBC952ddA4071b731386797FB03969b32';

/*
  ai token
  0x7Db08f3CBC952ddA4071b731386797FB03969b32

  factory
  0x1862DD2FFCb293E3Abc47f3c550b0140F1994a0E
*/
// 创建暗黑模式的主题
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function NFTView({ nftList }: { nftList: any[] }) {
  const [balance, setBalance] = useState();
  const { address, isConnected, status } = useAccount();
  // console.log(balance, 'balance---');
  const [targetItAddress, setTargetItAddress] = useState('');
  const [targetAppAddress, setTargetAppAddress] = useState('');
  const res = useContractRead({
    address: aiAddress,
    abi: ERC20Token.abi,
    args: [address, factoryAddress],
    functionName: 'allowance',
    onSuccess(data) {
      data && setBalance(data as any);
    },
  });
  const { write: buy } = useContractWrite({
    address: factoryAddress as any,
    abi: ERC20TokenFactory.abi,
    functionName: 'buy',
    args: [],
    onSuccess(data) {
      console.log('Success-buy', data);
    },
  });

  const { data, write: approveWrite } = useContractWrite({
    address: aiAddress as any,
    abi: ERC20Token.abi,
    functionName: 'approve',
    args: [],
    onSuccess(data) {
      console.log('Success-approve', data);
      console.log('buy-start');
      buy({
        args: [targetItAddress, BigInt(1)],
      });
    },
  });

  // useEffect(() => {
  //    buy({
  //      args: [targetAppAddress, BigInt(Number(1))],
  //    });
  // }, [targetAppAddress]);

  const clickFunc = row => {
    setTargetItAddress(row.address);
    approveWrite({
      args: [factoryAddress, BigInt(1e18)],
    });
  };
  function clearbuy() {
    buy({
      args: ['0x3069Bd3B1B6c92BC46c5c02046CeC2F013e3C849', 1],
    });
  }

  return (
    <main className="main-container nft-new-page">
      <div className="main px-[64px] py-[34px] text-white">
        <ThemeProvider theme={darkTheme}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Token price</TableCell>
                  <TableCell align="right">Market cap</TableCell>
                  <TableCell align="right">Monthly return</TableCell>
                  <TableCell align="right">Total return</TableCell>
                  <TableCell align="right">Max drawdown</TableCell>
                  <TableCell align="right">Holders</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nftList.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.tokenPrice}</TableCell>
                    <TableCell align="right">{row.marketCap}</TableCell>
                    <TableCell align="right">{row.monthlyReturn || '-'}</TableCell>
                    <TableCell align="right">{row.totalReturn || '-'}</TableCell>
                    <TableCell align="right">{row.maxDrawdown || '-'}</TableCell>
                    <TableCell align="right">{row.Holders}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={() => clickFunc(row)}>
                        Buy
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      </div>
    </main>
  );
}
