import "./city-selector.scss";
import React, { FC, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TicketState } from "../../interface/redux";
import classnames from "classnames";
import { fetchCityData, hideCitySelector } from "../../../index/redux/action";
import CityList from "./city-list";

const CitySelector: FC<{ onBack: () => void }> = function ({ onBack }) {
  const { isCitySelectorVisible, isLoadingCityData, cityData } = useSelector(
    (state: TicketState) => {
      return {
        isCitySelectorVisible: state.isCitySelectorVisible,
        cityData: state.cityData,
        isLoadingCityData: state.isLoadingCityData,
      };
    },
    shallowEqual
  );
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (isCitySelectorVisible && !isLoadingCityData && !cityData) {
      dispatch(fetchCityData());
    }
  }, [isCitySelectorVisible, isLoadingCityData, cityData]);

  function back() {
    dispatch(hideCitySelector());
  }

  const outputCitySections = () => {
    if (isLoadingCityData) {
      return <div>loading</div>;
    }

    if (cityData) {
      return <CityList sections={cityData.cityList} />;
    }

    return <div>error</div>;
  };
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
      {outputCitySections()}
    </div>
  );
};

export default CitySelector;
