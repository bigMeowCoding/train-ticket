import React, { FC, useCallback } from "react";

const AlphaIndex: FC<{
  alpha: string;
}> = function ({ alpha }) {
  return (
    <i
      className="city-index-item"
      onClick={() => {
        document.querySelector(`[data-cate='${alpha}']`)?.scrollIntoView(true);
      }}
    >
      {alpha}
    </i>
  );
};
export default AlphaIndex;
