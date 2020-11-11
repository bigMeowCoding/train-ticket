import React from "react";
import { FC, memo } from "react";
import ListItem from "./list-item";
import "./list.scss";
const List: FC<{ list: any[] }> = memo(function ({ list }) {
  return (
    <ul className="list">
      {list.map((item) => (
        <ListItem {...item} key={item.trainNumber} />
      ))}
    </ul>
  );
});

export default List;
