import { motion } from 'motion/react';
import { Heart, Smartphone, ArrowRight } from 'lucide-react';
import histoireImg from '../../assets/image/histoir.png';

export default function HistorySection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 bg-natural-50 dark:bg-dark-primary transition-theme overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-8 border border-earth-500/20 rounded-[60px] hidden xl:block" />

          <div className="relative aspect-[4/5] rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(74,55,40,0.3)]">
            <img
              src={histoireImg}
              alt="Artisan à Madagascar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-natural-900/40 to-transparent" />
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 right-2 md:-bottom-16 md:-right-16 bg-white dark:bg-dark-secondary p-6 md:p-12 rounded-[24px] md:rounded-[40px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border border-natural-100 dark:border-dark-border transition-theme z-10"
          >
            <div className="relative">
              <div className="text-earth-500 dark:text-earth-400 font-serif text-5xl md:text-8xl font-bold italic leading-none">100%</div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-natural-900 dark:text-dark-text mt-3 md:mt-4 pl-2 border-l-2 border-earth-500">
                Naturel & <br />Artisanal
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-earth-500 font-bold block mb-6">Notre Héritage</span>
            <h2 className="text-6xl md:text-7xl font-serif font-light leading-[1.1] dark:text-dark-text italic">
              L'âme de <span className="font-bold not-italic text-natural-900 dark:text-earth-500">Madagascar</span> dans chaque fibre.
            </h2>
          </div>

          <p className="text-xl text-natural-800 dark:text-dark-text-secondary font-light leading-relaxed opacity-80">
            Née de la passion pour les terres rouges de Madagascar, Malagasy Artisanat célèbre la fibre royale : le Raphia.
            C'est au cœur des Hautes Terres et des côtes sauvages que nos artisans récoltent, sèchent et teignent avec patience
            ces fibres naturelles pour leur donner une seconde vie.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-8 border-t border-natural-200 dark:border-dark-border transition-theme">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-earth-500/10 dark:bg-earth-500/20 rounded-2xl flex items-center justify-center text-earth-500 transition-theme group hover:scale-110 duration-500">
                <Heart size={28} className="group-hover:fill-current" />
              </div>
              <h4 className="font-serif text-2xl dark:text-dark-text">Équité</h4>
              <p className="text-sm text-natural-500 dark:text-dark-text-secondary leading-relaxed">
                Revenu juste et conditions dignes pour nos 50+ artisans.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-brand-olive/10 dark:bg-brand-olive/20 rounded-2xl flex items-center justify-center text-brand-olive dark:text-earth-400 transition-theme group hover:scale-110 duration-500">
                <Smartphone size={28} />
              </div>
              <h4 className="font-serif text-2xl dark:text-dark-text">Éducation</h4>
              <p className="text-sm text-natural-500 dark:text-dark-text-secondary leading-relaxed">
                5% de chaque vente soutient la scolarisation locale.
              </p>
            </div>
          </div>

          <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-earth-500 pt-8">
            En savoir plus <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
