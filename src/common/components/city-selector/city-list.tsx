import React from "react";
import { FC } from "react";
import CitySection from "./city-section";
import { CitySection as Section } from "../../interface/city";
import AlphaIndex from "./apha-index";
const CityList: FC<{
  sections: Section[];
}> = function ({ sections }) {
  const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
  });
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map((section) => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
            />
          );
        })}
      </div>

      <div className="city-index">
        {alphabet.map((alpha) => {
          return <AlphaIndex key={alpha} alpha={alpha} />;
        })}
      </div>
    </div>
  );
};

export default CityList;
