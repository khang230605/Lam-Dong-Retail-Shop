DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN

    -- ================================================================
    -- 18. DANH MỤC CON: SỮA TƯƠI (sua-tuoi)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'sua-tuoi';

    -- 18.1 SỮA TƯƠI TỔ YẾN VNM GREEN FARM 180ML
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa tươi Tổ yến VNM Green Farm 180ml', 'sua-tuoi-to-yen-vnm', 'products/suatuoitoyen.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 9000, 11000, 55, '2026-05-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 8000, 9000, 25, '2026-05-17');

    -- 18.2 SỮA TƯƠI FLEX ĐƯỜNG 180ml
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa tươi Flex đường 180ml', 'sua-tuoi-flex-duong', 'products/-suaflex.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 55, '2026-05-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 35, '2026-05-17');

    -- 18.3 SỮA TƯƠI LẠT 965ML (Chỉ có Near Date)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa tươi Lạt 965ml', 'sua-tuoi-lat-965ml', 'products/-suatuoilat.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 24000, 28000, 35, '2026-03-17');

    -- 18.4 SỮA TƯƠI HÀ LAN DÂU CACAO 180ML
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa tươi Hà Lan Dâu Cacao 180ml', 'sua-tuoi-ha-lan-dau', 'products/-suadau.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 55, '2026-03-17');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 35, '2026-03-17');


    -- ================================================================
    -- 19. DANH MỤC CON: SỮA ĐẶC (sua-dac)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'sua-dac';

    -- 19.1 SỮA ĐẶC CAO CẤP HÀ LAN
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa đặc Cao cấp Hà Lan', 'sua-dac-ha-lan', 'products/-suadac.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 23000, 27000, 55, '2026-07-19');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 21000, 23000, 35, '2026-07-19');

    -- 19.2 SỮA ĐẶC HOÀN HẢO
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa đặc Hoàn Hảo', 'sua-dac-hoan-hao', 'products/-suahoanhoa.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 14000, 17000, 55, '2026-05-19');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 12000, 14000, 35, '2026-05-19');

    -- 19.3 Sữa đặc NSPN XANH BIỂN 1 LÍT
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa đặc NSPN Xanh Biển 1 Lít', 'sua-dac-xanh-bien-1l', 'products/-sua1l.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 48000, 50000, 55, '2026-05-19');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 44000, 48000, 35, '2026-05-19');

    -- 19.4 Sữa đặc NSPN Cam 380g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa đặc NSPN Cam 380g', 'sua-dac-cam-380g', 'products/-suadaccam.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 16000, 18000, 55, '2026-07-19');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 13000, 16000, 35, '2026-07-19');

    -- 19.5 Sữa đặc Ông Thọ Đỏ 380g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa đặc Ông Thọ Đỏ 380g', 'sua-dac-ong-tho-do', 'products/-suadacdo.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 17000, 20000, 55, '2026-05-19');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 15000, 17000, 35, '2026-05-19');


    -- ================================================================
    -- 20. DANH MỤC CON: SỮA CHUA (sua-chua)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'sua-chua';

    -- 20.1 SỮA CHUA ZOTT TÁO, XOÀI VANI
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua Zott (Táo/Xoài/Vani)', 'sua-chua-zott', 'products/-suachuazott.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 33000, 36000, 50, '2026-07-12');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 31000, 33000, 25, '2026-07-12');

    -- 20.2 SỮA CHUA ĂN CỐM NẾP GIÒN TH
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua ăn Cốm nếp giòn TH (Lốc)', 'sua-chua-th-com-nep', 'products/-suachuacom.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 9000, 11000, 50, '2026-04-12');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 8000, 9000, 25, '2026-04-12');

    -- 20.3 SỮA CHUA HOFF CÁC VỊ
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua Hoff các vị', 'sua-chua-hoff', 'products/-suachuahoff.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 8000, 9000, 50, '2026-07-12');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 7000, 8000, 25, '2026-07-12');

    -- 20.4 SỮA CHUA UỐNG NESTLE YOGU
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua uống Nestle Yogu 110ml', 'sua-chua-nestle-yogu', 'products/-suachuanestle.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 50, '2026-07-12');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 25, '2026-07-12');

    -- 20.5 Sữa chua Trân Châu Đường đen
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua Trân Châu Đường đen 100g', 'sua-chua-tran-chau', 'products/-sctranchau.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 7000, 8000, 50, '2026-07-16');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 6000, 7000, 25, '2026-07-16');

    -- 20.6 SỮA CHUA ÍT ĐƯỜNG GREEN FARM 100GR
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua Green Farm Ít đường 100gr', 'sua-chua-green-farm-it-duong', 'products/-scitduong.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 5000, 6000, 50, '2026-05-16');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 4000, 5000, 25, '2026-05-16');

    -- 20.7 Sữa chua VNM ÍT ĐƯỜNG 110gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua VNM Ít đường 110gr', 'sua-chua-vnm-it-duong', 'products/-suachuaitduong.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 5000, 6000, 50, '2026-05-16');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 4000, 5000, 25, '2026-05-16');

    -- 20.8 Sữa Chua Không Đường 110g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua VNM Không đường 110gr', 'sua-chua-khong-duong', 'products/-suachua0duong.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 5000, 6000, 50, '2026-07-16');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 4000, 5000, 25, '2026-07-16');

    -- 20.9 SỮA CHUA UỐNG TRẮNG CÓ ĐƯỜNG 500ML
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Sữa chua uống trắng có đường 500ml', 'sua-chua-uong-trang-500ml', 'products/-scmtrang.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 20000, 22000, 50, '2026-07-16');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 16000, 20000, 25, '2026-07-16');


    -- ================================================================
    -- 21. DANH MỤC CON: VÁNG SỮA (vang-sua)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'vang-sua';

    -- 21.1 VÁNG SỮA MONTE VANI/SOCOLA 55gr
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Váng sữa Monte Vani/Socola 55gr', 'vang-sua-monte-vani-socola', 'products/-vangsua.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 51000, 53000, 50, '2026-05-18');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 48000, 51000, 25, '2026-05-18');

    -- 21.2 VÁNG SỮA MONTE CLASSIC
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Váng sữa Monte Classic', 'vang-sua-monte-classic', 'products/-hangkim.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 12000, 14000, 25, '2026-05-18');

    -- 21.3 VÁNG SỮA MONTE CANXI PLUS (Mới - Không có ảnh, dùng tạm ảnh váng sữa chung)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Váng sữa Monte Canxi Plus 55gr', 'vang-sua-monte-canxi-plus', 'products/-vangsua.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 53000, 55000, 25, '2026-05-18');


    -- ================================================================
    -- 22. DANH MỤC CON: PHÔ MAI (pho-mai)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'pho-mai';

    -- 22.1 PM VUÔNG Belcube VỊ SỮA 24C
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phô mai vuông Belcube vị Sữa (24 viên)', 'pm-belcube-vi-sua', 'products/-pmcube.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 53000, 56000, 50, '2026-03-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 51000, 53000, 25, '2026-03-14');

    -- 22.2 PM CON BÒ CƯỜI 16M 224g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phô mai Con Bò Cười (16 miếng)', 'pm-con-bo-cuoi-16m', 'products/-pmtruyenthong.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 53000, 57000, 50, '2026-03-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 51000, 53000, 25, '2026-03-14');

    -- 22.3 PM CON BÒ CƯỜI 24M 336g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phô mai Con Bò Cười (24 miếng)', 'pm-con-bo-cuoi-24m', 'products/-pm24.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 78000, 82000, 50, '2026-06-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 74000, 78000, 25, '2026-06-14');

    -- 22.4 PM VUÔNG VIỆT QUỐC / CÁC VỊ 78g (Mới)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phô mai vuông Việt Quất/Các vị 78gr', 'pm-vuong-viet-quat', 'products/-pmcube.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 35000, 40000, 25, '2026-03-14');

    -- 22.5 PM CON BÒ CƯỜI 8M 112g
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Phô mai Con Bò Cười (8 miếng)', 'pm-con-bo-cuoi-8m', 'products/-pm8.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 28000, 31000, 50, '2026-06-14');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 26000, 28000, 25, '2026-06-14');

    RAISE NOTICE 'Đã nhập xong nhóm Đồ từ sữa!';
END $$;