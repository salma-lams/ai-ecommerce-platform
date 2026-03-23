"use client";
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

const MOCK_PRODUCTS = [
  { id: '1', name: 'The Classic Knit',       price: '£99',  imageUrl: '/images/IMG1.png' },
  { id: '2', name: 'Heritage Tweed Set',     price: '£120', imageUrl: '/images/IMG2.png' },
  { id: '3', name: 'Winter Layering Piece',  price: '£99',  imageUrl: '/images/IMG3.png' },
  { id: '4', name: 'Puffer Utility Vest',    price: '£155', imageUrl: '/images/IMG4.png' },
  { id: '5', name: 'Relaxed Wide Trousers',  price: '£99',  imageUrl: '/images/IMG5.png' },
  { id: '6', name: 'Cargo Field Jacket',     price: '£140', imageUrl: '/images/IMG6.png' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full" style={{background: '#f3faff'}}>

      {/* Hero Section */}
      <section>
        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[60vh]">

          {/* LEFT — Text Content (Refined for "Perfect" Design) */}
          <div className="flex-1 text-center md:text-left py-8 md:py-16 z-10">

            {/* Premium Collection Label */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
              <span className="w-10 h-[2px] bg-[#c1121f] rounded-full" />
              <p className="text-[13px] font-extrabold uppercase tracking-[0.35em]" style={{color: '#c1121f'}}>
                Winter Collection
              </p>
            </div>

            {/* Modern Main Heading */}
            <h1 className="font-sans font-black text-gray-900 dark:text-white leading-[1.02] mb-6 tracking-tight drop-shadow-sm transition-transform duration-700 hover:scale-[1.01]" style={{fontSize: 'clamp(3rem, 6vw, 4.5rem)'}}>
              New Winter<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bbfe8] to-[#4aa8d1]">Collection</span>
            </h1>

            {/* Elevated Clean Tagline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light tracking-wide mb-12 max-w-lg mx-auto md:mx-0 opacity-90 leading-relaxed border-l-[3px] border-[#5bbfe8] pl-5">
              "where trend meets elegance"
            </p>

            {/* Premium CTA Button */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-5 px-10 py-[22px] bg-gray-900 text-white font-extrabold text-[13px] uppercase tracking-[0.25em] rounded-full transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5bbfe8]/30 overflow-hidden"
              >
                <span className="relative z-10">Explore the Collection</span>
                <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {/* Dynamic hover gradient overflow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5bbfe8]/90 to-[#4aa8d1]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>

          </div>

          {/* RIGHT — Image, full height */}
          <div className="flex-1 flex justify-center md:justify-end items-end self-stretch">
            <div className="relative h-full min-h-[600px] md:min-h-[780px] w-full max-w-[560px]">
              <Image
                src="/images/hero-img.png"
                alt="New Winter Collection"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                unoptimized={true}
                className="object-contain object-bottom scale-110 origin-bottom mix-blend-multiply"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trending <span style={{color: '#22c55e'}}>Pieces</span>
          </h2>
          <Link href="/products" className="text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PRODUCTS.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="block">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
