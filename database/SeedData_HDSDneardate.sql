-- ================================================================
-- CẬP NHẬT HƯỚNG DẪN SỬ DỤNG (USAGE_INSTRUCTION)
-- Dữ liệu được map theo Slug để đảm bảo chính xác 100%
-- ================================================================

-- 1. THỊT & CHẾ BIẾN SẴN
UPDATE products SET usage_instruction = 'Rã đông tự nhiên trong ngăn mát, sau đó chiên hoặc nướng chín kỹ và dùng trong ngày. Không để ở nhiệt độ phòng quá 2 giờ. Không tái cấp đông sau khi đã rã đông.' WHERE slug = 'doi-thit-heo-200gr';
UPDATE products SET usage_instruction = 'Rã đông ngăn mát và chế biến ngay (áp chảo, chiên, nướng). Sử dụng hết trong ngày mở bao bì. Bảo quản lạnh nếu chưa chế biến ngay.' WHERE slug = 'heo-2-lat-150gr';
UPDATE products SET usage_instruction = 'Hâm nóng kỹ trước khi dùng. Sau khi mở bao bì, bảo quản mát và dùng hết trong 1–2 ngày. Không sử dụng nếu bao bì phồng hoặc có mùi lạ.' WHERE slug = 'xiu-mai-xot-ca';
UPDATE products SET usage_instruction = 'Dùng ngay sau khi mở nắp. Bảo quản mát và sử dụng trong vòng 48 giờ. Đậy kín sau mỗi lần dùng.' WHERE slug = 'pate-thit-heo-170gr';
UPDATE products SET usage_instruction = 'Hâm nóng kỹ trước khi ăn. Sau khi mở gói/hộp, bảo quản mát và dùng hết trong 1–2 ngày.' WHERE slug = 'suon-nau-dau-170gr';
UPDATE products SET usage_instruction = 'Rã đông trong ngăn mát, chế biến ngay (luộc, chiên, nấu lẩu) và dùng trong ngày. Không cấp đông lại phần đã rã đông.' WHERE slug = 'bo-vien-05kg';
UPDATE products SET usage_instruction = 'Rã đông ngăn mát và nướng/chiên chín kỹ. Sử dụng trong ngày sau khi mở bao bì.' WHERE slug = 'chao-bo-500gr';
UPDATE products SET usage_instruction = 'Sản phẩm của Cầu Tre nên rã đông ngăn mát trước khi chế biến. Nấu chín kỹ và dùng trong ngày. Không tái cấp đông sau khi rã đông.' WHERE slug = 'bo-vien-cau-tre-500gr';

