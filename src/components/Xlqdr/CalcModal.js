import React, { useEffect, useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../../hooks/useWeb3";
import BigNumber from "bignumber.js";
import Modal from "react-modal";
import { useBuyTickets } from "../../hooks/useBuyTickets";
import { fetchDiscountData } from "../../utils/fetchLotteryData";

import "./CalcModal.scss";

Modal.setAppElement("#root");

const CalcModal = ({ isOpen, setIsOpen, lqdrApr, ftmApr, isLQDR }) => {
  const [amount, setAmount] = useState(0);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgb(0 0 0 / 70%)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          color: "#ffffff",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "95%",
          maxWidth: "480px",
          width: "80%",
          background: "rgba(3, 6, 41, 0.72)",
          border: "1px solid #083258",
          borderRadius: "24px",
          padding: "20px",
        },
      }}
    >
      <div className="calc-modal">
        <div className="title-wrap">
          <p>APR in {isLQDR ? "LQDR" : "FTM"}</p>
          <svg
            onClick={closeModal}
            width={23}
            height={23}
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.69971 5.69992L17.0996 17.0999"
              stroke="#4DD9F6"
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.0996 5.69995L5.69971 17.0999"
              stroke="#4DD9F6"
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="calc-desc">
          You input your number of weeks locked and it tells you your value.
        </div>
        <div className="input-wrap" style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : null)
            }
          />
          <div className="max-btn">Weeks</div>
        </div>

        <div className="spend">
          APR in {isLQDR ? "LQDR" : "FTM"}:
          <span className="lqdr-blue">
            {(isLQDR ? lqdrApr : ftmApr)
              .times(amount || 0)
              .div(104)
              .toFormat(2)}
            %
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default CalcModal;
