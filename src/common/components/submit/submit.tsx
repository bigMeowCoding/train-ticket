import React, { memo } from "react";
import "./submit.scss";

const Submit = memo(function () {
  return (
    <div className="submit">
      <button type="submit" className="submit-button">
        搜索
      </button>
    </div>
  );
});

export default Submit;
