import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function CartDrawer({ 
  isCartOpen, 
  setIsCartOpen, 
  cart, 
  cartCount, 
  cartTotal, 
  removeFromCart, 
  updateQuantity, 
  setCurrentStep 
}) {
  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-natural-900/40 dark:bg-dark-primary/60 backdrop-blur-sm transition-theme"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-[100dvh] w-full max-w-md bg-white dark:bg-dark-secondary shadow-2xl flex flex-col transition-theme"
          >
            <div className="p-6 border-b border-natural-100 dark:border-dark-border flex items-center justify-between">
              <h3 className="text-xl font-serif font-medium dark:text-dark-text">Votre Panier ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-natural-100 dark:hover:bg-dark-tertiary rounded-full transition-colors dark:text-dark-text">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-natural-800 dark:text-dark-text-secondary opacity-40 gap-4">
                  <ShoppingBag size={48} />
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-natural-50 dark:border-dark-border pb-6 last:border-0">
                    <div className="w-24 h-24 bg-natural-100 dark:bg-dark-tertiary flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-serif font-medium dark:text-dark-text">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-natural-800 dark:text-dark-text-secondary opacity-50 uppercase mt-1">{item.category}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-natural-200 dark:border-dark-border transition-theme">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-2 hover:bg-natural-50 dark:hover:bg-dark-tertiary dark:text-dark-text transition-colors"><Minus size={14} /></button>
                          <span className="px-3 py-1 text-sm border-x border-natural-200 dark:border-dark-border dark:text-dark-text">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-2 hover:bg-natural-50 dark:hover:bg-dark-tertiary dark:text-dark-text transition-colors"><Plus size={14} /></button>
                        </div>
                        <div className="font-medium dark:text-dark-text">{(item.price * item.quantity).toLocaleString()} Ar</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-natural-50 dark:bg-dark-tertiary border-t border-natural-200 dark:border-dark-border transition-theme">
              <div className="flex justify-between items-center mb-6">
                <span className="text-natural-800 dark:text-dark-text-secondary uppercase text-xs tracking-widest font-bold">Total</span>
                <span className="text-2xl font-serif font-bold dark:text-dark-text">{cartTotal.toLocaleString()} Ar</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => { setIsCartOpen(false); setCurrentStep('checkout'); }}
                className="w-full py-4 bg-brand-olive dark:bg-earth-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-earth-900 dark:hover:bg-earth-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full"
              >
                Passer la commande
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
