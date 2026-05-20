import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function ProductList({
  activeCategory,
  setActiveCategory,
  filteredProducts,
  addToCart,
  buyNow
}) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 py-24 bg-natural-50 dark:bg-dark-primary transition-theme">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xs uppercase tracking-[0.4em] text-earth-500 font-bold mb-4 px-4 border-l-2 border-earth-500">Catalogue d'exception</h3>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-natural-900 dark:text-dark-text transition-theme italic">
            Nos <span className="font-bold not-italic">Créations</span>
          </h2>
        </motion.div>
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
          {['Tous', 'Chapeaux', 'Sacs', 'Sandales'].map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full border transition-all duration-500 shadow-sm",
                activeCategory === cat
                  ? "bg-natural-900 dark:bg-earth-600 text-white border-natural-900 dark:border-earth-600 scale-105 shadow-xl"
                  : "bg-white dark:bg-dark-tertiary border-natural-200/50 dark:border-dark-border/50 hover:bg-natural-100 dark:hover:bg-dark-secondary text-natural-900 dark:text-dark-text"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-natural-100 dark:bg-dark-secondary rounded-[40px] shadow-2xl transition-all duration-700 group-hover:-translate-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-natural-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-8 left-8 flex flex-col gap-2">
                <div className="bg-white/90 dark:bg-dark-secondary/90 backdrop-blur-xl px-5 py-2 rounded-full text-[9px] uppercase font-bold tracking-[0.2em] text-earth-500 shadow-xl border border-white/20">
                  Pièce Unique
                </div>
              </div>

              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <button className="p-4 bg-white/90 dark:bg-dark-secondary/90 backdrop-blur-xl text-natural-400 hover:text-red-500 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20 group/heart">
                  <Heart size={20} className="transition-all group-hover/heart:fill-current" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 flex flex-col gap-4 translate-y-0 opacity-100 lg:translate-y-20 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 lg:delay-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 py-3 lg:py-4 bg-white text-natural-900 text-[9px] font-bold uppercase tracking-widest rounded-2xl hover:bg-natural-50 transition-colors shadow-xl"
                  >
                    Panier
                  </button>
                  <button
                    onClick={() => buyNow(product)}
                    className="flex-[2] py-3 lg:py-4 bg-earth-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-2xl hover:bg-earth-600 transition-colors shadow-xl"
                  >
                    Acheter maintenant
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3 px-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-2xl text-natural-900 dark:text-dark-text group-hover:text-earth-500 transition-colors duration-300">{product.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[9px] text-earth-500 font-bold uppercase tracking-[0.2em]">{product.category}</span>
                    <span className="w-1 h-1 rounded-full bg-natural-300 dark:bg-dark-border" />
                    <span className="text-[9px] text-natural-400 font-medium uppercase tracking-widest">Fait Main</span>
                  </div>
                </div>
                <div className="text-xl font-medium text-natural-900 dark:text-dark-text bg-natural-100 dark:bg-dark-tertiary px-4 py-2 rounded-2xl border border-natural-200/50 dark:border-dark-border/50">
                  {product.price.toLocaleString()} Ar
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
