import React, {FC, memo, useCallback} from "react";

const AlphaIndex: FC<{
  alpha: string;
}> = memo(function ({ alpha }) {
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
});
export default AlphaIndex;
