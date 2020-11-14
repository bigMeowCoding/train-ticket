import React, { FC, memo } from "react";
import classNames from "classnames";
import {
  StationType,
  TicketType,
  TrainType,
} from "../../../common/interface/ticket";
const Filter: FC<
  {
    checked: boolean;
    update: Function;
    checkedMap: TicketType[] | TrainType[] | StationType[];
  } & TrainType &
    TicketType &
    StationType
> = memo(function ({ checked, update, name, value, checkedMap }) {
  return (
    <li
      className={classNames({ checked })}
      onClick={() => {
        update({
          type: "toggle",
          payload: {
            name,
            value,
          },
        });
      }}
    >
      {name}
    </li>
  );
});
export default Filter;
