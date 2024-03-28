// models.ts
export interface LaundryService {
  estimated_completion_date: string;
  is_weight: boolean;
  is_monthly: boolean;
  is_piece: boolean;
  weight: number;
  client_id: string;
  items: LaundryItem[];
}

export interface LaundryItem {
  laundry_item_id: string;
  item_quantity: number;
}

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
}

export interface CreateItem {
  name: string;
  price: string;
}

export interface CreateClient {
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  is_monthly: boolean;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  number: string;
  complement: string;
  landmark: string;
  monthly_date: string,
}
