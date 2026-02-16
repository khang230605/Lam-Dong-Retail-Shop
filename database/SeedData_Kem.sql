DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN

    -- ================================================================
    -- 23. DANH MỤC CON: CÁC LOẠI KEM (cac-loai-kem)
    -- ================================================================
    -- Lưu ý: Ở bước tạo Category, mình đã tạo slug là 'cac-loai-kem' cho nhóm con của Kem
    SELECT id INTO cat_id FROM categories WHERE slug = 'cac-loai-kem';

    -- 23.1 KEM CÂY DELIGHT 80ML
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem cây Delight 80ml', 'kem-cay-delight-80ml', 'products/-kemcay.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 7000, 8000, 70, '2026-01-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 6000, 7000, 35, '2026-01-25');

    -- 23.2 KEM GELATO PHOMAI DÂU, TIRAMISU VNM 400ml
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Gelato Phomai Dâu/Tiramisu VNM 400ml', 'kem-gelato-phomai-dau-tiramisu-400ml', 'products/-kemgelato.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 71000, 73000, 70, '2026-04-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 69000, 71000, 35, '2026-04-25');

    -- 23.3 KEM GELATO CHANH DÂY VNM 400ml
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Gelato Chanh Dây VNM 400ml', 'kem-gelato-chanh-day-400ml', 'products/-kemcday.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 52000, 54000, 70, '2026-04-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 50000, 52000, 35, '2026-04-25');

    -- 23.4 KEM GELATO DỪA VNM 400ml
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Gelato Dừa VNM 400ml', 'kem-gelato-dua-400ml', 'products/-kemdua.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 84000, 86000, 70, '2026-01-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 81000, 84000, 35, '2026-01-25');

    -- 23.5 KEM ỐC QUẾ DELIGHT 110ML
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Ốc quế Delight 110ml', 'kem-oc-que-delight-110ml', 'products/-kemocque.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 10000, 11000, 70, '2026-04-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 9000, 10000, 35, '2026-04-25');

    -- 23.6 KEM QUE SOCOLA + CÀ PHÊ HẠNH NHÂN VNM 70ML
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem que Socola + Cà phê Hạnh nhân VNM 70ml', 'kem-que-socola-ca-phe-70ml', 'products/kemque.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 8000, 9000, 70, '2026-12-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 6000, 8000, 35, '2026-12-25');

    -- 23.7 KEM SỮA CHUA SUBO + SUSU 50g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem sữa chua Subo + Susu 50g', 'kem-sua-chua-subo-susu-50g', 'products/-kemschua.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 2000, 3000, 70, '2026-04-25');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 1000, 2000, 35, '2026-04-25');

    -- 23.8 KEM BÁNH CÁ HQ (Ice Sandwich) - Chỉ có Near Date
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Bánh cá HQ (Ice Sandwich)', 'kem-banh-ca-hq', 'products/-kemca.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 21000, 23000, 70, '2026-05-20');

    -- 23.9 KEM CÂY COSMO
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem cây Cosmo', 'kem-cay-cosmo', 'products/-kemcosmo (1).png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 4000, 5000, 80, '2026-05-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 3000, 4000, 40, '2026-05-20');

    -- 23.10 KEM MELONA (Dưa lưới/Chuối/Dâu)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Melona (Dưa lưới/Chuối/Dâu)', 'kem-melona', 'products/-kemmelona.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 17000, 19000, 80, '2026-08-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 15000, 17000, 40, '2026-08-20');

    -- 23.11 KEM HỒNG TUYẾT (Dâu/Táo/Mâm xôi)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Hồng Tuyết (Dâu/Táo/Mâm xôi)', 'kem-hong-tuyet', 'products/-kemtuyet.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 24000, 28000, 80, '2026-05-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 22000, 24000, 40, '2026-05-20');

    -- 23.12 KEM LỐC XOÁY Fanfare (Vani + So)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Lốc xoáy Fanfare (Vani + Socola)', 'kem-loc-xoay-fanfare', 'products/-kemlocxoay.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 20000, 22000, 100, '2026-08-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 18000, 20000, 50, '2026-08-20');

    -- 23.13 KEM SỮA CHUA LOTTE 85ml
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem sữa chua Lotte 85ml', 'kem-sua-chua-lotte-85ml', 'products/-kemlotte.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 20000, 23000, 100, '2026-05-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 18000, 20000, 50, '2026-05-20');

    -- 23.14 KEM THÁP ỐC QUẾ LOTTE 160ML - Chỉ có Near Date
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem tháp ốc quế Lotte 160ml', 'kem-thap-oc-que-lotte-160ml', 'products/-kemthap.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 22000, 24000, 100, '2026-05-20');

    -- 23.15 KEM PONGTA SODA (Kem chai)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem Pongta Soda (Kem chai)', 'kem-pongta-soda', 'products/-kempongta.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 17000, 19000, 100, '2026-08-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 15000, 17000, 50, '2026-08-20');

    -- 23.16 KEM PHỦ THÁI LAN (Crunchy)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Kem phủ Thái Lan (Crunchy)', 'kem-phu-thai-lan', 'products/-kemphu.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 100, '2026-08-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 50, '2026-08-20');

    RAISE NOTICE 'Đã nhập xong nhóm Kem!';
END $$;