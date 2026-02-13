import { supabase } from '@/utils/supabase';

export class CartService {
  
  // 1. Lấy giỏ hàng của user hiện tại
  static async getCart() {
    // Lấy user đang đăng nhập
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null; // Chưa đăng nhập thì thôi

    // Tìm cart của user
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (cart) return cart;

    // Nếu chưa có cart thì tạo mới
    const { data: newCart, error } = await supabase
      .from('carts')
      .insert({ user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return newCart;
  }

  // 2. Thêm sản phẩm vào DB (Sync)
  static async addToCartDB(variantId: number, quantity: number) {
    const cart = await this.getCart();
    if (!cart) return; // Khách vãng lai dùng LocalStorage

    // Kiểm tra xem item đã có trong giỏ chưa
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_variant_id', variantId)
      .single();

    if (existingItem) {
      // Có rồi thì cộng dồn số lượng
      await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id);
    } else {
      // Chưa có thì tạo mới
      await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_variant_id: variantId,
          quantity: quantity
        });
    }
  }

  // 3. Đồng bộ từ LocalStorage lên Database (Dùng khi vừa Đăng nhập xong)
  static async syncLocalToRemote(localItems: any[]) {
    for (const item of localItems) {
      await this.addToCartDB(item.variant.id, item.quantity);
    }
  }
}