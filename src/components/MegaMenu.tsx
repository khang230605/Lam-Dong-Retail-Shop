import Link from 'next/link';
import { Category } from '@/services/CategoryService';
import { ChevronRight } from 'lucide-react';

export default function MegaMenu({ categories }: { categories: Category[] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          
          {/* Loop qua các danh mục CHA */}
          {categories.map((parent) => (
            <div key={parent.id} className="space-y-4">
              {/* Tiêu đề Cha */}
              <Link href={`/products?cat=${parent.slug}`} className="block font-bold text-brand-blue text-lg hover:text-brand-orange transition flex items-center gap-2">
                 {parent.name} <ChevronRight className="w-4 h-4" />
              </Link>
              
              {/* Danh sách Con */}
              <ul className="space-y-2">
                {parent.children?.map((child) => (
                  <li key={child.id}>
                    <Link href={`/products?cat=${child.slug}`} className="text-gray-600 hover:text-brand-orange text-sm transition">
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

         

        </div>
      </div>
    </div>
  );
}