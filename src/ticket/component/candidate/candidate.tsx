import React, { useCallback, useState } from "react";
import { FC, memo } from "react";
import "./candidate.scss";
import Seat from "./seat";
const Candidate: FC<{
  tickets: any[];
}> = memo(function ({ tickets }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const onToggle = useCallback(
    (idx) => {
      setExpandedIndex(idx === expandedIndex ? -1 : idx);
    },
    [expandedIndex]
  );
  return (
    <div className="candidate">
      <ul>
        {tickets.map((ticket, idx) => {
          return (
            <Seat
              idx={idx}
              onToggle={onToggle}
              expanded={expandedIndex === idx}
              {...ticket}
              key={ticket.type}
            />
          );
        })}
      </ul>
    </div>
  );
});
export default Candidate;
