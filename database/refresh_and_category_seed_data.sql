-- ================================================================
-- DỌN DẸP DỮ LIỆU CŨ (RESET DATA)
-- Lệnh này sẽ:
-- 1. Xóa sạch dữ liệu trong các bảng liệt kê bên dưới.
-- 2. RESTART IDENTITY: Đưa bộ đếm ID quay về số 1.
-- 3. CASCADE: Tự động xóa các dữ liệu liên quan (Ví dụ xóa sản phẩm thì xóa luôn biến thể).
-- ================================================================

TRUNCATE TABLE 
  contact_messages,
  refund_requests,
  reviews,
  order_items,
  orders,
  cart_items,
  bundle_items,
  bundles,
  product_variants,
  products,
  categories
RESTART IDENTITY CASCADE;

-- ================================================================
-- CHÈN DỮ LIỆU MỚI
-- ================================================================
-- ================================================================
-- IMPORT DANH MỤC (REAL DATA)
-- Lưu ý: Mình dùng ON CONFLICT DO NOTHING để tránh lỗi nếu chạy lại nhiều lần.
-- ================================================================

-- 1. TẠO DANH MỤC CHA (Cấp 1)
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Thực phẩm tươi sống', 'thuc-pham-tuoi-song', 'https://placehold.co/100/e8f5e9/2e7d32?text=TuoiSong', NULL),
('Thực phẩm đóng gói', 'thuc-pham-dong-goi', 'https://placehold.co/100/fff3e0/ef6c00?text=DongGoi', NULL),
('Đồ khô & gia vị', 'do-kho-gia-vi', 'https://placehold.co/100/fbe9e7/d84315?text=DoKho', NULL),
('Đồ uống', 'do-uong', 'https://placehold.co/100/e3f2fd/1565c0?text=DoUong', NULL),
('Đồ từ sữa', 'do-tu-sua', 'https://placehold.co/100/f3e5f5/7b1fa2?text=Sua', NULL),
('Kem', 'kem', 'https://placehold.co/100/fce4ec/c2185b?text=Kem', NULL),
('Snack', 'snack', 'https://placehold.co/100/fff8e1/ffa000?text=Snack', NULL)
ON CONFLICT (slug) DO NOTHING;

-- 2. TẠO DANH MỤC CON (Cấp 2) - Tự động tìm ID của cha để gắn vào

-- 2.1 Con của: Thực phẩm tươi sống
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Thịt heo', 'thit-heo', 'https://placehold.co/100?text=ThitHeo', (SELECT id FROM categories WHERE slug='thuc-pham-tuoi-song')),
('Thịt bò', 'thit-bo', 'https://placehold.co/100?text=ThitBo', (SELECT id FROM categories WHERE slug='thuc-pham-tuoi-song')),
('Tôm', 'tom', 'https://placehold.co/100?text=Tom', (SELECT id FROM categories WHERE slug='thuc-pham-tuoi-song')),
('Cá', 'ca', 'https://placehold.co/100?text=Ca', (SELECT id FROM categories WHERE slug='thuc-pham-tuoi-song')),
('Mực', 'muc', 'https://placehold.co/100?text=Muc', (SELECT id FROM categories WHERE slug='thuc-pham-tuoi-song'))
ON CONFLICT (slug) DO NOTHING;

-- 2.2 Con của: Thực phẩm đóng gói
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Xúc xích', 'xuc-xich', 'https://placehold.co/100?text=XucXich', (SELECT id FROM categories WHERE slug='thuc-pham-dong-goi')),
('Bánh bao', 'banh-bao', 'https://placehold.co/100?text=BanhBao', (SELECT id FROM categories WHERE slug='thuc-pham-dong-goi')),
('Chả, giò, nem', 'cha-gio-nem', 'https://placehold.co/100?text=ChaGioNem', (SELECT id FROM categories WHERE slug='thuc-pham-dong-goi')),
('Bánh xếp', 'banh-xep', 'https://placehold.co/100?text=BanhXep', (SELECT id FROM categories WHERE slug='thuc-pham-dong-goi'))
ON CONFLICT (slug) DO NOTHING;

-- 2.3 Con của: Đồ khô & gia vị
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Mì gói', 'mi-goi', 'https://placehold.co/100?text=MiGoi', (SELECT id FROM categories WHERE slug='do-kho-gia-vi')),
('Phở gói', 'pho-goi', 'https://placehold.co/100?text=PhoGoi', (SELECT id FROM categories WHERE slug='do-kho-gia-vi')),
('Gạo', 'gao', 'https://placehold.co/100?text=Gao', (SELECT id FROM categories WHERE slug='do-kho-gia-vi')),
('Ngũ cốc', 'ngu-coc', 'https://placehold.co/100?text=NguCoc', (SELECT id FROM categories WHERE slug='do-kho-gia-vi')),
('Tương ớt', 'tuong-ot', 'https://placehold.co/100?text=TuongOt', (SELECT id FROM categories WHERE slug='do-kho-gia-vi'))
ON CONFLICT (slug) DO NOTHING;

-- 2.4 Con của: Đồ uống
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Nước ngọt', 'nuoc-ngot', 'https://placehold.co/100?text=NuocNgot', (SELECT id FROM categories WHERE slug='do-uong')),
('Nước suối', 'nuoc-suoi', 'https://placehold.co/100?text=NuocSuoi', (SELECT id FROM categories WHERE slug='do-uong')),
('Yến', 'yen', 'https://placehold.co/100?text=Yen', (SELECT id FROM categories WHERE slug='do-uong'))
ON CONFLICT (slug) DO NOTHING;

-- 2.5 Con của: Đồ từ sữa
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Sữa tươi', 'sua-tuoi', 'https://placehold.co/100?text=SuaTuoi', (SELECT id FROM categories WHERE slug='do-tu-sua')),
('Sữa đặc', 'sua-dac', 'https://placehold.co/100?text=SuaDac', (SELECT id FROM categories WHERE slug='do-tu-sua')),
('Sữa chua', 'sua-chua', 'https://placehold.co/100?text=SuaChua', (SELECT id FROM categories WHERE slug='do-tu-sua')),
('Váng sữa', 'vang-sua', 'https://placehold.co/100?text=VangSua', (SELECT id FROM categories WHERE slug='do-tu-sua')),
('Phô mai', 'pho-mai', 'https://placehold.co/100?text=PhoMai', (SELECT id FROM categories WHERE slug='do-tu-sua'))
ON CONFLICT (slug) DO NOTHING;

-- 2.6 Con của: Kem (Trường hợp đặc biệt: Con trùng tên Cha)
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Các loại kem', 'cac-loai-kem', 'https://placehold.co/100?text=Kem', (SELECT id FROM categories WHERE slug='kem'))
ON CONFLICT (slug) DO NOTHING;

-- 2.7 Con của: Snack
INSERT INTO categories (name, slug, image_url, parent_id) VALUES
('Kẹo', 'keo', 'https://placehold.co/100?text=Keo', (SELECT id FROM categories WHERE slug='snack')),
('Bánh gạo', 'banh-gao', 'https://placehold.co/100?text=BanhGao', (SELECT id FROM categories WHERE slug='snack')),
('Các loại bánh', 'cac-loai-banh', 'https://placehold.co/100?text=Banh', (SELECT id FROM categories WHERE slug='snack'))
ON CONFLICT (slug) DO NOTHING;
