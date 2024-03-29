"use client";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'w3m-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
export default function Chat(props:{display:boolean}){
  return (
    <>
    <div id="root" style={{display: props?.display ? 'block' : 'none'}}>
      <main className="css-1ahbr6s">
        <div className="css-1je9xkw"><img src="./logo.png"/>
          <div className="user">
            <div className="connect">Connect</div>
          </div>
        </div>
        <w3m-modal></w3m-modal>
        <div className="css-12sgac9">
          <div id="chat-container" className="css-1la6f2k">
            <div className="ai css-qbpvcj" id="chat-1">
              <div className="ai css-zg2d96">W3AI</div>
              <div className="ai css-qzr8iz">
                <div className="css-11quyzq">Hi, I'm aivestDAO, your Web3 assistant. Feel free to ask me anything
                  about Web3 &amp; Crypto market.</div>
              </div>
            </div>
            <div className="css-1slfj0m">
              <div className="recommend-content"><span className="fire">
                </span>Pro-Bitcoin Florida man Francis Suarez enters presidential race</div>
              <div className="recommend-content">Bitcoin dips below $25K for the first time in 3 months</div>
              <div className="recommend-content">French financial markets ombudsman reports jump in crypto-related mediations
              </div>
            </div>
          </div>
          <div className="css-1hy2iyk">
            <div className="css-7k4wbq">
              <div className="css-nqiygf"><span>
                </span></div><input className="chat-input" placeholder="Input a message..." value=""/>
            </div>
            <div className="css-14iyp58"><img src="./Web3_AI_files/chat_button.png"/></div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}