-- 2. HẢI SẢN ĐÔNG LẠNH
UPDATE products SET usage_instruction = 'Rã đông ngăn mát 4–6 giờ, sau đó chế biến ngay (chiên, nấu lẩu, xào). Sử dụng trong ngày sau khi mở bao bì. Không tái cấp đông.' WHERE slug = 'tom-surimi-500g';
UPDATE products SET usage_instruction = 'Giữ đông đến khi chế biến. Có thể chiên hoặc nấu trực tiếp không cần rã đông hoàn toàn. Dùng hết trong ngày nếu đã rã đông.' WHERE slug = 'tom-vien-1kg';
UPDATE products SET usage_instruction = 'Rã đông ngăn mát hoặc dưới vòi nước lạnh, chế biến ngay (hấp, luộc, rang). Không để ở nhiệt độ phòng quá 2 giờ. Không cấp đông lại sau khi rã đông.' WHERE slug = 'tom-the-dong-lanh';
UPDATE products SET usage_instruction = 'Bảo quản mát hoặc đông theo hướng dẫn bao bì. Khi cận date nên chế biến ngay (chiên, hấp, nướng) và dùng trong ngày mở bao bì.' WHERE slug = 'lap-xuong-tom-200gr';
UPDATE products SET usage_instruction = 'Bảo quản đông -18°C. Khi sử dụng có thể nấu trực tiếp hoặc rã đông ngăn mát trước. Dùng trong ngày sau khi mở gói.' WHERE slug = 'ca-vien-basa-05kg';
UPDATE products SET usage_instruction = 'Giữ đông liên tục. Khi cận date nên chế biến ngay (chiên/nấu lẩu). Sau khi rã đông, bảo quản mát và dùng trong 24 giờ.' WHERE slug = 'ca-vien-rau-cu-05kg';
UPDATE products SET usage_instruction = 'Rã đông ngăn mát và chế biến ngay. Dùng hết trong ngày sau khi mở bao bì. Không tái cấp đông.' WHERE slug = 'ca-vien-dau-hu-200gr';
UPDATE products SET usage_instruction = 'Có thể chiên hoặc nấu trực tiếp từ trạng thái đông. Nếu đã rã đông thì dùng trong ngày, không cấp đông lại.' WHERE slug = 'ca-vien-loc-xoay-200gr';
UPDATE products SET usage_instruction = 'Rã đông ngăn mát 6–8 giờ hoặc dưới vòi nước lạnh, chế biến ngay (xào, nướng, hấp). Không để ngoài nhiệt độ phòng lâu và không tái cấp đông.' WHERE slug = 'muc-ghim-dong-lanh';
UPDATE products SET usage_instruction = 'Bảo quản đông -18°C đến khi dùng. Rã đông ngăn mát và chế biến ngay (rang, nấu súp, làm miến). Dùng hết trong ngày sau khi rã đông, không cấp đông lại.' WHERE slug = 'thit-ghe-05kg';

-- 3. XÚC XÍCH & BÁNH BAO
UPDATE products SET usage_instruction = 'Sản phẩm của TH True Food nên bảo quản mát theo hướng dẫn bao bì. Khi cận date nên luộc/hấp/chiên và dùng trong ngày mở gói. Sau khi mở, giữ lạnh và dùng trong 24–48 giờ.' WHERE slug = 'xx-cocktail-th-250gr';
UPDATE products SET usage_instruction = 'Bảo quản mát. Khi cận date nên chế biến ngay (áp chảo, nướng). Sau khi mở bao bì, bảo quản 0–4°C và dùng trong 1–2 ngày.' WHERE slug = 'xx-xong-khoi-th-450gr';
UPDATE products SET usage_instruction = 'Giữ lạnh liên tục. Khi gần hết hạn nên dùng ngay (ăn liền hoặc áp chảo nhẹ). Sau khi mở, bọc kín và dùng trong 24–48 giờ.' WHERE slug = 'xx-mortadella-200gr';
UPDATE products SET usage_instruction = 'Bảo quản đông. Rã đông ngăn mát và chế biến ngay (chiên, hấp, nấu lẩu). Không tái cấp đông sau khi rã đông.' WHERE slug = 'surimi-nhan-hai-san';
UPDATE products SET usage_instruction = 'Bánh bao của Thọ Phát cần bảo quản đông. Khi cận date nên hấp ngay và dùng trong ngày. Nếu đã rã đông thì không cấp đông lại.' WHERE slug = 'bb-tho-phat-1-cut';
UPDATE products SET usage_instruction = 'Giữ đông đến khi sử dụng. Hấp chín kỹ trước khi ăn và dùng trong ngày mở bao bì. Không tái cấp đông.' WHERE slug = 'bb-tho-phat-com-xanh';

