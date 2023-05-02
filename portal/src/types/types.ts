type Author = {
  name: string;
  lastname: string;
};

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

export type ItemsResponse = {
  author: Author;
  categories: string[];
  items: ListItem[];
};

export type ItemResponse = {
  author: Author;
  item?: Item;
};

export type CategoryResponse = {
  author: Author;
  categoryPath: string[];
};
