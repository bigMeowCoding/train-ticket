import "./nav.scss";
import { FC, memo, useCallback, useMemo } from "react";
import React from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import removeDateTimes from "../../utils/remove-date-times";
import { setDepartDate } from "../../../query/redux/action";

const Nav: FC<{ date: number }> = memo(function ({ date }) {
  const dispatch = useDispatch();
  const isPrevDisabled = removeDateTimes(date) <= removeDateTimes();
  const isNextDisabled =
    removeDateTimes(date) - removeDateTimes() > 20 * 86400 * 1000;
  const prev = useCallback(
    function () {
      if (isPrevDisabled) {
        return;
      }
      dispatch(setDepartDate(removeDateTimes(date) - 86400 * 1000));
    },
    [date,isPrevDisabled]
  );
  const next = useCallback(
    function () {
        console.log('next')
      if (isNextDisabled) {
        return;
      }
      dispatch(setDepartDate(removeDateTimes(date) + 86400 * 1000));
    },
    [date,isNextDisabled]
  );

  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format("M月D日 ") + d.locale("zh-cn").format("ddd");
  }, [date]);

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classNames("nav-prev", {
          "nav-disabled": isPrevDisabled,
        })}
      >
        前一天
      </span>
      <span className="nav-current">{currentString}</span>
      <span
        onClick={next}
        className={classNames("nav-next", {
          "nav-disabled": isNextDisabled,
        })}
      >
        后一天
      </span>
    </div>
  );
});

export default Nav;
