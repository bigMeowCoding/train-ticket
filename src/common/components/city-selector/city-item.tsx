import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCity } from "../../../index/redux/action";

const CityItem: FC<{ name: string }> = function ({ name }) {
  const dispatch = useDispatch();

  return (
    <li
      className="city-li"
      onClick={() => {
        dispatch(setSelectedCity(name));
      }}
    >
      {name}
    </li>
  );
};

export default CityItem;
