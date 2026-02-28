import { supabase } from '@/utils/supabase';

export class BundleService {
  
  // Lấy tất cả gói đang mở bán
  static async getActiveBundles() {
    const { data, error } = await supabase
      .from('bundles')
      .select(`
        *,
        items:bundle_items (
          quantity,
          variant:product_variants (
            id,
            price,
            expiry_date,
            type,
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

  // Lấy chi tiết 1 gói theo slug
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
            expiry_date,
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

  // Lấy các gói Combo có chứa sản phẩm ID X
  static async getBundlesContainingProduct(productId: number) {
    try {
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
        .eq('items.variant.product_id', productId)
        .limit(2);

      if (error) {
        console.error("Lỗi lấy Bundle gợi ý:", error);
        return [];
      }
      
      return data || [];

    } catch (err) {
      console.error(err);
      return [];
    }
  }
  
  // Gửi yêu cầu thiết kế Bundle mới
  static async submitBundleDesign(data: { name: string; phone: string; selected_categories: string[] }) {
    try {
      const { error } = await supabase
        .from('bundle_design')
        .insert([{
            name: data.name,
            phone: data.phone,
            selected_categories: data.selected_categories
        }]);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Lỗi gửi yêu cầu thiết kế:', err);
      throw err;
    }
  }
}