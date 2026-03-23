import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

const MOCK_PRODUCTS = [
  { id: '1', name: 'The Classic Knit',       price: '£99',  imageUrl: '/images/IMG1.png' },
  { id: '2', name: 'Heritage Tweed Set',     price: '£120', imageUrl: '/images/IMG2.png' },
  { id: '3', name: 'Winter Layering Piece',  price: '£99',  imageUrl: '/images/IMG3.png' },
  { id: '4', name: 'Puffer Utility Vest',    price: '£155', imageUrl: '/images/IMG4.png' },
  { id: '5', name: 'Relaxed Wide Trousers',  price: '£99',  imageUrl: '/images/IMG5.png' },
  { id: '6', name: 'Cargo Field Jacket',     price: '£140', imageUrl: '/images/IMG6.png' },
];

const CATEGORIES = ['All', 'Knitwear', 'Outerwear', 'Trousers', 'Accessories'];

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold italic mb-2" style={{color: 'var(--brand-red)'}}>✦ Winter 2026</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">The Collection</h1>
        <p className="mt-3 text-base text-gray-400">{MOCK_PRODUCTS.length} pieces crafted for the modern wardrobe.</p>
        <div className="w-12 h-0.5 mt-4 bg-black dark:bg-white" />
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-52 shrink-0 space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Category</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat, i) => (
                <li key={cat}>
                  <a href="#" className={`block text-sm py-1 transition-colors font-medium ${i === 0 ? 'text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Price Range</h3>
            <ul className="space-y-2">
              {['Under £100', '£100–£150', 'Over £150'].map((p) => (
                <li key={p}>
                  <a href="#" className="block text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors font-medium">{p}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-400">{MOCK_PRODUCTS.length} results</p>
            <select className="text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-[#0f0f0f] focus:outline-none">
              <option>Sort: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK_PRODUCTS.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="block">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
