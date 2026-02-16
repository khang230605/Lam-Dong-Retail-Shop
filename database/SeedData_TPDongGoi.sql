DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN

    -- ================================================================
    -- 6. DANH MỤC CON: XÚC XÍCH (xuc-xich)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'xuc-xich';

    -- 6.1 Xúc xích Cocktail TH True Food
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Xúc xích Cocktail TH True Food 250gr', 'xx-cocktail-th-250gr', 'products/xucxichcocktail.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 44000, 50000, 40, '2026-12-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 40000, 44000, 20, '2026-12-20');

    -- 6.2 Xúc xích Xông khói TH True Food
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Xúc xích Xông khói TH True Food 450gr', 'xx-xong-khoi-th-450gr', 'products/xucxichxongkhoi.jpg', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 74000, 79000, 40, '2026-02-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 72000, 74000, 20, '2026-02-20');

    -- 6.3 Xúc xích Mortadella
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Xúc xích Mortadella 200gr', 'xx-mortadella-200gr', 'products/xucxichmortadelle.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 20000, 23000, 40, '2026-12-20');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 16000, 20000, 20, '2026-12-20');

    -- 6.4 Xúc xích Tỏi (Chỉ có hàng New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Xúc xích Tỏi 200gr', 'xx-toi-200gr', 'products/xucxichtoi.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 21000, 26000, 40, '2026-12-20');


    -- ================================================================
    -- 7. DANH MỤC CON: BÁNH BAO (banh-bao)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'banh-bao';

    -- 7.1 Surimi Nhân Hải Sản (Bánh bao trứng cá)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Surimi nhân hải sản (Bánh bao trứng cá)', 'surimi-nhan-hai-san', 'products/surimihaisan.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 43000, 47000, 40, '2026-06-30');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 39000, 43000, 20, '2026-06-30');

    -- 7.2 Bánh bao Thọ Phát Thịt heo 1 trứng cút
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh bao Thọ Phát (Thịt heo 1 trứng cút)', 'bb-tho-phat-1-cut', 'products/banhbao1cut.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 35000, 41000, 40, '2026-08-30');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 31000, 35000, 20, '2026-08-30');

    -- 7.3 Bánh bao Thọ Phát Bột Cua Xanh (Cốm xanh)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh bao Thọ Phát (Cốm xanh)', 'bb-tho-phat-com-xanh', 'products/banhbaoxanh.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 17000, 20000, 40, '2026-08-30');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 13000, 17000, 20, '2026-08-30');


    -- ================================================================
    -- 8. DANH MỤC CON: CHẢ, GIÒ, NEM (cha-gio-nem)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'cha-gio-nem';

    -- 8.1 Chả giò Hải sản đặc biệt 500gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Chả giò Hải sản đặc biệt 500gr', 'cha-gio-hai-san-dac-biet', 'products/chagiohaisan.jpg', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 54000, 58000, 40, '2026-07-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 51000, 54000, 20, '2026-07-28');

    -- 8.2 Chả giò Nhân thịt 500gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Chả giò Nhân thịt 500gr', 'cha-gio-nhan-thit', 'products/chagionhanthit.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 41000, 43000, 40, '2026-07-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 36000, 41000, 20, '2026-07-28');

    -- 8.3 Chả giò Chay 500gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Chả giò Chay 500gr', 'cha-gio-chay', 'products/chagiogiay.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 31000, 34000, 40, '2026-05-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 28000, 31000, 20, '2026-05-28');

    -- 8.4 Giò lụa 250gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Giò lụa 250gr', 'gio-lua-250gr', 'products/chagio.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 35000, 39000, 40, '2026-05-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 31000, 35000, 20, '2026-05-28');

    -- 8.5 Nem chua 200gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nem chua 200gr', 'nem-chua-200gr', 'products/nemchua.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 26000, 30000, 40, '2026-07-28');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 22000, 26000, 20, '2026-07-28');

    -- 8.6 Nem nướng 400gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nem nướng 400gr', 'nem-nuong-400gr', 'products/nemnuong.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 63000, 67000, 40, '2026-07-28');
    -- Lưu ý: Theo file ảnh, hàng Near Date giá bằng hàng New (63.000)
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 63000, 67000, 20, '2026-07-28');


    -- ================================================================
    -- 9. DANH MỤC CON: BÁNH XẾP (banh-xep)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'banh-xep';

    -- 9.1 Bánh xếp Hải sản CJ Bibigo 350gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh xếp Hải sản CJ Bibigo 350gr', 'banh-xep-bibigo-haisan', 'products/banhxephaisan.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 44000, 49000, 40, '2026-05-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 41000, 44000, 20, '2026-05-14');

    -- 9.2 Bánh xếp Mandu Nấm 300gr (Chỉ có hàng New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh xếp Mandu Nấm 300gr', 'mandu-nam', 'products/mandunam.jpg', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 39000, 43000, 40, '2026-05-14');

    -- 9.3 Bánh xếp Thịt CJ Bibigo 350gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Bánh xếp Thịt CJ Bibigo 350gr', 'banh-xep-bibigo-thit', 'products/manduthit.jpg', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 42000, 46000, 40, '2026-05-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 38000, 42000, 20, '2026-05-14');

    RAISE NOTICE 'Đã nhập xong nhóm Thực phẩm đóng gói!';
END $$;