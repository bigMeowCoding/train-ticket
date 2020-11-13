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
        const newCheckedMap = [...checkedMap];
        const findIndex = checkedMap.findIndex((item) => item.value === value);
        if (findIndex !== -1) {
          newCheckedMap.splice(findIndex, 1);
        } else {
          newCheckedMap.push({
            name,
            value,
          });
        }
        update(newCheckedMap);
      }}
    >
      {name}
    </li>
  );
});
export default Filter;
