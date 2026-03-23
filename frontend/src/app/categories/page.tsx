import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { id: 'knitwear',   name: 'Knitwear',    count: 8,  desc: 'Soft merino blends and cotton knits', img: '/images/IMG1.png' },
  { id: 'outerwear',  name: 'Outerwear',   count: 12, desc: 'Jackets, vests, and layering pieces', img: '/images/IMG4.png' },
  { id: 'trousers',   name: 'Trousers',    count: 6,  desc: 'Tailored and relaxed silhouettes', img: '/images/IMG5.png' },
  { id: 'sets',       name: 'Sets & Suits', count: 4, desc: 'Coordinated looks for effortless style', img: '/images/IMG2.png' },
  { id: 'casualwear', name: 'Casualwear',  count: 10, desc: 'Everyday essentials, refined.',  img: '/images/IMG3.png' },
  { id: 'accessories',name: 'Accessories', count: 7,  desc: 'Hats, scarves, and finishing pieces', img: '/images/IMG6.png' },
];

export default function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-semibold italic mb-2" style={{color: 'var(--brand-red)'}}>✦ Collections</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">Browse by Category</h1>
        <p className="mt-3 text-base text-gray-400">Every wardrobe need, thoughtfully organised.</p>
        <div className="w-12 h-0.5 mt-4 bg-black dark:bg-white" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.id}`}
            className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-[#0f0f0f] border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image src={c.img} alt={c.name} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-lg font-bold text-white">{c.name}</h3>
                <p className="text-xs text-white/70 mt-0.5">{c.count} products</p>
              </div>
            </div>
            <div className="p-5 flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">{c.desc}</p>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
