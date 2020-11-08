import React, { FC } from "react";
import "./journey.scss";
import switchImg from "../../imgs/switch.svg";
import { useDispatch } from "react-redux";
import { showCitySelector } from "../../redux/action";
const Journey: FC<{
  from: string;
  to: string;
  exchangeFromTo: () => void;
}> = ({ from, to, exchangeFromTo }) => {
  const dispatch = useDispatch();

  function changeLeftTrain() {
    dispatch(showCitySelector(true));
  }

  function changeRightTrain() {
    dispatch(showCitySelector(false));
  }
  return (
    <div className="journey">
      <div className="journey-station" onClick={changeLeftTrain}>
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
      <div className="journey-station" onClick={changeRightTrain}>
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
};
export default Journey;
