export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-12 dark:border-gray-800 dark:bg-black mt-auto" style={{background: '#f3faff'}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SmartShop. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
