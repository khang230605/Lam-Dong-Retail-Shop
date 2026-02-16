DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN

    -- ================================================================
    -- 10. DANH MỤC CON: MÌ GÓI (mi-goi)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'mi-goi';

    -- 10.1 MÌ GÓI BÒ + TÔM CHUA CAY CUNG ĐÌNH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Mì gói Bò + Tôm chua cay Cung Đình', 'mi-goi-bo-tom-cung-dinh', 'products/migoibotom.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 5000, 6000, 60, '2026-09-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 4000, 5000, 30, '2026-09-14');

    -- 10.2 MÌ TRỘN THỐ SPAGETY + BBQ CUNG ĐÌNH
    -- (Tên ảnh trong file bị cắt, mình đặt lại cho chuẩn là mitronspagety.jpg)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Mì trộn thố Spagety + BBQ Cung Đình', 'mi-tron-tho-spagety-bbq', 'products/mitronspagety.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 10000, 12000, 60, '2026-09-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 9000, 10000, 30, '2026-09-14');

    -- 10.3 MỲ LY BÒ + TÔM CHUA CAY + THỊT NẰM CUNG ĐÌNH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Mỳ ly Bò + Tôm chua cay + Thịt nằm Cung Đình', 'my-ly-bo-tom-thit-nam', 'products/milybo.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 60, '2026-11-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 30, '2026-11-14');


    -- ================================================================
    -- 11. DANH MỤC CON: PHỞ GÓI (pho-goi)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'pho-goi';

    -- 11.1 PHỞ BÒ + GÀ HÀ NỘI THỐ CUNG ĐÌNH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phở Bò + Gà Hà Nội Thố Cung Đình', 'pho-bo-ga-tho-cung-dinh', 'products/phobo.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 10000, 12000, 60, '2026-09-26');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 9000, 10000, 30, '2026-09-26');

    -- 11.2 PHỞ BÒ GÓI HÀ NỘI CUNG ĐÌNH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phở Bò gói Hà Nội Cung Đình', 'pho-bo-goi-ha-noi', 'products/phogoi.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 60, '2026-06-26');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 30, '2026-06-26');


    -- ================================================================
    -- 12. DANH MỤC CON: GẠO (gao)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'gao';

    -- 12.1 GẠO LỨC TÍM ST-LSTO1 (1kg/bịch)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Gạo lức tím ST-LSTO1 (1kg/bịch)', 'gao-luc-tim-st-1kg', 'products/gaotim.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 35000, 38000, 40, '2026-02-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 33000, 35000, 20, '2026-02-21');

    -- 12.2 GẠO TRẮNG CỎ THƠM SPECIAL-CTS-10 kg/bịch
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Gạo trắng Cỏ Thơm Special (10kg/bịch)', 'gao-trang-co-thom-10kg', 'products/gaotrang.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 188000, 192000, 40, '2026-02-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 185000, 188000, 20, '2026-02-21');

    -- 12.3 GẠO TRẮNG ST25-S25 -10KG/BỊCH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Gạo trắng ST25 (10kg/bịch)', 'gao-trang-st25-10kg', 'products/gaost25.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 293000, 297000, 40, '2026-04-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 291000, 293000, 20, '2026-04-21');

    -- 12.4 GẠO TRẮNG SINH THÁI-CM-RICE-CM02-2KG/BỊCH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Gạo trắng Sinh Thái CM-RICE (2kg/bịch)', 'gao-trang-sinh-thai-2kg', 'products/gaotrangsinhthai.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 72000, 75000, 40, '2026-04-21');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 70000, 72000, 20, '2026-04-21');


    -- ================================================================
    -- 13. DANH MỤC CON: NGŨ CỐC (ngu-coc)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'ngu-coc';

    -- 13.1 NGŨ CỐC DD CANXI GÓI 500GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Ngũ cốc DD Canxi gói 500gr', 'ngu-coc-dd-canxi-500gr', 'products/ngucoc.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 43000, 45000, 50, '2026-03-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 40000, 43000, 25, '2026-03-25');

    -- 13.2 NGŨ CỐC DD DIABETCARE GÓI 400GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Ngũ cốc DD Diabetcare gói 400gr', 'ngu-coc-dd-diabetcare-400gr', 'products/ngucocdiabet.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 60000, 64000, 50, '2026-06-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 58000, 60000, 25, '2026-06-25');

    -- 13.3 NGŨ CỐC DD GẤC GÓI 500GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Ngũ cốc DD Gấc gói 500gr', 'ngu-coc-dd-gac-500gr', 'products/ngucocgac.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 11000, 15000, 50, '2026-03-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 9000, 11000, 25, '2026-03-25');

    -- 13.4 NGŨ CỐC DD VARNA COMPLETE TÚI 500g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Ngũ cốc DD Varna Complete túi 500g', 'ngu-coc-dd-varna-complete-500g', 'products/ngucocvarna.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 71000, 73000, 50, '2026-06-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 69000, 71000, 25, '2026-06-25');


    -- ================================================================
    -- 14. DANH MỤC CON: TƯƠNG ỚT (tuong-ot)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'tuong-ot';

    -- 14.1 TƯƠNG ỚT CẦU TRE 210gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Tương ớt Cầu Tre 210gr', 'tuong-ot-cau-tre-210gr', 'products/tuongot.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 8000, 9000, 50, '2026-08-27');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 6000, 8000, 25, '2026-08-27');

    RAISE NOTICE 'Đã nhập xong nhóm Đồ khô & Gia vị!';
END $$;