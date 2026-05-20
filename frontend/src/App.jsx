import { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from './constants.js';
import { auth, signInWithGoogle } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero, { HERO_SLIDES } from './components/home/Hero';
import ProductList from './components/home/ProductList';
import CollectionsSection from './components/home/CollectionsSection';
import HistorySection from './components/home/HistorySection';
import CartDrawer from './components/cart/CartDrawer';
import LoginModal from './components/auth/LoginModal';
import RegisterModal from './components/auth/RegisterModal';
import CheckoutSection from './components/checkout/CheckoutSection';

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentStep, setCurrentStep] = useState('shop');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = async () => {
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      alert("Tous les champs sont requis");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoggingIn(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();
      if (response.ok) {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setShowRegisterModal(false);
        setShowLoginModal(true);
      } else {
        alert(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur Inscription:", error);
      alert("Impossible de contacter le serveur backend. Assurez-vous qu'il est lancé.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setIsLoggingIn(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      if (response.ok) {
        setUser({
          uid: data.user.id,
          email: data.user.email,
          displayName: data.user.email.split('@')[0]
        });
        setShowLoginModal(false);
        setLoginWithEmail(false);
      } else {
        alert(data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur Connexion:", error);
      alert("Impossible de contacter le serveur backend.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
      setShowLoginModal(false);
      setShowRegisterModal(false);
    } catch (error) {
      console.error("Erreur de connexion Google:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert("La fenêtre de connexion a été fermée. Veuillez réessayer.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Ignorer
      } else {
        alert("Erreur de connexion : " + error.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const buyNow = (product) => {
    setCart([{ ...product, quantity: 1 }]);
    setCurrentStep('checkout');
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Tous') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-natural-50 dark:bg-dark-primary transition-theme">
      <Navbar 
        setCurrentStep={setCurrentStep}
        setActiveCategory={setActiveCategory}
        currentStep={currentStep}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        user={user}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        setShowLoginModal={setShowLoginModal}
      />

      <main>
        {currentStep === 'shop' && (
          <>
            <Hero 
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              setCurrentStep={setCurrentStep}
            />
            <ProductList 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              filteredProducts={filteredProducts}
              addToCart={addToCart}
              buyNow={buyNow}
            />
          </>
        )}

        {currentStep === 'collections' && (
          <CollectionsSection onShop={() => setCurrentStep('shop')} />
        )}
        
        {currentStep === 'history' && (
          <HistorySection />
        )}

        {currentStep === 'checkout' && (
          <CheckoutSection
            user={user}
            cart={cart}
            total={cartTotal}
            onBack={() => setCurrentStep('shop')}
            onComplete={() => { setCart([]); setCurrentStep('shop'); }}
            setShowLoginModal={setShowLoginModal}
            auth={auth}
          />
        )}
      </main>

      <CartDrawer 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        setCurrentStep={setCurrentStep}
      />

      <Footer />

      <LoginModal 
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        loginWithEmail={loginWithEmail}
        setLoginWithEmail={setLoginWithEmail}
        handleGoogleSignIn={handleGoogleSignIn}
        isLoggingIn={isLoggingIn}
        loginData={loginData}
        setLoginData={setLoginData}
        handleEmailLogin={handleEmailLogin}
        setShowRegisterModal={setShowRegisterModal}
      />

      <RegisterModal 
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
        handleGoogleSignIn={handleGoogleSignIn}
        isLoggingIn={isLoggingIn}
        registerData={registerData}
        setRegisterData={setRegisterData}
        handleRegister={handleRegister}
        setShowLoginModal={setShowLoginModal}
      />
    </div>
  );
}
