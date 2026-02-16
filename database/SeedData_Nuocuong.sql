DO $$
DECLARE
    cat_id bigint;
    prod_id bigint;
BEGIN

    -- ================================================================
    -- 15. DANH MỤC CON: NƯỚC SUỐI (nuoc-suoi)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'nuoc-suoi';

    -- 15.1 NƯỚC KHOÁNG LAVIE 0.5 LIT
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước khoáng Lavie 0.5 Lít (24/T)', 'lavie-0-5l', 'products/nuocloc500ml.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 2700, 2900, 55, '2026-02-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 2400, 2700, 25, '2026-02-23');

    -- 15.2 NƯỚC KHOÁNG LAVIE 5 LÍT
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước khoáng Lavie 5 Lít (4/T)', 'lavie-5l', 'products/nuocloc5l.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 17000, 20000, 55, '2026-02-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 15000, 17000, 25, '2026-02-23');

    -- 15.3 NƯỚC KHOÁNG LAVIE 1.5 LIT
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước khoáng Lavie 1.5 Lít (12/T)', 'lavie-1-5l', 'products/nuocloc1.5l.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 6000, 7000, 55, '2026-02-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 5000, 6000, 25, '2026-02-23');


    -- ================================================================
    -- 16. DANH MỤC CON: NƯỚC NGỌT (nuoc-ngot)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'nuoc-ngot';

    -- 16.1 NƯỚC LỢI KHUẨN VỊ ĐÀO
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước lợi khuẩn vị Đào 1500ml', 'nuoc-loi-khuan-dao-1500ml', 'products/nuocdao.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 35000, 38000, 55, '2026-08-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 33000, 35000, 25, '2026-08-23');

    -- 16.2 NƯỚC LỢI KHUẨN VỊ TÁO
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước lợi khuẩn vị Táo 1500ml', 'nuoc-loi-khuan-tao-1500ml', 'products/nuoctao.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 33000, 38000, 55, '2026-08-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 29000, 33000, 25, '2026-08-23');

    -- 16.3 NƯỚC ÉP TRÁI CÂY THẠCH VITAMIN (jele)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước ép trái cây thạch Vitamin (Jele) 150gr', 'nuoc-ep-jele-vitamin', 'products/thachtraicay.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 7000, 8000, 55, '2026-05-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 6000, 7000, 25, '2026-05-23');

    -- 16.4 NƯỚC TRÁI CÂY ICOCO THẠCH DỪA (Chỉ có New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước trái cây Icoco thạch dừa 220ml', 'icoco-thach-dua-220ml', 'products/-icoco.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 7000, 8000, 55, '2026-05-23');

    -- 16.5 NƯỚC NHA ĐAM HQ (Chỉ có New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước nha đam Hàn Quốc 1500ml', 'nuoc-nha-dam-hq-1500ml', 'products/-nuocnhadam.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 37000, 39000, 55, '2026-05-23');

    -- 16.6 NƯỚC GẠO HQ (Chỉ có Near Date)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước gạo Hàn Quốc 1500ml', 'nuoc-gao-hq-1500ml', 'products/-sua-gao-rang-han-quoc.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 40000, 42000, 55, '2026-08-23');

    -- 16.7 NƯỚC DỪA TƯƠI (Chỉ có Near Date)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước dừa tươi 330ml', 'nuoc-dua-tuoi-330ml', 'products/-nuocdua (1).png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 10000, 13000, 55, '2026-08-23');

    -- 16.8 NƯỚC DỪA TẮC 1L
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước dừa tắc 1L', 'nuoc-dua-tac-1l', 'products/-duatac.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 33000, 37000, 55, '2026-05-23');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 29000, 33000, 20, '2026-05-23');


    -- ================================================================
    -- 17. DANH MỤC CON: YẾN (yen)
    -- ================================================================
    SELECT id INTO cat_id FROM categories WHERE slug = 'yen';

    -- 17.1 GREEN BIRD BABI (4+1)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Nước yến Green Bird Babi (Lốc 4+1)', 'yen-green-bird-babi-4-1', 'products/-nuoc-yen-sao-huong-vani.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 115000, 117000, 55, '2026-02-26');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 112000, 115000, 25, '2026-02-26');

    -- 17.2 GREEN BIRD CỦ CẢI (5+1)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Yến sào Green Bird chưng đường củ cải (Lốc 5+1)', 'yen-green-bird-cu-cai-5-1', 'products/-yencucai.png', true)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 147000, 150000, 55, '2026-12-26');
    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'near_date', 144000, 147000, 25, '2026-12-26');

    -- 17.3 GREEN BIRD ĐƯỜNG PHÈN (Chỉ có New)
    INSERT INTO products (category_id, name, slug, image_url, is_featured)
    VALUES (cat_id, 'Yến sào Green Bird chưng đường phèn (Lốc 5+1)', 'yen-green-bird-duong-phen-5-1', 'products/-yenduonhphen.png', false)
    RETURNING id INTO prod_id;

    INSERT INTO product_variants (product_id, type, price, original_price, stock_quantity, expiry_date) 
    VALUES (prod_id, 'new', 128000, 130000, 55, '2026-02-26');

    RAISE NOTICE 'Đã nhập xong nhóm Đồ uống!';
END $$;