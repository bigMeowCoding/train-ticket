import "./high-speed.scss";
import React from "react";
import { FC } from "react";
import classNames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IndexPageState } from "../../interface/redux";
import { toggleHighSpeed } from "../../../index/redux/action";
const HighSpeed: FC = function () {
  const { highSpeed } = useSelector((state: IndexPageState) => {
    return {
      highSpeed: state.highSpeed,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div
        className="high-speed-switch"
        onClick={() => {
          dispatch(toggleHighSpeed());
        }}
      >
        <input type="hidden" name="highSpeed" value={String(highSpeed)} />
        <div
          className={classNames("high-speed-track", {
            checked: highSpeed,
          })}
        >
          <span
            className={classNames("high-speed-handle", {
              checked: highSpeed,
            })}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default HighSpeed;
