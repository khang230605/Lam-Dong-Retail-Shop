DO $$
DECLARE
    b_id bigint; -- Biến lưu ID của Bundle vừa tạo
    v_id bigint; -- Biến lưu ID của Variant sản phẩm cần tìm
BEGIN

    -- ==================================================================================
    -- 1. BỮA SÁNG DINH DƯỠNG (40k)
    -- ==================================================================================
    INSERT INTO bundles (name, description, price, original_price, image_url, slug)
    VALUES (
        'Bữa sáng dinh dưỡng', 
        'Bữa sáng thơm ngon đầy đủ chất dinh dưỡng chỉ với 5 phút chế biến', 
        40000, 
        62000, 
        'products/buasangdinhduong.png', -- Nhớ up ảnh này lên bucket products nhé
        'bua-sang-dinh-duong'
    ) RETURNING id INTO b_id;

    -- Item 1: Xíu mại sốt cà (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'xiu-mai-xot-ca' LIMIT 1);
    IF v_id IS NOT NULL THEN INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1); END IF;

    -- Item 2: Pate gan heo (Lấy hàng 'new' vì database chưa có near_date cho món này)
    SELECT id INTO v_id FROM product_variants WHERE type = 'new' AND product_id = (SELECT id FROM products WHERE slug = 'pate-gan-heo-170gr' LIMIT 1);
    IF v_id IS NOT NULL THEN INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1); END IF;

    -- Item 3: Sữa chua uống trắng (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'sua-chua-uong-trang-500ml' LIMIT 1);
    IF v_id IS NOT NULL THEN INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1); END IF;


    -- ==================================================================================
    -- 2. CƠM NHÀ 5 PHÚT (75k)
    -- ==================================================================================
    INSERT INTO bundles (name, description, price, original_price, image_url, slug)
    VALUES (
        'Cơm nhà 5 phút', 
        'Chỉ cần hâm nóng sườn, chiên nhanh lạp xưởng là có ngay mâm cơm tươm tất cho bữa tối vội vã', 
        75000, 
        94000, 
        'products/comnha5phut.png',
        'com-nha-5-phut'
    ) RETURNING id INTO b_id;

    -- Item 1: Sườn nấu đậu (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'suon-nau-dau-170gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 2: Lạp xưởng tôm (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'lap-xuong-tom-200gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 3: Pate thịt heo (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'pate-thit-heo-170gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);


    -- ==================================================================================
    -- 3. LAI RAI CUỐI TUẦN (139k)
    -- ==================================================================================
    INSERT INTO bundles (name, description, price, original_price, image_url, slug)
    VALUES (
        'Lai rai cuối tuần', 
        'Set đồ nhắm chuẩn tiệc tại gia. Mở gói là ăn ngay!', 
        139000, 
        167000, 
        'products/lairainuoituan.png', -- File ghi lairaicuoituan.png nhưng mình sửa lại cho ko dấu nếu cần
        'lai-rai-cuoi-tuan'
    ) RETURNING id INTO b_id;

    -- Item 1: Nem nướng (near_date) - SL: 1
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'nem-nuong-400gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 2: Nem chua (near_date) - SL: 2
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'nem-chua-200gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 2);

    -- Item 3: Giò lụa (near_date) - SL: 1
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'gio-lua-250gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);


    -- ==================================================================================
    -- 4. LẨU THƠM NGON (95k)
    -- ==================================================================================
    INSERT INTO bundles (name, description, price, original_price, image_url, slug)
    VALUES (
        'Lẩu thơm ngon', 
        'Combo lẩu đủ cho 3-4 người. Tiết kiệm thông minh cho bữa sum họp cuối tuần', 
        95000, 
        123000, 
        'products/lauthomngon.png',
        'lau-thom-ngon'
    ) RETURNING id INTO b_id;

    -- Item 1: Bò viên (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'bo-vien-05kg' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 2: Cá viên rau củ (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'ca-vien-rau-cu-05kg' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 3: Bánh xếp hải sản (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'banh-xep-bibigo-haisan' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 4: Xúc xích Mortadella (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'xx-mortadella-200gr' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);


    -- ==================================================================================
    -- 5. NGÀY NGỌT NGÀO (75k)
    -- ==================================================================================
    INSERT INTO bundles (name, description, price, original_price, image_url, slug)
    VALUES (
        'Ngày ngọt ngào', 
        'Gói nạp năng lượng cho cả tuần làm việc', 
        75000, 
        103000, 
        'products/ngayngotngao.png',
        'ngay-ngot-ngao'
    ) RETURNING id INTO b_id;

    -- Item 1: Bánh Slide khoai tây (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'banh-slide-khoai-tay' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 2: Bánh quy Ritz (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'banh-quy-ritz-phomai' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 3: Phô mai Con bò cười 8 miếng (near_date)
    SELECT id INTO v_id FROM product_variants WHERE type = 'near_date' AND product_id = (SELECT id FROM products WHERE slug = 'pm-con-bo-cuoi-8m' LIMIT 1);
    INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 1);

    -- Item 4: Nước trái cây Icoco (Lấy hàng 'new' vì database chưa có near_date) - SL: 2
    SELECT id INTO v_id FROM product_variants WHERE type = 'new' AND product_id = (SELECT id FROM products WHERE slug = 'icoco-thach-dua-220ml' LIMIT 1);
    IF v_id IS NOT NULL THEN INSERT INTO bundle_items (bundle_id, product_variant_id, quantity) VALUES (b_id, v_id, 2); END IF;

    RAISE NOTICE 'Đã nhập xong dữ liệu Bundle!';
END $$;