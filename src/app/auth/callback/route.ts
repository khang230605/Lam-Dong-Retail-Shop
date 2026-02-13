import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  // Nếu có "code" trả về từ email
  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Đổi code lấy session đăng nhập
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Xác thực thành công -> Chuyển hướng về trang chủ hoặc trang thông báo thành công
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // Nếu lỗi -> Chuyển về trang đăng nhập kèm thông báo lỗi
  return NextResponse.redirect(`${origin}/dangnhap?error=auth-code-error`);
}