-- 4. CHẢ GIÒ & NEM
UPDATE products SET usage_instruction = 'Bảo quản đông -18°C. Khi cận date nên chiên trực tiếp từ trạng thái đông hoặc rã đông ngăn mát rồi chiên ngay. Dùng hết trong ngày sau khi mở gói.' WHERE slug = 'cha-gio-hai-san-dac-biet';
UPDATE products SET usage_instruction = 'Giữ đông đến khi chiên. Cận date là triển liền: chiên vàng giòn ăn với bún thịt nướng, cuốn rau sống chấm mắm chua ngọt hoặc cắt nhỏ làm topping bánh hỏi. Ngon nhất là chiên từ trạng thái đông.' WHERE slug = 'cha-gio-nhan-thit';
UPDATE products SET usage_instruction = 'Chiên ngập dầu cho giòn rụm rồi ăn kèm tương ớt hoặc sốt mayonnaise. Có thể cuốn bánh tráng rau sống làm món ăn vặt nhẹ nhàng. Dùng trong ngày sau khi mở gói.' WHERE slug = 'cha-gio-chay';
UPDATE products SET usage_instruction = 'Cận date là cắt khoanh ăn liền, chiên xém cạnh cho thơm hoặc làm cơm chiên giò lụa siêu bắt cơm. Sau khi mở nhớ bảo quản mát và dùng trong 1–2 ngày.' WHERE slug = 'gio-lua-250gr';
UPDATE products SET usage_instruction = 'Ăn liền kèm tỏi ớt, hoặc nướng sơ cho thơm, làm nem chua rán chấm tương ớt là “hết nước chấm”. Bảo quản mát và dùng ngay khi mở.' WHERE slug = 'nem-chua-200gr';
UPDATE products SET usage_instruction = 'Áp chảo hoặc nướng than cho xém mặt, ăn cùng bún – rau sống – nước mắm pha hoặc làm bánh mì nem nướng. Rã đông ngăn mát rồi chế biến và dùng trong ngày.' WHERE slug = 'nem-nuong-400gr';

-- 5. BÁNH XẾP & DIMSUM
UPDATE products SET usage_instruction = 'Bánh của CJ Bibigo có thể áp chảo kiểu há cảo chiên giòn đáy, hoặc nấu nước làm mandu soup ấm bụng. Không cần rã đông hoàn toàn, nấu trực tiếp là ngon nhất.' WHERE slug = 'banh-xep-bibigo-haisan';
UPDATE products SET usage_instruction = 'Chiên giòn ăn kèm kim chi hoặc làm món há cảo chiên sốt cay kiểu Hàn là “đỉnh bài”. Dùng ngay khi mở và không tái cấp đông.' WHERE slug = 'banh-xep-bibigo-thit';

-- 6. MÌ & PHỞ
UPDATE products SET usage_instruction = 'Mì của Cung Đình cận date thì nấu liền cho nóng hổi. Có thể thêm trứng, bò lát, rau cải cho “upgrade” thành tô mì full topping. Bảo quản nơi khô ráo, tránh ẩm.' WHERE slug = 'mi-goi-bo-tom-cung-dinh';
UPDATE products SET usage_instruction = 'Trộn đúng sốt kèm theo, có thể thêm xúc xích/ốp la cho đậm vị. Nên dùng sớm khi gần hạn để đảm bảo sợi mì còn giòn, không bị ẩm.' WHERE slug = 'mi-tron-tho-spagety-bbq';
UPDATE products SET usage_instruction = 'Chế nước sôi đúng mức, đậy kín 3–4 phút là ăn được. Có thể thêm phô mai lát hoặc trứng lòng đào cho béo hơn.' WHERE slug = 'my-ly-bo-tom-thit-nam';
UPDATE products SET usage_instruction = 'Thích hợp ăn nhanh buổi sáng. Thêm hành lá, chanh, ớt tươi là ra vibe phở tiệm. Bảo quản khô ráo.' WHERE slug = 'pho-bo-ga-tho-cung-dinh';
UPDATE products SET usage_instruction = 'Có thể nấu kèm bò tươi, trứng hoặc rau giá cho đầy đặn hơn. Dùng trước hạn để sợi phở không bị gãy vụn.' WHERE slug = 'pho-bo-goi-ha-noi';

