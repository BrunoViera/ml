export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export type ListItem = {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  category_id: string;
  state_name: string;
};

export type Item = {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: Boolean;
  category_id: string;
  sold_quantity: number;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  path_from_root?: Category[];
  getPath(): string[];
};
