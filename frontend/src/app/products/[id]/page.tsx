import Link from 'next/link';
import Image from 'next/image';

const PRODUCTS: Record<string, { name: string; description: string; price: string; features: string[]; tag: string }> = {
  '1': { name: 'The Classic Knit', description: 'A refined take on casual knitwear. Blending softness and structure in equal measure for the modern wardrobe.', price: '£99.00', features: ['100% Merino Wool Blend', 'Regular tapered fit', 'Available in 4 colourways', 'Machine washable at 30°C'], tag: 'New' },
  '2': { name: 'Heritage Tweed Set', description: 'Timeless tailoring meets contemporary silhouette. Premium-weight fabric with a lived-in feel from day one.', price: '£120.00', features: ['Heavyweight tweed fabric', 'Half-lined jacket', 'Matching trousers included', 'Dry clean only'], tag: 'Trending' },
  '3': { name: 'Winter Layering Piece', description: 'The ultimate mid-layer. Wear it open over a shirt or closed as a standalone — it works both ways effortlessly.', price: '£99.00', features: ['Brushed fleece interior', 'Two-way zipper', 'Subtle logo embroidery', 'Recycled polyester shell'], tag: 'New' },
  '4': { name: 'Puffer Utility Vest', description: 'Warmth without bulk. Our signature insulation tech keeps you at the perfect temperature all season long.', price: '£155.00', features: ['Lightweight down fill', 'Water-resistant outer', 'Packable into internal pocket', 'Adjustable hem cinch'], tag: 'Limited' },
  '5': { name: 'Relaxed Wide Trousers', description: 'Cut with an easy, wide silhouette in a premium cotton canvas. The perfect elevated casual trouser.', price: '£99.00', features: ['100% cotton canvas', 'Elasticated waistband', 'Deep side pockets', 'Ankle hem with roll-up option'], tag: 'New' },
  '6': { name: 'Cargo Field Jacket', description: 'A modern utilitarian jacket for the transitional season. Built with function but finished with precision tailoring.', price: '£140.00', features: ['6 external pockets', 'Removable storm hood', 'Button + zip dual closure', 'Unisex sizing'], tag: 'New' },
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS[id] ?? PRODUCTS['1'];
  const imageUrl = `/images/IMG${id}.png`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Image */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#0f0f0f]">
          <Image src={imageUrl} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" unoptimized={true} className="object-contain p-8 hover:scale-[1.03] transition-transform duration-500" />
          <span className="absolute top-5 left-5 text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full z-10" style={{background: 'var(--brand-blue)'}}>
            {product.tag}
          </span>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-sm font-semibold italic mb-3" style={{color: 'var(--brand-red)'}}>✦ Winter Collection</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white leading-tight tracking-tight capitalize">{product.name}</h1>
          </div>

          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.price}</p>

          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">{product.description}</p>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Product Details</h3>
            <ul className="space-y-2.5">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0" style={{color: 'var(--brand-green)'}}><polyline points="20 6 9 17 4 12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/checkout" className="btn-brand flex-1 py-4 text-center text-sm font-bold shadow-lg">
              Buy Now &nbsp;»
            </Link>
            <button className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-[#E8611A] hover:border-[#E8611A]/30 transition-all bg-white dark:bg-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
