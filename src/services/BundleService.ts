import { supabase } from '@/utils/supabase';

export class BundleService {
  
  // Lấy tất cả gói đang mở bán
  static async getActiveBundles() {
    // Query này hơi phức tạp: Lấy Bundle -> Lấy Item -> Lấy Variant -> Lấy Product (để lấy tên gốc)
    const { data, error } = await supabase
      .from('bundles')
      .select(`
        *,
        items:bundle_items (
          quantity,
          variant:product_variants (
            id,
            price,
            product:products (
              name,
              image_url
            )
          )
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Lỗi lấy bundles:', error);
      return [];
    }
    return data || [];
  }

  // Lấy chi tiết 1 gói theo slug (Dùng cho trang chi tiết gói sau này)
  static async getBundleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('bundles')
      .select(`
        *,
        items:bundle_items (
          id,        
          quantity,
          variant:product_variants (
            id,
            type,
            price,
            stock_quantity,
            product:products (
              name,
              image_url,
              slug
            )
          )
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) return null;
    return data;
  }

  // HÀM MỚI: Tìm các gói Combo có chứa sản phẩm ID X
  static async getBundlesContainingProduct(productId: number) {
    try {
      // Cách 1: Query trực tiếp (Khó nhưng chuẩn)
      const { data, error } = await supabase
        .from('bundles')
        .select(`
          *,
          items:bundle_items!inner (
            variant:product_variants!inner (
               product_id
            )
          )
        `)
        .eq('is_active', true)
        .eq('items.variant.product_id', productId) // Điều kiện lọc cốt lõi
        .limit(2);

      if (error) {
        console.error("Lỗi lấy Bundle gợi ý:", error);
        return [];
      }
      
      // Nếu không tìm thấy, trả về rỗng
      return data || [];

    } catch (err) {
      console.error(err);
      return [];
    }
}
}