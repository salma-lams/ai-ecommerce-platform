import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

const MOCK_WISHLIST = [
  { id: '1', name: 'The Classic Knit',      price: '£99',  imageUrl: '/images/IMG1.png' },
  { id: '4', name: 'Puffer Utility Vest',   price: '£155', imageUrl: '/images/IMG4.png' },
  { id: '6', name: 'Cargo Field Jacket',    price: '£140', imageUrl: '/images/IMG6.png' },
];

export default function WishlistPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold italic mb-2" style={{color: 'var(--brand-red)'}}>✦ Saved Items</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Your Wishlist</h1>
        <p className="mt-3 text-base text-gray-400">{MOCK_WISHLIST.length} items saved</p>
        <div className="w-12 h-0.5 mt-4 bg-black dark:bg-white" />
      </div>

      {MOCK_WISHLIST.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_WISHLIST.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-white">Your wishlist is empty</p>
          <p className="text-gray-400 text-sm">Save items you love and they will appear here.</p>
          <Link href="/products" className="mt-2 btn-brand inline-flex items-center justify-center px-6 py-3 text-sm font-medium">
            Browse Collection
          </Link>
        </div>
      )}
    </div>
  );
}
