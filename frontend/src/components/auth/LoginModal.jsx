import { motion, AnimatePresence } from 'motion/react';
import { LogIn, X, User as UserIcon } from 'lucide-react';

export default function LoginModal({ 
  showLoginModal, 
  setShowLoginModal, 
  loginWithEmail, 
  setLoginWithEmail, 
  handleGoogleSignIn, 
  isLoggingIn, 
  loginData, 
  setLoginData, 
  handleEmailLogin, 
  setShowRegisterModal 
}) {
  return (
    <AnimatePresence>
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginModal(false)}
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
              {!loginWithEmail ? (
                // Écran initial
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-earth-100 dark:bg-earth-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LogIn size={32} className="text-earth-600 dark:text-earth-400" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold dark:text-dark-text mb-2">Bienvenue</h2>
                    <p className="text-sm text-natural-600 dark:text-dark-text-secondary">
                      Connectez-vous ou créez un compte pour accéder à votre panier et finaliser vos achats
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
                        {isLoggingIn ? 'Connexion en cours...' : 'Continuer avec Google'}
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
                      <button
                        onClick={() => {
                          setShowLoginModal(false);
                          setShowRegisterModal(true);
                        }}
                        className="w-full py-3 px-6 bg-earth-500 dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-700 text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <UserIcon size={16} />
                        Créer un compte
                      </button>

                      <button
                        onClick={() => setLoginWithEmail(true)}
                        className="w-full py-3 px-6 bg-natural-100 dark:bg-dark-tertiary hover:bg-natural-200 dark:hover:bg-dark-secondary text-natural-900 dark:text-dark-text text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 border border-natural-200 dark:border-dark-border"
                      >
                        <LogIn size={16} />
                        Se connecter
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-natural-600 dark:text-dark-text-secondary mb-4">
                        En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
                      </p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setShowLoginModal(false);
                            setShowRegisterModal(true);
                          }}
                          className="text-sm text-earth-600 dark:text-earth-400 hover:text-earth-700 dark:hover:text-earth-300 font-medium transition-colors"
                        >
                          Pas de compte ? S'inscrire
                        </button>
                        <button
                          onClick={() => setShowLoginModal(false)}
                          className="text-sm text-natural-600 dark:text-dark-text-secondary hover:text-natural-800 dark:hover:text-dark-text font-medium transition-colors"
                        >
                          Continuer sans compte
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Écran de connexion avec email
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-earth-100 dark:bg-earth-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LogIn size={32} className="text-earth-600 dark:text-earth-400" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold dark:text-dark-text mb-2">Se connecter</h2>
                    <p className="text-sm text-natural-600 dark:text-dark-text-secondary">
                      Entrez vos identifiants pour accéder à votre compte
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={isLoggingIn}
                      className="w-full py-3 px-6 bg-white dark:bg-dark-tertiary border border-natural-200 dark:border-dark-border hover:border-earth-500 dark:hover:border-earth-400 rounded-lg transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                    >
                      {isLoggingIn ? (
                        <div className="w-5 h-5 border-2 border-earth-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                      )}
                      <span className="text-sm font-medium dark:text-dark-text">
                        {isLoggingIn ? 'Connexion en cours...' : 'Continuer avec Google'}
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
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="w-full p-4 bg-natural-50 dark:bg-dark-tertiary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Mot de passe"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full p-4 bg-natural-50 dark:bg-dark-tertiary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary rounded-lg"
                      />

                      <button
                        onClick={handleEmailLogin}
                        disabled={isLoggingIn}
                        className="w-full py-3 px-6 bg-earth-500 dark:bg-earth-600 hover:bg-earth-600 dark:hover:bg-earth-700 text-white text-sm font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isLoggingIn ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <LogIn size={16} />
                        )}
                        {isLoggingIn ? 'Connexion...' : 'Se connecter'}
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => setLoginWithEmail(false)}
                        className="text-sm text-earth-600 dark:text-earth-400 hover:text-earth-700 dark:hover:text-earth-300 font-medium transition-colors"
                      >
                        ← Retour
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginWithEmail(false);
                }}
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