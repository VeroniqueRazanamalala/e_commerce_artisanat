import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import chapeauImg from '../../assets/image/chapeau.jpg';
import sacImg from '../../assets/image/sac.png';
import sandaleImg from '../../assets/image/sandale.png';

export default function CollectionsSection({ onShop }) {
  const collections = [
    {
      title: "Été Solaire",
      desc: "Légèreté et protection pour vos journées ensoleillées.",
      image: chapeauImg,
      button: "Découvrir",
      count: "12 Pièces"
    },
    {
      title: "Artisanat Signature",
      desc: "Les pièces les plus complexes, reflets du savoir-faire ancestral.",
      image: sacImg,
      button: "Explorer",
      count: "8 Pièces"
    },
    {
      title: "Marche Naturelle",
      desc: "Confort et authenticité à chaque pas.",
      image: sandaleImg,
      button: "Parcourir",
      count: "15 Pièces"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-32 bg-natural-50 dark:bg-dark-primary transition-theme">
      <div className="flex flex-col items-center text-center mb-24">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[0.5em] text-earth-500 font-bold mb-6"
        >
          Nos Capsules
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-serif font-light dark:text-dark-text italic"
        >
          Les <span className="font-bold not-italic">Collections</span>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-24 h-px bg-earth-500 mt-12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {collections.map((col, idx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={onShop}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[48px] mb-8 shadow-2xl transition-all duration-700 group-hover:scale-[0.98]">
              <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-natural-900 via-natural-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute top-8 left-8">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-white">
                  {col.count}
                </span>
              </div>

              <div className="absolute bottom-10 left-10 right-10 text-white">
                <h4 className="text-3xl font-serif font-medium mb-3">{col.title}</h4>
                <p className="text-sm opacity-70 font-light mb-8 line-clamp-2 leading-relaxed">{col.desc}</p>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest group/btn">
                  <span className="relative py-1">
                    {col.button}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-white/40 group-hover/btn:bg-white transition-colors" />
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-natural-900 transition-all duration-500">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
