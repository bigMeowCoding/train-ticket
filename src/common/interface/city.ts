export interface City {
  name: string;
}

export interface CitySection {
  title: string;
  citys: City[];
}
export type HotCities = City[];
export interface HttpReturnCityData {
  cityList: CitySection[];
  hotCities: HotCities[];
}
