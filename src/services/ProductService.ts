import { supabase } from '@/utils/supabase';
import { Product } from '@/models/types';

export class ProductService {
  
  // Phương thức 1: Lấy danh sách sản phẩm nổi bật (cho trang Home)
static async getDailyFeatured() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants (
          id,
          type,
          price,
          original_price,
          stock_quantity
        )
      `)
      .eq('is_featured', true) // Lọc sản phẩm có cờ nổi bật
      .order('category_id', { ascending: true }); // Sắp xếp theo ID danh mục tăng dần
      //.limit(8); // Lấy tối đa 8 món (đã comment lại để lấy toàn bộ)

    if (error) {
      console.error('Lỗi lấy sp nổi bật:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception lấy sp nổi bật:', err);
    return [];
  }
}

  // Phương thức 2: Lấy tất cả danh mục (cho Mega Menu)
  static async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) return [];
    return data;
  }

  // Phương thức 3: Lấy chi tiết sản phẩm theo Slug (cho trang chi tiết)
  static async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*)
      `)
      .eq('slug', slug)
      .single(); // Chỉ lấy 1 kết quả

    if (error) return null;
    return data as Product;
  }

  // Phương thức 4: Lấy sản phẩm theo Slug danh mục (Có xử lý cha-con và sắp xếp)
  static async getProductsByCategory(categorySlug: string, sort: string = 'newest') {
    try {
      // 1. Tìm ID của danh mục dựa trên Slug
      const { data: category, error: catError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (catError || !category) return [];

      // 2. Tìm tất cả danh mục con của nó (để nếu chọn Cha thì hiện cả đồ của Con)
      const { data: childCats } = await supabase
        .from('categories')
        .select('id')
        .eq('parent_id', category.id);

      // Tạo mảng chứa ID của chính nó và các con
      const categoryIds = [category.id];
      if (childCats) {
        childCats.forEach(c => categoryIds.push(c.id));
      }

      // 3. Query sản phẩm nằm trong danh sách ID trên
      let query = supabase
        .from('products')
        .select(`
          *,
          variants:product_variants (
            id,
            type,
            price,
            original_price,
            stock_quantity
          )
        `)
        .in('category_id', categoryIds); // Lọc theo danh sách ID

      // 4. Xử lý Sắp xếp
      // Lưu ý: Sắp xếp theo giá hơi phức tạp vì giá nằm ở bảng variants.
      // Supabase chưa hỗ trợ order theo bảng quan hệ (relation) trực tiếp tốt lắm.
      // Cách đơn giản nhất: Lấy về rồi sort bằng JS, hoặc sort theo ngày tạo (newest).
      
      if (sort === 'newest') {
        query = query.order('created_at', { ascending: false });
      }
      // (Các case sort giá mình sẽ xử lý ở client sau khi lấy data về để code đỡ phức tạp)

      const { data, error } = await query;

      if (error) throw error;
      return data || [];

    } catch (err) {
      console.error('Lỗi lọc sản phẩm:', err);
      return [];
    }
  }

  // Phương thức 5: Tìm kiếm sản phẩm theo từ khóa
  static async searchProducts(keyword: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants (
            id,
            type,
            price,
            original_price,
            stock_quantity
          )
        `)
        .ilike('name', `%${keyword}%`); // %keyword% nghĩa là tìm chữ chứa keyword ở bất cứ đâu

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Lỗi tìm kiếm:', err);
      return [];
    }
  }

  // Phương thức 6: Lấy sản phẩm liên quan (cùng danh mục, loại trừ sản phẩm hiện tại)
  static async getRelatedProducts(categoryId: number, excludeProductId: number) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants (
          id,
          type,
          price,
          original_price,
          stock_quantity
        )
      `)
      .eq('category_id', categoryId)
      .neq('id', excludeProductId) // Loại trừ sản phẩm đang xem
      .limit(4); // Lấy 4 món gợi ý

    if (error) return [];
    return data || [];
  }

  // Phương thức 7: Lấy tất cả sản phẩm có phân trang (cho trang Shop)
  static async getAllProductsPaginated(page: number = 1, limit: number = 16) {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // Lấy data và tổng số lượng sản phẩm (count: 'exact')
      const { data, error, count } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants (
            id,
            type,
            price,
            original_price,
            stock_quantity
          )
        `, { count: 'exact' })
        .order('created_at', { ascending: false }) // Có thể chỉnh order theo ý bạn
        .range(from, to);

      if (error) throw error;
      
      return {
        data: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (err) {
      console.error('Lỗi lấy tất cả sản phẩm phân trang:', err);
      return { data: [], total: 0, totalPages: 0 };
    }
  }

  // Phương thức 8: Lấy tất cả sản phẩm 
  static async getAllProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants (
            id, type, price, original_price, stock_quantity
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Lỗi lấy tất cả sản phẩm:', err);
      return [];
    }
  }
}