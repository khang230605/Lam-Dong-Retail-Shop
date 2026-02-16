DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN
    -- ================================================================
    -- 1. DANH MỤC CON: THỊT HEO (thit-heo)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'thit-heo';

    -- 1.1 DỒI THỊT HEO 200 GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Dồi thịt heo 200gr', 'doi-thit-heo-200gr', 'products/doithitheo.png', true)
    RETURNING id INTO prod_id;
    
    -- Variant New
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 30000, 33000, 30, '2026-10-11');
    -- Variant Near Date
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 20000, 30000, 20, '2026-10-11');

    -- 1.2 HEO 2 LÁT 150 GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Heo 2 lát 150gr', 'heo-2-lat-150gr', 'products/heo2lat.png', false)
    RETURNING id INTO prod_id;
    
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 18000, 21000, 30, '2026-10-11');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 13000, 18000, 20, '2026-10-11');

    -- 1.3 XÍU MẠI XỐT CÀ
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Xíu mại xốt cà', 'xiu-mai-xot-ca', 'products/xiumaisotca.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 18000, 20000, 30, '2026-09-11');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 14000, 18000, 20, '2026-09-11');

    -- 1.4 PATE THỊT HEO 170 GR (Lưu ý: File chỉ có near_date, không có new)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Pate thịt heo 170gr', 'pate-thit-heo-170gr', 'products/patethitheo.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 22000, 25000, 30, '2026-09-11');

    -- 1.5 PATE GAN HEO 170 GR (Lưu ý: File chỉ có new)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Pate gan heo 170gr', 'pate-gan-heo-170gr', 'products/pateganheo.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 17000, 20000, 30, '2026-09-11');

    -- 1.6 SƯỜN NẤU ĐẬU 170 GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sườn nấu đậu 170gr', 'suon-nau-dau-170gr', 'products/suonnaudau.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 18000, 21000, 30, '2026-10-11');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 14000, 18000, 20, '2026-10-11');


    -- ================================================================
    -- 2. DANH MỤC CON: THỊT BÒ (thit-bo)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'thit-bo';

    -- 2.1 BÒ VIÊN 0.5kg
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bò viên 0.5kg', 'bo-vien-05kg', 'products/bovien.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 22000, 26000, 50, '2026-11-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 18000, 22000, 30, '2026-11-21');

    -- 2.2 CHẠO BÒ 500gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Chạo bò 500gr', 'chao-bo-500gr', 'products/chaobo.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 36000, 39000, 50, '2026-07-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 32000, 36000, 30, '2026-07-21');

    -- 2.3 BÒ VIÊN NGON CẦU TRE 500gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bò viên ngon Cầu Tre 500gr', 'bo-vien-cau-tre-500gr', 'products/bo_vien_ngon_cautre.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 65000, 68000, 50, '2026-07-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 60000, 65000, 30, '2026-07-21');


    -- ================================================================
    -- 3. DANH MỤC CON: TÔM (tom)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'tom';

    -- 3.1 TÔM SURIMI 500g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Tôm Surimi 500g', 'tom-surimi-500g', 'products/chatom.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 33000, 37000, 50, '2026-03-15');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 28000, 33000, 30, '2026-03-15');

    -- 3.2 TÔM VIÊN 1kg (chả cá vị tôm)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Tôm viên 1kg (Chả cá vị tôm)', 'tom-vien-1kg', 'products/tomvien.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 42000, 47000, 50, '2026-09-15');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 38000, 42000, 30, '2026-09-15');

    -- 3.3 TÔM THẺ ĐÔNG LẠNH 0.5/KHAY
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Tôm thẻ đông lạnh 0.5kg/khay', 'tom-the-dong-lanh', 'products/tomthe.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 92000, 95000, 50, '2026-03-15');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 88000, 92000, 30, '2026-03-15');

    -- 3.4 LẠP XƯỞNG TÔM 200 GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Lạp xưởng tôm 200gr', 'lap-xuong-tom-200gr', 'products/lapxuongtom.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 44000, 48000, 50, '2026-09-15');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 40000, 44000, 30, '2026-09-15');


    -- ================================================================
    -- 4. DANH MỤC CON: CÁ (ca)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'ca';

    -- 4.1 CÁ VIÊN BASA 0.5 KG
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Cá viên Basa 0.5kg', 'ca-vien-basa-05kg', 'products/cavienbasa.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 19000, 22000, 40, '2026-06-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 16000, 19000, 20, '2026-06-17');

    -- 4.2 CÁ VIÊN RAU CỦ HẢI SẢN 0.5 KG
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Cá viên rau củ hải sản 0.5kg', 'ca-vien-rau-cu-05kg', 'products/haisanraucu.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 21000, 25000, 40, '2026-03-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 18000, 21000, 20, '2026-03-17');

    -- 4.3 CÁ VIÊN HẢI SẢN KIỂU ĐẬU HŨ 200gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Cá viên hải sản kiểu đậu hũ 200gr', 'ca-vien-dau-hu-200gr', 'products/caviendauhu.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 23000, 27000, 40, '2026-03-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 19000, 23000, 20, '2026-03-17');

    -- 4.4 CÁ VIÊN LỐC XOÁY 200gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Cá viên lốc xoáy 200gr', 'ca-vien-loc-xoay-200gr', 'products/cavienlocxoay.jpg', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 22000, 27000, 40, '2026-06-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 18000, 22000, 20, '2026-06-17');


    -- ================================================================
    -- 5. DANH MỤC CON: MỰC (muc) - Bao gồm cả Ghẹ như trong file
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'muc';

    -- 5.1 MỰC GHIM ĐÔNG LẠNH 0.5/KHAY
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Mực ghim đông lạnh 0.5kg/khay', 'muc-ghim-dong-lanh', 'products/mucdonglanh.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 98000, 102000, 40, '2026-04-22');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 93000, 98000, 20, '2026-04-22');

    -- 5.2 THỊT GHẸ 0.5 (File đặt ở mục Mực/Cuối trang 1)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Thịt ghẹ 0.5kg', 'thit-ghe-05kg', 'products/thitghe.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 66000, 71000, 40, '2026-08-22');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 60000, 66000, 20, '2026-08-22');

    RAISE NOTICE 'Đã nhập xong nhóm Thực phẩm tươi sống!';
END $$;