CREATE TABLE bundle_design (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    selected_categories JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cho phép người dùng đã đăng nhập được quyền Cập nhật (UPDATE) bảng orders
CREATE POLICY "Cho phép cập nhật đơn hàng" 
ON public.orders 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);