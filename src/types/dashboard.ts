
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  unreadMessages: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string | null;
}
