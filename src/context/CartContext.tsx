'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Định nghĩa kiểu dữ liệu cho Item trong giỏ
export interface CartItem {
  type: 'product' | 'bundle'; // Đánh dấu loại
  
  // Nếu là sản phẩm lẻ
  product?: any;
  variant?: any;
  
  // Nếu là Bundle
  bundle?: any;
  
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: any, variant: any, quantity?: number) => void;
  addBundleToCart: (bundle: any, quantity?: number) => void; // Hàm mới
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void; // Sửa dùng index cho dễ
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load giỏ hàng từ LocalStorage khi mới vào
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Lưu giỏ hàng mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // 1. Thêm Sản phẩm lẻ
  const addToCart = (product: any, variant: any, quantity = 1) => {
    setItems(prev => {
      // Kiểm tra xem đã có món này chưa (cùng variant ID)
      const existingIdx = prev.findIndex(item => item.type === 'product' && item.variant.id === variant.id);
      
      if (existingIdx >= 0) {
        const newItems = [...prev];
        newItems[existingIdx].quantity += quantity;
        return newItems;
      }
      return [...prev, { type: 'product', product, variant, quantity }];
    });
  };

  // 2. Thêm Bundle (HÀM MỚI)
  const addBundleToCart = (bundle: any, quantity = 1) => {
    setItems(prev => {
      // Kiểm tra xem đã có bundle này chưa (cùng bundle ID)
      const existingIdx = prev.findIndex(item => item.type === 'bundle' && item.bundle.id === bundle.id);
      
      if (existingIdx >= 0) {
        const newItems = [...prev];
        newItems[existingIdx].quantity += quantity;
        return newItems;
      }
      return [...prev, { type: 'bundle', bundle, quantity }];
    });
  };

  // 3. Xóa item (Dùng index trong mảng để xóa chính xác)
  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // 4. Cập nhật số lượng
  const updateQuantity = (index: number, quantity: number) => {
     if (quantity <= 0) {
        removeFromCart(index);
        return;
     }
     setItems(prev => {
        const newItems = [...prev];
        newItems[index].quantity = quantity;
        return newItems;
     });
  };

  const clearCart = () => setItems([]);

  // Tính tổng
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    if (item.type === 'product') {
        return sum + (item.variant.price * item.quantity);
    } else {
        // Nếu là bundle thì lấy giá của bundle
        return sum + (item.bundle.price * item.quantity);
    }
  }, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addToCart, addBundleToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};