import React from "react";
import { FC } from "react";
import CitySection from "./city-section";
import { CitySection as Section } from "../../interface/city";
const CityList: FC<{
  sections: Section[];
}> = function ({sections}) {
    console.log(sections)
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
    </div>
  );
};

export default CityList;
