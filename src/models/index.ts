// models.ts
export interface LaundryService {
    estimated_completion_date: string;
    is_weight: boolean;
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
  