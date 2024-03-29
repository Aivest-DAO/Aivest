'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Checkbox, Form, Input } from 'antd';
import { useContractRead, useContractReads, useContractWrite, useAccount, useNetwork } from 'wagmi';
import ERC20Token from '../abis/ERC20Token.json';
import ERC20TokenFactory from '../abis/ERC20TokenFactory.json';
const targetAddress = '0xc4228c769948Ac5E562D07c234856B154897720f';
// const targetHost = 'http://198.18.0.1:8501';
const targetHost = 'https://aivestdao-chatbot.streamlit.app';
// const targetHost = 'https://aivestdao-chatbot-2024-01-24-53aappfpj5qqfh2gxfauwpk.streamlit.app';
// const targetUrl = 'http://198.18.0.1:8501/03/?embed=true';
const targetUrl = 'https://aivestdao-chatbot.streamlit.app/03/?embed=true';
// const targetUrl = 'https://aivestdao-chatbot-2024-01-24-53aappfpj5qqfh2gxfauwpk.streamlit.app/03/?embed=true';
console.log('sta----')
const AiChatPage: NextPage = () => {
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
  const { data: menuList, isError: menuListError, isLoading: menuListLoading } = menuRes;

  const [formData, setFormData] = useState({} as any);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: targetAddress,
    abi: ERC20TokenFactory.abi,
    functionName: 'createERC20Token',
    args: [],
    onSuccess(data) {
      console.log('Success', data);
      setIsSubmit(true);
    },
  });
  console.log(isLoading, 'isLoading', data);
  const [launchModalShow, setLaunchModalShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish = (values: any) => {
    setFormData(values);
    write({
      args: [values.tokenName, values.symbol, Number(values.decimals) % 256, BigInt(Number(values.supply) || 0)],
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    window.onmessage = e => {
      // 通过 origin 对消息进行过滤，避免遭到 XSS 攻击
      if (e.origin === targetHost) {
        if (e.data.event === 'openLaunchModal') {
          setTimeout(() => {
            setLaunchModalShow(true);
          }, 400);
        }
      }
    };
  }, []);

  function test() {
    const iframeChild = document.getElementById('iframe-ai') as any;
    if (iframeChild) {
      iframeChild?.contentWindow?.postMessage?.({ event: 'change' }, targetUrl);
      // iframeChild?.contentWindow?.postMessage?.('hello, child!', 'http://localhost:3000/child.html');
    }
  }
  if (!address) {
    return (
      <div>
        <div className="chat-ai-wrap">
          <div className="iframe-wrap">
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Modal
        open={launchModalShow}
        wrapClassName="modal-ai-chat-wrap"
        footer={null}
        closeIcon={false}
        width={800}
        // onOk={handleOk}
        onCancel={() => {
          // setLaunchModalShow(false);
        }}>
        <div className="main px-[64px] py-[34px] text-white">
          {isSubmit ? (
            <div className="sub-main-wrap">
              <div className="title">You have launched your model successfully</div>
              <div className="flex w-full mt-2 sub-main">
                <Button
                  type="primary"
                  className="btn"
                  onClick={() => {
                    setLaunchModalShow(false);
                    setIsSubmit(false);
                  }}>
                  Back to chat
                </Button>
              </div>
            </div>
          ) : (
            <Form layout="vertical" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
              <Form.Item
                label="Token name"
                name="tokenName"
                rules={[{ required: true, message: 'Please input your Token name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Symbol"
                name="symbol"
                rules={[{ required: true, message: 'Please input your Symbol!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Decimals"
                name="decimals"
                rules={[{ required: true, message: 'Please input your Decimals!' }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Total supply"
                name="supply"
                rules={[{ required: true, message: 'Please input your Total supply!' }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <div className="flex w-full mt-2">
                  <Button
                    type="primary"
                    className="mr-8 btn"
                    onClick={() => {
                      setLaunchModalShow(false);
                      setIsSubmit(false);
                    }}>
                    Back to chat
                  </Button>
                  <Button loading={isLoading} type="primary" className="btn" htmlType="submit">
                    Launch model
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </div>
      </Modal>

      <div className="chat-ai-wrap">
        <div className="menu-list">
          <div
            className="it title"
            onClick={() => {
              // setLaunchModalShow(true);
            }}>
            Token Name
          </div>
          {menuList?.map?.((v: any, i) => {
            return (
              <div className="it" key={`${v?.result}${i}`}>
                {v?.result}
              </div>
            );
          })}
        </div>
        <div className="iframe-wrap">
          {/* <iframe id='iframe-ai' src="https//aivestdao-chatbot.streamlit.app/~/+/03/?embed=true"></iframe> */}
          {/* <iframe id="iframe-ai" src={targetUrl}></iframe> */}
          <iframe id="iframe-ai" src={targetUrl}></iframe>
          {/* <iframe  id='iframe-ai' src="http://localhost:3000/child.html"></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;
