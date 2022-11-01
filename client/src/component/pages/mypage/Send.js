import React from "react";
import styled from "styled-components";

const SendBox = styled.div`
  position: relative;
  width: 100%;

  .mypageSendBox {
    display: flex;
    flex-direction: column;
    width: 100%;

    .mypageSendText {
      margin-bottom: 30px;
      font-size: 18px;
      font-weight: 500;
    }
    .mypageSendTV {
      .mypageSendIBox {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          width: 50px;
        }
        input {
          width: 300px;
          height: 20px;
          margin: 10px 0px 0px 10px;
        }
      }
      button {
        position: absolute;
        left: 50%;
        transform: translate(230px, -26px);
        width: 70px;
        height: 26px;
        border: none;
        color: white;
        background-color: rgb(82, 192, 255);
        cursor: pointer;
      }
    }
  }
`;

const Send = () => {
  return (
    <div></div>
    // <SendBox>
    //   <div className="mypageSendBox">
    //     <div className="mypageSendText">Send my token</div>
    //     <div className="mypageSendTV">
    //       <div className="mypageSendIBox">
    //         <div>To : </div>
    //         <input />
    //       </div>
    //       <div className="mypageSendIBox">
    //         <div>Value : </div>
    //         <input />
    //       </div>
    //       <button>send</button>
    //     </div>
    //   </div>
    // </SendBox>
  );
};

export default Send;
