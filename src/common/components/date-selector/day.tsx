import React, { FC, useCallback } from "react";
import classNames from "classnames";
import removeDateTimes from "../../utils/remove-date-times";
import { useDispatch } from "react-redux";
import { hideDateSelector, setDepartDate } from "../../../index/redux/action";
const Day: FC<{ day: number }> = function ({ day }) {
  const dispatch = useDispatch();
  const onSelect = useCallback((day: number) => {
    if (!day) {
      return;
    }

    if (day < removeDateTimes()) {
      return;
    }

    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, []);

  if (!day) {
    return <td className="null"></td>;
  }
  const classes: string[] = [];
  const now = removeDateTimes();

  if (day < now) {
    classes.push("disabled");
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push("weekend");
  }
  const dateString = now === day ? "今天" : new Date(day).getDate();

  return (
    <td className={classNames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  );
};
export default Day;
