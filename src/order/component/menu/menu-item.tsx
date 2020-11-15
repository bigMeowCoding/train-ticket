import React, { FC, memo } from "react";
import classNames from "classnames";
const MenuItem: FC<{
  active: boolean;
  onPress: Function;
  value: string;
  title: string;
}> = memo(function ({ title, value, active, onPress }) {
  return (
    <li
      className={classNames({ active })}
      onClick={() => {
        onPress(value);
      }}
    >
      {title}
    </li>
  );
});

export default MenuItem;
