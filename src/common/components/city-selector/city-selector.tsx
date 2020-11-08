import "./city-selector.scss";
import React, { FC, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TicketState } from "../../interface/redux";
import classnames from "classnames";
import { hideCitySelector } from "../../../index/redux/action";

const CitySelector: FC<{ onBack: () => void }> = function ({ onBack }) {
  const { isCitySelectorVisible } = useSelector(
    (state: TicketState) => ({
      isCitySelectorVisible: state.isCitySelectorVisible,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  function back() {
    dispatch(hideCitySelector());
  }
  return (
    <div
      className={classnames([
        "city-selector",
        {
          hidden: !isCitySelectorVisible,
        },
      ])}
    >
      <div className="city-search">
        <div
          className="search-back"
          onClick={() => {
            back();
          }}
        >
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            placeholder="城市"
          />
        </div>
        <i
          className={classnames("search-clean", {
            hidden: searchKey.length === 0,
          })}
          onClick={() => {
            setSearchKey("");
          }}
        >
          &#xf063;
        </i>
      </div>
    </div>
  );
};

export default CitySelector;
