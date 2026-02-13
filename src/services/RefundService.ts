import { supabase } from '@/utils/supabase';

export class RefundService {
  
  // 1. Upload ảnh lên Supabase Storage
  static async uploadProofImage(file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('refunds')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Lấy public URL để lưu vào DB
      const { data } = supabase.storage.from('refunds').getPublicUrl(filePath);
      return data.publicUrl;

    } catch (error) {
      console.error('Lỗi upload ảnh:', error);
      throw error;
    }
  }

  // 2. Gửi yêu cầu hoàn tiền
  static async createRefundRequest(orderId: string, reason: string, imageFile?: File) {
    // Lấy user hiện tại
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Vui lòng đăng nhập để gửi yêu cầu.");

    let imageUrl = null;

    // Nếu có ảnh -> Upload trước
    if (imageFile) {
      imageUrl = await this.uploadProofImage(imageFile);
    }

    // Lưu vào database
    const { error } = await supabase
      .from('refund_requests')
      .insert({
        user_id: user.id,
        order_id: orderId,
        reason: reason,
        image_url: imageUrl,
        status: 'pending' // Mặc định là chờ duyệt
      });

    if (error) throw error;
  }
}