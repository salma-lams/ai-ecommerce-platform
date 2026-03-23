import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: string | number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const displayPrice = typeof product.price === 'number' ? `£${product.price.toFixed(2)}` : product.price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 dark:bg-[#0a0a0a] dark:border-gray-800">
      {/* Image */}
      <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          unoptimized={true}
          className="object-contain object-center group-hover:scale-110 transition-transform duration-700"
        />
        {/* NEW badge — brand blue */}
        <div className="absolute top-4 left-4 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 z-10 rounded-full" style={{background: '#22c55e'}}>
          New
        </div>
        {/* Wishlist heart — brand orange on hover */}
        <button className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md text-gray-300 hover:text-[#E8611A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col p-5 flex-1 items-center text-center">
        {/* Rating stars — brand yellow */}
        <div className="flex justify-center items-center gap-0.5 mb-3" style={{color: 'var(--brand-yellow)'}}>
          {[1,2,3,4].map(star => (
            <svg key={star} xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ))}
          <div className="relative inline-block w-3 h-3 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
          </div>
        </div>

        <h3 className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-gray-100 capitalize leading-snug">{product.name}</h3>

        <div className="mt-4 pt-4 flex w-full flex-col items-center border-t border-gray-50 dark:border-gray-800">
          <span className="text-[15px] font-medium text-gray-700 dark:text-gray-200 mb-4">{displayPrice}</span>
          {/* Brand gradient button */}
          <button className="btn-brand w-full px-4 py-3 text-[13px]">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
