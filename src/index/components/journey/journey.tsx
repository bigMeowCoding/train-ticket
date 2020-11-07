import React from "react";
import "./journey.scss";
import switchImg from "../../imgs/switch.svg";

export default function Journey(props: {
  from: string;
  to: string;
  exchangeFromTo: () => void;
}) {
  const { from, to, exchangeFromTo } = props;
  return (
    <div className="journey">
      <div className="journey-station">
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div className="journey-station">
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  );
}
