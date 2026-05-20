import { useState } from 'react';
import { ShoppingBag, Sun, Moon, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../../utils/cn';

export default function Navbar({
  setCurrentStep,
  setActiveCategory,
  currentStep,
  isDark,
  toggleDarkMode,
  user,
  cartCount,
  setIsCartOpen,
  setShowLoginModal
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Boutique', 'Collections', 'Notre Histoire', 'Contact'];

  const handleNavigation = (item) => {
    if (item === 'Boutique') { setActiveCategory('Tous'); setCurrentStep('shop'); }
    if (item === 'Collections') { setCurrentStep('collections'); }
    if (item === 'Notre Histoire') { setCurrentStep('history'); }
    if (item === 'Contact') {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-natural-50/90 dark:bg-dark-secondary/90 backdrop-blur-xl border-b border-natural-200/50 dark:border-dark-border/50 transition-theme">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => handleNavigation('Boutique')}
          >
            <div className="relative w-12 h-12 bg-natural-900 dark:bg-earth-600 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-earth-600 to-earth-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white font-serif text-2xl font-bold">M</span>
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-natural-900 dark:text-dark-text transition-theme">
              Malagasy <span className="font-light italic text-earth-500">Artisanat</span>
            </h1>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-natural-800 dark:text-dark-text-secondary transition-theme">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={cn(
                  "hover:text-earth-500 dark:hover:text-earth-400 transition-all relative py-2 group/link",
                  (item === 'Boutique' && currentStep === 'shop') ||
                    (item === 'Collections' && currentStep === 'collections') ||
                    (item === 'Notre Histoire' && currentStep === 'history')
                    ? "text-earth-500 dark:text-earth-400" : ""
                )}
              >
                {item}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-earth-500 transition-all duration-300",
                  (item === 'Boutique' && currentStep === 'shop') ||
                    (item === 'Collections' && currentStep === 'collections') ||
                    (item === 'Notre Histoire' && currentStep === 'history')
                    ? "w-full" : "w-0 group-hover/link:w-full"
                )} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 p-1 bg-natural-100 dark:bg-dark-tertiary rounded-full border border-natural-200/50 dark:border-dark-border/50">
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-2 rounded-full transition-all duration-500",
                !isDark ? "bg-white text-earth-500 shadow-sm" : "text-dark-text-secondary"
              )}
            >
              <Sun size={16} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-2 rounded-full transition-all duration-500",
                isDark ? "bg-dark-secondary text-yellow-400 shadow-sm" : "text-natural-800"
              )}
            >
              <Moon size={16} />
            </button>
          </div>

          {user ? (
            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-3 pl-1 pr-2 sm:pr-4 py-1 bg-white dark:bg-dark-tertiary border border-natural-200/50 dark:border-dark-border/50 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group shadow-sm"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-natural-200 dark:border-dark-border transition-theme">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-natural-100 dark:bg-dark-tertiary flex items-center justify-center">
                    <UserIcon size={16} className="text-natural-900 dark:text-dark-text" />
                  </div>
                )}
              </div>
              <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest dark:text-dark-text">{user.displayName?.split(' ')[0]}</span>
              <LogOut size={14} className="text-red-500 sm:opacity-0 sm:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-natural-900 dark:bg-dark-tertiary text-white dark:text-dark-text text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-earth-600 dark:hover:bg-earth-600 transition-all shadow-lg"
            >
              Connexion
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-3 bg-white dark:bg-dark-tertiary border border-natural-200/50 dark:border-dark-border/50 rounded-full hover:scale-110 transition-all shadow-sm group"
          >
            <ShoppingBag size={20} className="dark:text-dark-text group-hover:text-earth-500 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-earth-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-3 bg-white dark:bg-dark-tertiary border border-natural-200/50 dark:border-dark-border/50 rounded-full hover:scale-110 transition-all shadow-sm group text-natural-900 dark:text-dark-text"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-natural-50 dark:bg-dark-secondary border-b border-natural-200/50 dark:border-dark-border/50 shadow-xl py-6 flex flex-col items-center gap-6 z-40 transition-theme">
          <div className="flex flex-col items-center gap-6 text-[12px] font-bold uppercase tracking-[0.3em] text-natural-800 dark:text-dark-text-secondary">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={cn(
                  "hover:text-earth-500 dark:hover:text-earth-400 transition-colors",
                  (item === 'Boutique' && currentStep === 'shop') ||
                    (item === 'Collections' && currentStep === 'collections') ||
                    (item === 'Notre Histoire' && currentStep === 'history')
                    ? "text-earth-500 dark:text-earth-400" : ""
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2 p-1 bg-white dark:bg-dark-tertiary rounded-full border border-natural-200/50 dark:border-dark-border/50 mt-4">
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-2 rounded-full transition-all duration-500",
                !isDark ? "bg-natural-100 text-earth-500 shadow-sm" : "text-dark-text-secondary"
              )}
            >
              <Sun size={16} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={cn(
                "p-2 rounded-full transition-all duration-500",
                isDark ? "bg-dark-secondary text-yellow-400 shadow-sm" : "text-natural-800"
              )}
            >
              <Moon size={16} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
