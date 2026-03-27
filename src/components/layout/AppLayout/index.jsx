import Navbar from '../Navbar';

/**
 * Layout wrapper for authenticated pages.
 */
export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6">
        {children}
      </main>
    </div>
  );
}
