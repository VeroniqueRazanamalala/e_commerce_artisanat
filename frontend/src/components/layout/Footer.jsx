import { Smartphone, CreditCard, Wallet } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-natural-900 dark:bg-dark-secondary text-white pt-32 pb-12 transition-theme overflow-hidden relative">
      {/* Abstract background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-earth-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-earth-500 rounded-2xl flex items-center justify-center font-serif text-2xl font-bold">M</div>
              <h2 className="text-3xl font-serif font-bold">Malagasy Artisanat</h2>
            </div>
            <p className="max-w-md text-lg opacity-50 font-light leading-relaxed mb-10">
              Nous célébrons l'art du tissage malgache en créant des pièces uniques à partir de raphia naturel, pour une élégance durable et authentique.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Facebook', 'Pinterest'].map(social => (
                <button key={social} className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity border-b border-white/20 pb-1">
                  {social}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-earth-500">Navigation</h4>
            <ul className="space-y-4 opacity-50 text-sm font-light">
              {['Boutique', 'Collections', 'Notre Histoire', 'Blog', 'Contact'].map(link => (
                <li key={link}><button className="hover:text-earth-500 transition-colors">{link}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-earth-500">Contact & Aide</h4>
            <ul className="space-y-6 opacity-50 text-sm font-light">
              <li className="flex gap-4">
                <div className="w-5 h-5 flex-shrink-0 opacity-40"><Smartphone size={18} /></div>
                <span>Antananarivo, Madagascar<br />Lot IVG 42 Ambodivona</span>
              </li>
              <li className="flex gap-4">
                <div className="w-5 h-5 flex-shrink-0 opacity-40"><CreditCard size={18} /></div>
                <span>contact@malagasyartisanat.mg<br />+261 34 00 000 00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] opacity-30 uppercase tracking-[0.3em]">
            © 2024 Malagasy Artisanat - Créations en Raphia Malagasy.
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 transition-all">
              <CreditCard size={20} />
              <Smartphone size={20} />
              <Wallet size={20} />
            </div>
            <div className="text-[9px] opacity-30 uppercase tracking-[0.3em]">
              Design by Antigravity
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