-- 7. GẠO & NGŨ CỐC
UPDATE products SET usage_instruction = 'Cận date nên nấu sớm, vo nhẹ rồi ngâm 30–60 phút trước khi nấu để cơm mềm hơn. Có thể nấu cơm, làm cơm cuộn hoặc cháo gạo lức.' WHERE slug = 'gao-luc-tim-st-1kg';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo. Nếu gần hạn nên sử dụng dần, có thể nấu cơm hằng ngày hoặc làm cơm chiên, cơm tấm.' WHERE slug = 'gao-trang-co-thom-10kg';
UPDATE products SET usage_instruction = 'Gạo ST25 nên dùng sớm để giữ mùi thơm đặc trưng. Nấu cơm trắng ăn kèm món mặn là ngon nhất.' WHERE slug = 'gao-trang-st25-10kg';
UPDATE products SET usage_instruction = 'Phù hợp nấu cơm gia đình hằng ngày. Khi cận date nên dùng trước, tránh để nơi ẩm dễ sinh mọt.' WHERE slug = 'gao-trang-sinh-thai-2kg';
UPDATE products SET usage_instruction = 'Dùng pha sữa nóng hoặc nước ấm uống buổi sáng. Sau khi mở túi nên đậy kín và dùng trong 1–2 tháng.' WHERE slug = 'ngu-coc-dd-canxi-500gr';
UPDATE products SET usage_instruction = 'Phù hợp dùng thay bữa phụ. Pha nước ấm khuấy đều, dùng sớm khi gần hạn để đảm bảo hương vị.' WHERE slug = 'ngu-coc-dd-diabetcare-400gr';
UPDATE products SET usage_instruction = 'Pha nóng hoặc lạnh đều được. Có thể xay chung với sữa tươi thành sinh tố ngũ cốc.' WHERE slug = 'ngu-coc-dd-gac-500gr';
UPDATE products SET usage_instruction = 'Dùng làm bữa sáng nhanh. Sau khi mở nên bảo quản kín, tránh ẩm để không vón cục.' WHERE slug = 'ngu-coc-dd-varna-complete-500g';

-- 8. ĐỒ UỐNG & GIA VỊ
UPDATE products SET usage_instruction = 'Tương ớt của Cầu Tre nên dùng sớm khi gần hạn. Sau khi mở nắp cần bảo quản mát và dùng trong 1–2 tháng.' WHERE slug = 'tuong-ot-cau-tre-210gr';
UPDATE products SET usage_instruction = 'Nước của La Vie nên bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp. Khi gần hạn nên dùng sớm, không để ngoài trời nóng lâu.' WHERE slug = 'lavie-0-5l';
UPDATE products SET usage_instruction = 'Nước của La Vie nên bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp. Khi gần hạn nên dùng sớm, không để ngoài trời nóng lâu.' WHERE slug = 'lavie-5l';
UPDATE products SET usage_instruction = 'Nước của La Vie nên bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp. Khi gần hạn nên dùng sớm, không để ngoài trời nóng lâu.' WHERE slug = 'lavie-1-5l';
UPDATE products SET usage_instruction = 'Bảo quản mát. Khi gần hạn nên uống trong 3–5 ngày sau khi mở nắp. Ngon nhất là uống lạnh buổi sáng hoặc sau bữa ăn.' WHERE slug = 'nuoc-loi-khuan-dao-1500ml';
UPDATE products SET usage_instruction = 'Bảo quản mát. Khi gần hạn nên uống trong 3–5 ngày sau khi mở nắp. Ngon nhất là uống lạnh buổi sáng hoặc sau bữa ăn.' WHERE slug = 'nuoc-loi-khuan-tao-1500ml';
UPDATE products SET usage_instruction = 'Ăn liền hoặc để ngăn mát cho mát lạnh. Khi gần hạn nên dùng sớm để giữ độ tươi và vị trái cây.' WHERE slug = 'nuoc-ep-jele-vitamin';
UPDATE products SET usage_instruction = 'Uống lạnh sẽ ngon hơn. Sau khi mở nắp cần bảo quản tủ lạnh và dùng trong 2–3 ngày.' WHERE slug = 'nuoc-gao-hq-1500ml';
UPDATE products SET usage_instruction = 'Ngon nhất khi ướp lạnh. Nếu cận date nên dùng ngay trong ngày mở nắp.' WHERE slug = 'nuoc-dua-tuoi-330ml';
UPDATE products SET usage_instruction = 'Lắc đều trước khi uống, uống lạnh là “đã” nhất. Sau khi mở bảo quản mát và dùng trong 2–3 ngày.' WHERE slug = 'nuoc-dua-tac-1l';
UPDATE products SET usage_instruction = 'Sản phẩm của Green Bird nên dùng ngay khi gần hạn. Ngon hơn khi uống mát, sau khi mở nên dùng hết trong ngày.' WHERE slug = 'yen-green-bird-babi-4-1';
UPDATE products SET usage_instruction = 'Uống trực tiếp, có thể để lạnh trước khi dùng. Sau khi mở nắp bảo quản mát và dùng trong 24 giờ.' WHERE slug = 'yen-green-bird-cu-cai-5-1';

