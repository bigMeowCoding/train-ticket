import React, { FC } from "react";
import CityItem from "./city-item";
import { City } from "../../interface/city";

const CitySection: FC<{ title: string; cities: City[] }> = function ({
  title,
  cities,
}) {
  console.log(cities);
  return (
    <ul className="city-ul" data-cate={title}>
      <li className="city-li" key="title">
        {title}
      </li>
      {cities && cities.length
        ? cities.map((city) => {
            return <CityItem key={city.name} name={city.name} />;
          })
        : null}
    </ul>
  );
};

export default CitySection;
