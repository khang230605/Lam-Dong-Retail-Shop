import { supabase } from '@/utils/supabase';

export class ReviewService {
  
  // Lấy danh sách đánh giá của 1 sản phẩm
  static async getReviewsByProductId(productId: number) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) return [];
    return data || [];
  }

  // Gửi đánh giá mới
  static async createReview(productId: number, rating: number, comment: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Bạn cần đăng nhập để đánh giá");

    const { error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        product_id: productId,
        rating,
        comment
      });

    if (error) throw error;
  }
}