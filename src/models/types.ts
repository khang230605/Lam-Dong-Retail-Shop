export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  parent_id?: number | null;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  type: 'new' | 'near_date';
  price: number;
  original_price?: number; // Có dấu ? vì có thể null
  stock_quantity: number;  // Sửa từ 'stock' thành 'stock_quantity' cho khớp DB
  expiry_date?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  usage_instruction?: string;
  image_url?: string;
  is_featured?: boolean;
  category_id?: number;
  
  // Quan hệ (Join bảng)
  category?: Category;     // Thêm cái này để hết lỗi 'category does not exist'
  variants?: ProductVariant[];
}