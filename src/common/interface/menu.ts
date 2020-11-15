interface Option {
    title: string;
    value: string;
    active: boolean;
}

export interface MenuI {
  onPress: Function;
  options: Option[];
}
