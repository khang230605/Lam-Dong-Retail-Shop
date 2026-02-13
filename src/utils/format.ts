// Hàm định dạng số thành tiền Việt Nam (Ví dụ: 10000 -> 10.000 ₫)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

// Hàm tính phần trăm giảm giá (nếu có giá gốc)
export const calculateDiscount = (original: number, current: number): number => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};