-- 9. SỮA & CHẾ PHẨM SỮA
UPDATE products SET usage_instruction = 'Sữa của Vinamilk Green Farm nên bảo quản mát. Khi gần hạn nên dùng ngay, sau khi mở uống hết trong ngày.' WHERE slug = 'sua-tuoi-to-yen-vnm';
UPDATE products SET usage_instruction = 'Giữ lạnh liên tục. Khi cận date nên dùng sớm, tránh để ngoài nhiệt độ phòng lâu.' WHERE slug = 'sua-tuoi-flex-duong';
UPDATE products SET usage_instruction = 'Sau khi mở nắp cần bảo quản tủ lạnh và dùng trong 2–3 ngày. Cận date thì ưu tiên sử dụng trước.' WHERE slug = 'sua-tuoi-lat-965ml';
UPDATE products SET usage_instruction = 'Uống lạnh sẽ ngon hơn. Sau khi mở nên dùng ngay trong ngày.' WHERE slug = 'sua-tuoi-ha-lan-dau';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo. Sau khi mở nắp nên đậy kín và bảo quản mát, dùng trong 1–2 tháng. Có thể pha cà phê, làm sinh tố, làm bánh.' WHERE slug = 'sua-dac-ha-lan';
UPDATE products SET usage_instruction = 'Sau khi mở cần bảo quản kín, tránh kiến và ẩm. Dùng pha cà phê sữa đá hoặc làm bánh flan là hết nhanh liền' WHERE slug = 'sua-dac-hoan-hao';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, sau khi mở đậy kín và dùng trong 1–2 tháng. Tránh để gần nguồn nhiệt.' WHERE slug = 'sua-dac-xanh-bien-1l';
UPDATE products SET usage_instruction = ' Sau khi mở nên đậy kín, bảo quản mát. Dùng pha cà phê, chấm bánh mì hoặc làm sữa chua là “hết veo” nhanh lắm.' WHERE slug = 'sua-dac-cam-380g';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, sau khi mở đậy kín và dùng trong 1–2 tháng. Tránh để gần nguồn nhiệt.' WHERE slug = 'sua-dac-ong-tho-do';
UPDATE products SET usage_instruction = ' Bảo quản 2–6°C liên tục. Hàng cận date ưu tiên xuất bán trước theo nguyên tắc FIFO. Kiểm tra bao bì nguyên vẹn trước khi bán. Sau khi mở nắp phải sử dụng ngay, không để ngoài nhiệt độ phòng quá 2 giờ.' WHERE slug = 'sua-chua-zott';
UPDATE products SET usage_instruction = 'Bảo quản 2–6°C. Hàng gần hạn cần ưu tiên tiêu thụ sớm. Không sử dụng nếu hộp phồng hoặc rò rỉ. Dùng ngay sau khi mở.' WHERE slug = 'sua-chua-th-com-nep';
UPDATE products SET usage_instruction = 'Bảo quản lạnh 2–6°C. Khi cận date cần kiểm tra tình trạng bao bì trước khi xuất bán. Sau khi mở phải sử dụng ngay, không bảo quản lại phần thừa.' WHERE slug = 'sua-chua-hoff';
UPDATE products SET usage_instruction = ' Bảo quản lạnh liên tục. Hàng cận date ưu tiên xuất trước. Sau khi mở nắp nên sử dụng hết trong một lần.' WHERE slug = 'sua-chua-nestle-yogu';
UPDATE products SET usage_instruction = 'Bảo quản 2–6°C. Khi gần hạn sử dụng cần tiêu thụ trước ngày in trên bao bì. Sau khi mở phải dùng ngay để đảm bảo chất lượng.' WHERE slug = 'sua-chua-tran-chau';
UPDATE products SET usage_instruction = 'Giữ lạnh liên tục 2–6°C. Không sử dụng nếu bao bì biến dạng. Dùng ngay sau khi mở.' WHERE slug = 'sua-chua-green-farm-it-duong';
UPDATE products SET usage_instruction = 'Bảo quản lạnh. Hàng cận date phải được ưu tiên xuất trước. Sau khi mở cần sử dụng ngay.' WHERE slug = 'sua-chua-vnm-it-duong';
UPDATE products SET usage_instruction = 'Bảo quản 2–6°C. Không sử dụng nếu có mùi lạ hoặc dấu hiệu bất thường. Sau khi mở nắp phải dùng ngay.' WHERE slug = 'sua-chua-khong-duong';
UPDATE products SET usage_instruction = 'Bảo quản lạnh 2–6°C. Khi gần hạn cần tiêu thụ sớm. Sau khi mở nắp phải bảo quản lạnh và sử dụng trong vòng 24 giờ.' WHERE slug = 'sua-chua-uong-trang-500ml';
UPDATE products SET usage_instruction = ' Bảo quản lạnh liên tục. Hàng cận date ưu tiên xuất trước. Dùng ngay sau khi mở.' WHERE slug = 'vang-sua-monte-vani-socola';
UPDATE products SET usage_instruction = 'Sản phẩm của Belcube. Bảo quản theo hướng dẫn trên bao bì (khô, mát). Sau khi mở hộp cần bảo quản kín và sử dụng trong 3–5 ngày.' WHERE slug = 'pm-belcube-vi-sua';
UPDATE products SET usage_instruction = ' Bảo quản đúng điều kiện ghi trên nhãn. Sau khi mở hộp nên sử dụng trong thời gian ngắn để đảm bảo chất lượng.' WHERE slug = 'pm-con-bo-cuoi-16m';
UPDATE products SET usage_instruction = 'Giữ nơi khô mát hoặc theo hướng dẫn bao bì. Sau khi mở cần sử dụng sớm.' WHERE slug = 'pm-con-bo-cuoi-24m';
UPDATE products SET usage_instruction = 'Bảo quản đúng quy định. Sau khi mở nên dùng trong thời gian ngắn.' WHERE slug = 'pm-con-bo-cuoi-8m';

