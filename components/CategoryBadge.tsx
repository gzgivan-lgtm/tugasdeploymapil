import { Category } from '@/types/schedule';

const styles: Record<Category, string> = {
  meeting:  'bg-blue-100 text-blue-700',
  tugas:    'bg-yellow-100 text-yellow-800',
  reminder: 'bg-green-100 text-green-700',
  acara:    'bg-pink-100 text-pink-700',
  lainnya:  'bg-gray-100 text-gray-600',
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles[category]}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}
