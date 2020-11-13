import React from "react";
import { FC, memo } from "react";
import Filter from "./filter";
import {
  StationType,
  TicketType,
  TrainType,
} from "../../../common/interface/ticket";

const Option: FC<{
  title: string;
  options: TicketType[] | TrainType[] | StationType[];
  checkedMap: TicketType[] | TrainType[] | StationType[];
  update: Function;
}> = memo(function ({ title, options, checkedMap, update }) {
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map((option) => {
          return (
            <Filter
              key={option.value}
              {...option}
              update={update}
              checkedMap={checkedMap}
              checked={!!checkedMap.find((item) => item.value === option.value)}
            />
          );
        })}
      </ul>
    </div>
  );
});
export default Option;