-- 10. KEM
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Hàng cận date cần duy trì nhiệt độ ổn định, không tái cấp đông nếu đã rã mềm. Sử dụng ngay sau khi lấy khỏi tủ đông.' WHERE slug = 'kem-cay-delight-80ml';
UPDATE products SET usage_instruction = ' Bảo quản đông ≤ -18°C liên tục. Hàng cận date phải duy trì nhiệt độ ổn định, không để rã mềm rồi cấp đông lại. Sử dụng ngay sau khi mở nắp, hạn chế mở nhiều lần gây thay đổi nhiệt độ.' WHERE slug = 'kem-gelato-phomai-dau-tiramisu-400ml';
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Hàng gần hạn ưu tiên xuất trước. Không sử dụng nếu có dấu hiệu dăm đá nhiều bất thường do bảo quản sai nhiệt độ.' WHERE slug = 'kem-gelato-chanh-day-400ml';
UPDATE products SET usage_instruction = 'Giữ đông sâu liên tục. Sau khi mở hộp nên sử dụng trong thời gian ngắn và bảo quản lại ngay trong tủ đông.' WHERE slug = 'kem-gelato-dua-400ml';
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Hàng cận date cần đảm bảo không bị rã mềm. Sử dụng ngay sau khi lấy khỏi tủ đông.' WHERE slug = 'kem-oc-que-delight-110ml';
UPDATE products SET usage_instruction = ' Bảo quản đông liên tục. Không tái cấp đông nếu đã rã mềm. Sử dụng ngay khi mở bao bì.' WHERE slug = 'kem-que-socola-ca-phe-70ml';
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Hàng gần hạn cần kiểm tra bao bì nguyên vẹn. Sử dụng ngay sau khi mở.' WHERE slug = 'kem-sua-chua-subo-susu-50g';
UPDATE products SET usage_instruction = 'Bảo quản đông sâu. Khi cận date cần đảm bảo nhiệt độ ổn định trong suốt quá trình lưu kho. Sử dụng ngay sau khi mở bao bì.' WHERE slug = 'kem-banh-ca-hq';
UPDATE products SET usage_instruction = 'Giữ nhiệt độ đông ổn định ≤ -18°C. Không cấp đông lại sản phẩm đã rã mềm. Sử dụng ngay sau khi lấy khỏi tủ.' WHERE slug = 'kem-cay-cosmo';
UPDATE products SET usage_instruction = 'Sản phẩm của Melona. Bảo quản đông liên tục. Hàng cận date ưu tiên xuất trước. Sử dụng ngay sau khi mở.' WHERE slug = 'kem-melona';
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Không sử dụng nếu bao bì rách hoặc sản phẩm biến dạng do rã đông.' WHERE slug = 'kem-hong-tuyet';
UPDATE products SET usage_instruction = 'Giữ đông sâu liên tục. Sử dụng ngay sau khi mở, không tái cấp đông.' WHERE slug = 'kem-loc-xoay-fanfare';
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Hàng gần hạn cần ưu tiên xuất bán trước.' WHERE slug = 'kem-sua-chua-lotte-85ml';
UPDATE products SET usage_instruction = 'Bảo quản đông sâu. Không để sản phẩm rã mềm trong quá trình trưng bày. Sử dụng ngay sau khi mở bao bì.' WHERE slug = 'kem-thap-oc-que-lotte-160ml';
UPDATE products SET usage_instruction = 'Giữ nhiệt độ đông ổn định. Không sử dụng nếu nắp hoặc bao bì có dấu hiệu hở. Sử dụng ngay sau khi mở.' WHERE slug = 'kem-pongta-soda';
UPDATE products SET usage_instruction = 'Bảo quản đông ≤ -18°C. Hàng cận date cần đảm bảo chuỗi lạnh không bị gián đoạn. Sử dụng ngay khi mở bao bì.' WHERE slug = 'kem-phu-thai-lan';

