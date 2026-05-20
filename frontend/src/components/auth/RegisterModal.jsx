import { motion, AnimatePresence } from 'motion/react';
import { User as UserIcon, X } from 'lucide-react';

export default function RegisterModal({ 
  showRegisterModal, 
  setShowRegisterModal, 
  handleGoogleSignIn, 
  isLoggingIn, 
  registerData, 
  setRegisterData, 
  handleRegister, 
  setShowLoginModal 
}) {
  return (
    <AnimatePresence>
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRegisterModal(false)}
            className="absolute inset-0 bg-natural-900/60 dark:bg-dark-primary/80 backdrop-blur-sm transition-theme"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-secondary rounded-2xl shadow-2xl border border-natural-200 dark:border-dark-border transition-theme"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-earth-100 dark:bg-earth-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon size={32} className="text-earth-600 dark:text-earth-400" />
                </div>
                <h2 className="text-2xl font-serif font-bold dark:text-dark-text mb-2">Créer un compte</h2>
                <p className="text-sm text-natural-600 dark:text-dark-text-secondary">
                  Rejoignez Malagasy Artisanat pour bénéficier d'une expérience personnalisée
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoggingIn}
                  className="w-full py-4 px-6 bg-white dark:bg-dark-tertiary border-2 border-natural-200 dark:border-dark-border hover:border-earth-500 dark:hover:border-earth-400 rounded-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-earth-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                  )}
                  <span className="text-sm font-medium dark:text-dark-text">
                    {isLoggingIn ? 'Connexion en cours...' : 'S\'inscrire avec Google'}
                  </span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-natural-200 dark:border-dark-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-white dark:bg-dark-secondary text-natural-500 dark:text-dark-text-secondary">ou</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="w-full p-4 bg-natural-50 dark:bg-dark-tertiary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    className="w-full p-4 bg-natural-50 dark:bg-dark-tertiary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    className="w-full p-4 bg-natural-50 dark:bg-dark-tertiary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary rounded-lg"
                  />

                  <button
                    onClick={handleRegister}
                    disabled={isLoggingIn}
                    className="w-full py-3 px-6 bg-earth-500 dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-700 text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <UserIcon size={16} />
                    )}
                    {isLoggingIn ? 'Traitement...' : 'Créer mon compte'}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-natural-600 dark:text-dark-text-secondary mb-4">
                    En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
                  </p>
                  <button
                    onClick={() => {
                      setShowRegisterModal(false);
                      setShowLoginModal(true);
                    }}
                    className="text-sm text-earth-600 dark:text-earth-400 hover:text-earth-700 dark:hover:text-earth-300 font-medium transition-colors"
                  >
                    Déjà un compte ? Se connecter
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-natural-100 dark:hover:bg-dark-tertiary rounded-full transition-colors dark:text-dark-text"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
