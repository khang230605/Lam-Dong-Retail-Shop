import { supabase } from '@/utils/supabase';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  parent_id?: number;
  children?: Category[]; // Để chứa các danh mục con
}

export class CategoryService {
  
  // Lấy toàn bộ danh mục và gom nhóm cha-con
  static async getTree() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (error || !data) return [];

    // Logic ghép cây (Tree)
    const categoryMap: Record<number, Category> = {};
    const roots: Category[] = [];

    // 1. Map tất cả category
    data.forEach(cat => {
      categoryMap[cat.id] = { ...cat, children: [] };
    });

    // 2. Gom con vào cha
    data.forEach(cat => {
      if (cat.parent_id) {
        // Nếu có cha -> đẩy vào mảng children của cha
        if (categoryMap[cat.parent_id]) {
            categoryMap[cat.parent_id].children?.push(categoryMap[cat.id]);
        }
      } else {
        // Nếu không có cha -> Nó là Root (Gốc)
        roots.push(categoryMap[cat.id]);
      }
    });

    return roots;
  }
}