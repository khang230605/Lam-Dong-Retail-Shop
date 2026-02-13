import { supabase } from '@/utils/supabase';
import { CartItem } from '@/context/CartContext';

export interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: string;
  totalPrice: number;
}

export class OrderService {
  
  static async createOrder(orderData: OrderData, items: CartItem[]) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Bạn cần đăng nhập để thanh toán");

      // 1. Tạo đơn hàng (Bảng orders)
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          full_name: orderData.fullName,
          phone_number: orderData.phone,
          address: orderData.address,
          note: orderData.note,
          total_price: orderData.totalPrice,
          payment_method: orderData.paymentMethod,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Tạo chi tiết đơn hàng (Bảng order_items) - LOGIC MỚI
      const orderItems = items.map(item => {
        if (item.type === 'bundle') {
            // TRƯỜNG HỢP BUNDLE
            return {
                order_id: order.id,
                bundle_id: item.bundle.id, // Lưu ID của gói
                product_variant_id: null,  // Không có variant lẻ
                product_name: item.bundle.name, // Lưu tên gói
                quantity: item.quantity,
                price: item.bundle.price // Lưu giá gói
            };
        } else {
            // TRƯỜNG HỢP SẢN PHẨM LẺ
            return {
                order_id: order.id,
                bundle_id: null,
                product_variant_id: item.variant.id,
                product_name: item.product.name,
                quantity: item.quantity,
                price: item.variant.price
            };
        }
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;

    } catch (error) {
      console.error("Lỗi tạo đơn hàng:", error);
      throw error;
    }
  }
}