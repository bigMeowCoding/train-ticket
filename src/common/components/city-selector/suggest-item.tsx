import React, { FC } from "react";
import { setSelectedCity } from "../../../index/redux/action";
import { useDispatch } from "react-redux";

const SuggestItem: FC<{
  name: string;
}> = function ({ name }) {
  const dispatch = useDispatch();
  return (
    <li
      className="city-suggest-li"
      onClick={() => {
        dispatch(setSelectedCity(name));
      }}
    >
      {name}
    </li>
  );
};

export default SuggestItem;
