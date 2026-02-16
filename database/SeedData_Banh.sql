DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN

    -- ================================================================
    -- 24. DANH MỤC CON: CÁC LOẠI BÁNH (cac-loai-banh)
    -- ================================================================
    -- Lưu ý: Danh mục này đã được tạo ở bước bổ sung trước đó
    SELECT id INTO cat_id FROM categories WHERE slug = 'cac-loai-banh';

    -- 24.1 BÁNH ĂN SÁNG KOKO 330gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh ăn sáng Koko 330gr (Lốc 18)', 'banh-an-sang-koko-330gr', 'products/banhkoko.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 80000, 84000, 40, '2026-08-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 77000, 80000, 20, '2026-08-28');

    -- 24.2 BÁNH ĂN SÁNG NESTLE MILO 330gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh ăn sáng Nestle Milo 330gr', 'banh-an-sang-milo-330gr', 'products/banhmilo.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 82000, 84000, 20, '2026-04-23');

    -- 24.3 BÁNH C'EST BON BAGUETTE 5P
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Cest Bon Baguette (5 gói)', 'banh-cest-bon-baguette', 'products/cestbon.png', false) -- File ảnh ghi là "BÁNH CEST BON BAGUETTE.png" nhưng mình sửa thành cestbon.png cho gọn, bạn nhớ sửa tên file ảnh khi up
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 23000, 26000, 20, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 21000, 23000, 20, '2026-04-23');

    -- 24.4 BÁNH CUSTAS 12P
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Custas (Hộp 12 cái)', 'banh-custas-12p', 'products/banhcustas.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 44000, 46000, 40, '2026-08-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 42000, 44000, 20, '2026-08-28');

    -- 24.5 BÁNH CHOCOPIE 12P (Chỉ có Near Date)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Chocopie (Hộp 12 cái)', 'banh-chocopie-12p', 'products/chocopie.png', false) -- File không có tên ảnh, mình đặt tạm là chocopie.png
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 43000, 45000, 20, '2026-08-28');

    -- 24.6 BÁNH MARINE BOY TẢO, TÔM
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Marine Boy Tảo/Tôm', 'banh-marine-boy', 'products/banhmarineboy.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 7000, 8000, 40, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 6000, 7000, 20, '2026-04-23');

    -- 24.7 BÁNH QUY LÚA MẠCH MALAY 250g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh quy lúa mạch Malay 250g', 'banh-quy-lua-mach-malay', 'products/banhquymalay.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 23000, 25000, 40, '2026-08-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 21000, 23000, 20, '2026-08-28');

    -- 24.8 BÁNH MYBIZCUIT (Bơ đậu phộng, Phomai) (Chỉ có New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Mybizcuit (Bơ đậu phộng/Phomai)', 'banh-mybizcuit', 'products/banhmybizcuit.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 43000, 46000, 20, '2026-08-28');

    -- 24.9 BÁNH CHÀ BÔNG GÀ M & D
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh chà bông gà M&D', 'banh-cha-bong-ga-md', 'products/banhchabong.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 38000, 41000, 40, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 35000, 38000, 20, '2026-04-23');

    -- 24.10 BÁNH OREO CHOCOLATE PIE
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Oreo Chocolate Pie', 'banh-oreo-pie', 'products/banhoreo.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 41000, 44000, 40, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 39000, 41000, 20, '2026-04-23');

    -- 24.11 BÁNH QUẾ (Dứa, Cam, Sô, Xoài)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Quế (Dứa/Cam/Sô/Xoài)', 'banh-que-cac-vi', 'products/banhque.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 8000, 10000, 30, '2026-08-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 7000, 8000, 15, '2026-08-28');

    -- 24.12 BÁNH SOLITE CUỘN KEM LÁ DỨA
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Solite cuộn kem Lá Dứa', 'banh-solite-la-dua', 'products/solitecuondua.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 33000, 36000, 30, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 31000, 33000, 15, '2026-04-23');

    -- 24.13 BÁNH SLIDE KHOAI TÂY
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Slide khoai tây', 'banh-slide-khoai-tay', 'products/slicekhoaitay.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 30000, 32000, 30, '2026-08-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 28000, 30000, 15, '2026-08-28');

    -- 24.14 BÁNH AFC (Các mùi)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh AFC (Các mùi)', 'banh-afc', 'products/banhafc.png', true) -- Tên ảnh trong file có dấu: bánhafc.png -> Mình sửa thành banhafc.png
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 18000, 20000, 30, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 16000, 18000, 15, '2026-04-23');

    -- 24.15 BÁNH PLU VEITABLE BEURRE
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Plu Vegetable Beurre', 'banh-plu-vegetable', 'products/plu.png', false) -- File ảnh ghi là "BÁNH PLU VEITABLE BEURRE.png", mình rút gọn thành plu.png
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 40000, 43000, 30, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 38000, 40000, 15, '2026-04-23');

    -- 24.16 BÁNH COOKIE BO LU 708gr (Chỉ có New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Cookie Bo Lu 708gr', 'banh-cookie-bo-lu', 'products/cookie.png', false) -- File không có tên ảnh, mình đặt tạm
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 171000, 173000, 15, '2026-08-28');

    -- 24.17 BÁNH QUY RITZ KẸP PHOMAI
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh quy Ritz kẹp phomai', 'banh-quy-ritz-phomai', 'products/banhritz.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 21000, 23000, 60, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 19000, 21000, 30, '2026-04-23');

    -- 24.18 BÁNH LU PHÁP PETIT BEURRE 600gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Lu Pháp Petit Beurre 600gr', 'banh-lu-phap-petit', 'products/banhlupetit.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 200000, 204000, 60, '2026-08-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 195000, 200000, 30, '2026-08-28');

    -- 24.19 BÁNH RICHY PEPPIE (KHAY)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Richy Peppie (Khay)', 'banh-richy-peppie-khay', 'products/peppiekhay.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 33000, 35000, 60, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 31000, 33000, 30, '2026-04-23');

    -- 24.20 BÁNH PEPPIE TÚI (CAM + VANI)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh Peppie Túi (Cam + Vani)', 'banh-peppie-tui', 'products/banhpeppie.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 15000, 17000, 60, '2026-04-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 12000, 15000, 30, '2026-04-23');

    RAISE NOTICE 'Đã nhập xong nhóm Bánh! TOÀN BỘ DỮ LIỆU ĐÃ HOÀN TẤT.';
END $$;