-- 11. BÁNH
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, thoáng mát. Hàng cận date cần ưu tiên xuất trước. Sau khi mở bao bì nên bảo quản kín và sử dụng trong thời gian ngắn để tránh ẩm mốc.' WHERE slug = 'banh-an-sang-koko-330gr';
UPDATE products SET usage_instruction = ' Bảo quản nơi khô mát. Sau khi mở gói nên sử dụng trong 1–2 ngày. Không sử dụng nếu có dấu hiệu mốc.' WHERE slug = 'banh-cest-bon-baguette';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp. Hàng gần hạn cần xuất trước theo FIFO. Sau khi mở hộp nên đậy kín.' WHERE slug = 'banh-custas-12p';
UPDATE products SET usage_instruction = 'Bảo quản khô mát. Hàng cận date ưu tiên tiêu thụ sớm. Không sử dụng nếu bao bì rách hoặc sản phẩm có mùi lạ.' WHERE slug = 'banh-chocopie-12p';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Hàng cận date cần ưu tiên xuất bán trước theo FIFO. Sau khi mở bao bì phải đóng kín và sử dụng trong thời gian ngắn để tránh ẩm. Không sử dụng nếu có mùi lạ hoặc dấu hiệu mốc.' WHERE slug = 'banh-marine-boy';
UPDATE products SET usage_instruction = 'Bảo quản khô ráo, tránh nơi có độ ẩm cao. Khi gần hạn sử dụng cần ưu tiên tiêu thụ sớm. Sau khi mở gói phải bảo quản kín để giữ độ giòn.' WHERE slug = 'banh-quy-lua-mach-malay';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô mát. Hàng cận date cần kiểm tra bao bì nguyên vẹn trước khi bán. Sau khi mở nên sử dụng trong thời gian ngắn và đậy kín để tránh ẩm mốc.' WHERE slug = 'banh-cha-bong-ga-md';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, tránh nhiệt độ cao. Hàng gần hạn cần ưu tiên xuất trước. Không sử dụng nếu bao bì rách hoặc sản phẩm biến dạng.' WHERE slug = 'banh-oreo-pie';
UPDATE products SET usage_instruction = 'Bảo quản khô ráo, tránh ẩm. Hàng cận date cần tiêu thụ sớm để đảm bảo độ giòn và hương vị. Sau khi mở bao bì phải đóng kín.' WHERE slug = 'banh-que-cac-vi';
UPDATE products SET usage_instruction = 'Sản phẩm của Solite. Bảo quản nơi khô mát. Hàng gần hạn cần xuất trước. Sau khi mở hộp nên bảo quản kín và sử dụng trong thời gian ngắn.' WHERE slug = 'banh-solite-la-dua';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp. Hàng cận date cần ưu tiên bán trước. Sau khi mở gói phải đóng kín để tránh ỉu.' WHERE slug = 'banh-slide-khoai-tay';
UPDATE products SET usage_instruction = 'Bảo quản khô ráo, thoáng mát. Hàng gần hạn cần xuất trước theo FIFO. Sau khi mở bao bì nên dùng trong thời gian ngắn.' WHERE slug = 'banh-afc';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô mát, tránh độ ẩm cao. Hàng cận date cần ưu tiên tiêu thụ sớm. Không sử dụng nếu có dấu hiệu mốc hoặc mùi bất thường.' WHERE slug = 'banh-plu-vegetable';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, tránh nhiệt độ cao. Sau khi mở gói cần đóng kín để giữ độ giòn. Hàng gần hạn ưu tiên xuất trước.' WHERE slug = 'banh-quy-ritz-phomai';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp. Hàng cận date cần tiêu thụ trước ngày in trên bao bì. Sau khi mở phải bảo quản kín.' WHERE slug = 'banh-lu-phap-petit';
UPDATE products SET usage_instruction = 'Sản phẩm của Richy. Bảo quản khô mát. Hàng gần hạn cần ưu tiên xuất trước. Sau khi mở khay nên sử dụng trong thời gian ngắn.' WHERE slug = 'banh-richy-peppie-khay';
UPDATE products SET usage_instruction = 'Bảo quản nơi khô ráo. Hàng cận date cần kiểm soát chặt chẽ tình trạng bao bì trước khi bán. Sau khi mở gói phải đóng kín và sử dụng trong thời gian ngắn.' WHERE slug = 'banh-peppie-tui';