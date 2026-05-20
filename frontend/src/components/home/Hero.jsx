import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ShoppingCart, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import sacImg from '../../assets/image/sac.png';
import chapeauImg from '../../assets/image/chapeau.jpg';
import sandaleImg from '../../assets/image/sandale.png';

const HERO_SLIDES = [
  {
    title: "L'art du Raphia Malgache",
    subtitle: "Collection Héritage",
    description: "Des pièces d'exception tissées à la main, alliant tradition et modernité pour un style intemporel.",
    icon: <ShoppingBag size={320} strokeWidth={0.5} className="text-earth-500/20 absolute -left-20 top-1/2 -translate-y-1/2 rotate-12" />,
    image: sacImg,
    color: "from-natural-900 via-natural-900/95 to-natural-800"
  },
  {
    title: "Élégance Solaire",
    subtitle: "Nouvelle Saison",
    description: "Protégez-vous avec panache grâce à nos chapeaux artisanaux aux finitions délicates.",
    icon: <ShoppingBag size={320} strokeWidth={0.5} className="text-earth-600/20 absolute -left-20 top-1/2 -translate-y-1/2 -rotate-12" />,
    image: chapeauImg,
    color: "from-earth-900 via-earth-900/95 to-natural-900"
  },
  {
    title: "Confort Naturel",
    subtitle: "Pas à Pas",
    description: "Des sandales légères et authentiques pour une marche sereine au cœur de la nature.",
    icon: <ShoppingCart size={320} strokeWidth={0.5} className="text-brand-olive/20 absolute -left-20 top-1/2 -translate-y-1/2 rotate-6" />,
    image: sandaleImg,
    color: "from-brand-olive via-brand-olive/95 to-natural-900"
  }
];

export default function Hero({ currentSlide, setCurrentSlide, setCurrentStep }) {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-natural-900 transition-theme">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-1000",
            HERO_SLIDES[currentSlide].color
          )}
        >
          {/* Background Image with Parallax effect */}
          <motion.div 
            initial={{ scale: 1.1, x: 20 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 lg:left-auto lg:right-0 lg:w-1/2 h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-natural-900 via-natural-900/80 to-transparent lg:bg-gradient-to-r lg:from-natural-900 lg:via-transparent lg:to-transparent z-10" />
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt="" 
              className="w-full h-full object-cover opacity-25 lg:opacity-60"
            />
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            {/* Big Icon Background */}
            <motion.div
              initial={{ x: -100, opacity: 0, rotate: -20 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute left-0 top-0 h-full flex items-center pointer-events-none overflow-hidden"
            >
              {HERO_SLIDES[currentSlide].icon}
            </motion.div>

            <div className="relative z-20 max-w-2xl text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-xs font-bold tracking-[0.5em] uppercase text-earth-500 block mb-6 px-4 border-l-2 border-earth-500">
                  {HERO_SLIDES[currentSlide].subtitle}
                </span>
                <h2 className="text-6xl md:text-8xl font-serif font-light leading-tight mb-8">
                  {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className="block overflow-hidden">
                      <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                        className="block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h2>
                <p className="text-xl md:text-2xl opacity-70 font-light max-w-lg leading-relaxed mb-12">
                  {HERO_SLIDES[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-6">
                  <button
                    onClick={() => {
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group px-10 py-5 bg-earth-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-natural-900 transition-all flex items-center gap-3 shadow-2xl"
                  >
                    Boutique 
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button
                    onClick={() => setCurrentStep('history')}
                    className="px-10 py-5 bg-white/5 backdrop-blur-xl text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all shadow-xl"
                  >
                    Notre Histoire
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative py-4"
          >
            <div className={cn(
              "h-1 transition-all duration-500 rounded-full bg-white/20",
              currentSlide === index ? "w-16 bg-earth-500" : "w-8 group-hover:w-12 group-hover:bg-white/40"
            )} />
            <span className={cn(
              "absolute -top-6 left-0 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
              currentSlide === index ? "opacity-100 translate-y-0 text-earth-500" : "opacity-0 translate-y-2 text-white"
            )}>
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 border-2 border-white/10 rounded-full rotate-45" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 border-2 border-white/10 rounded-full -rotate-12" />
      </div>
    </section>
  );
}

export { HERO_SLIDES };
