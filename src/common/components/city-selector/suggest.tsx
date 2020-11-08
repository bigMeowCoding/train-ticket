import React, { FC, useEffect, useMemo, useState } from "react";
import SuggestItem from "./suggest-item";

const Suggest: FC<{
  searchKey: string;
}> = function ({ searchKey }) {
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("/api/search?key=" + encodeURIComponent(searchKey))
      .then((res) => res.json())
      .then((data) => {
        const { result, searchKey: sKey } = data;

        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey,
        },
      ];
    }

    return result;
  }, [result, searchKey]);
  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map((item) => {
          return <SuggestItem key={item.display} name={item.display} />;
        })}
      </ul>
    </div>
  );
};
export default Suggest;
