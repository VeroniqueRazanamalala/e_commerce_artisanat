import { useState } from 'react';
import { ArrowRight, Smartphone, CreditCard, Wallet, LogIn } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { cn } from '../../utils/cn';

function handleFirestoreError(error, operationType, path, auth) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function CheckoutSection({ user, cart, total, onBack, onComplete, setShowLoginModal, auth }) {
  const [method, setMethod] = useState('MVOLA');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: ''
  });

  const handlePayment = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsProcessing(true);

    if (method === 'CARD') {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart,
            email: user.email
          })
        });

        const data = await response.json();
        
        if (data.url) {
          // Redirection directe vers la page de paiement Stripe
          window.location.href = data.url;
        } else {
          console.error("Erreur : Pas d'URL de session reçue", data);
          alert("Erreur lors de l'initialisation du paiement");
        }
      } catch (err) {
        console.error('Payment Error:', err);
        alert("Erreur réseau lors de l'initialisation du paiement");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // Autres méthodes (Mvola, etc.)
    const path = 'orders';
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
        total: total,
        status: 'pending',
        createdAt: serverTimestamp(),
        shippingAddress: shippingInfo,
        paymentMethod: method
      });

      setIsProcessing(false);
      onComplete();
      alert('Commande validée ! Un email de confirmation vous sera envoyé.');
    } catch (error) {
      setIsProcessing(false);
      handleFirestoreError(error, 'CREATE', path, auth);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 bg-natural-50 dark:bg-dark-primary transition-theme">
      <button onClick={onBack} className="mb-12 flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-earth-600 dark:hover:text-earth-400 transition-colors dark:text-dark-text">
        <ArrowRight size={16} className="rotate-180" /> Retour à la boutique
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl font-serif font-medium mb-12 dark:text-dark-text">Finaliser la commande</h2>

          <div className="space-y-12">
            {/* Step 1: Shipping */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full border border-natural-900 dark:border-dark-text flex items-center justify-center text-xs font-bold dark:text-dark-text">01</span>
                <h3 className="text-lg font-serif dark:text-dark-text">Livraison</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Prénom"
                  value={shippingInfo.firstName}
                  onChange={e => setShippingInfo(s => ({ ...s, firstName: e.target.value }))}
                  className="w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary"
                />
                <input
                  placeholder="Nom"
                  value={shippingInfo.lastName}
                  onChange={e => setShippingInfo(s => ({ ...s, lastName: e.target.value }))}
                  className="w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary"
                />
                <input
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={e => setShippingInfo(s => ({ ...s, email: e.target.value }))}
                  className="col-span-2 w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary"
                />
                <input
                  placeholder="Adresse à Antananarivo"
                  value={shippingInfo.address}
                  onChange={e => setShippingInfo(s => ({ ...s, address: e.target.value }))}
                  className="col-span-2 w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary"
                />
              </div>
            </div>

            {/* Step 2: Payment */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full border border-natural-900 dark:border-dark-text flex items-center justify-center text-xs font-bold dark:text-dark-text">02</span>
                <h3 className="text-lg font-serif dark:text-dark-text">Paiement</h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <PaymentCard
                  active={method === 'MVOLA'}
                  onClick={() => setMethod('MVOLA')}
                  icon={<Smartphone size={20} className="text-yellow-600" />}
                  label="Mvola"
                  desc="Mobile Money Telma"
                />
                <PaymentCard
                  active={method === 'ORANGE_MONEY'}
                  onClick={() => setMethod('ORANGE_MONEY')}
                  icon={<Smartphone size={20} className="text-orange-600" />}
                  label="Orange Money"
                  desc="Paiement par smartphone"
                />
                <PaymentCard
                  active={method === 'CARD'}
                  onClick={() => setMethod('CARD')}
                  icon={<CreditCard size={20} />}
                  label="Carte Bancaire"
                  desc="Visa, Mastercard"
                />
                <PaymentCard
                  active={method === 'PAYPAL'}
                  onClick={() => setMethod('PAYPAL')}
                  icon={<Wallet size={20} />}
                  label="PayPal"
                  desc="Compte PayPal ou Carte"
                />
              </div>

              {method === 'MVOLA' || method === 'ORANGE_MONEY' ? (
                <div className="mt-6 p-6 bg-natural-100 dark:bg-dark-tertiary rounded-lg space-y-4 transition-theme">
                  <p className="text-xs text-natural-800 dark:text-dark-text-secondary opacity-60">Entrez votre numéro pour recevoir la demande de confirmation :</p>
                  <input placeholder="+261 34 ..." className="w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary" />
                </div>
              ) : method === 'CARD' ? (
                <div className="mt-6 space-y-4">
                  <input placeholder="Numéro de carte" className="w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM/AA" className="w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary" />
                    <input placeholder="CVC" className="w-full p-4 bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border outline-none focus:border-earth-500 dark:focus:border-earth-400 transition-colors dark:text-dark-text dark:placeholder-dark-text-secondary" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-white dark:bg-dark-secondary border border-natural-200 dark:border-dark-border p-8 transition-theme">
            <h3 className="text-sm uppercase tracking-widest font-bold mb-8 text-earth-500 dark:text-earth-400">Votre Commande</h3>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 text-sm items-center">
                  <div className="w-16 h-16 bg-natural-100 dark:bg-dark-tertiary rounded-lg overflow-hidden flex-shrink-0 transition-theme">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="opacity-60 dark:text-dark-text">{item.name} (x{item.quantity})</span>
                    <span className="font-medium dark:text-dark-text">{(item.price * item.quantity).toLocaleString()} Ar</span>
                  </div>
                </div>
              ))}

            </div>
            <div className="border-t border-natural-100 dark:border-dark-border pt-8 space-y-4 transition-theme">
              <div className="flex justify-between text-sm opacity-60 dark:text-dark-text-secondary">
                <span>Sous-total</span>
                <span>{total.toLocaleString()} Ar</span>
              </div>
              <div className="flex justify-between text-sm opacity-60 dark:text-dark-text-secondary">
                <span>Livraison (Antananarivo)</span>
                <span>Gratuit</span>
              </div>
              <div className="flex justify-between text-xl font-serif font-bold pt-4 dark:text-dark-text">
                <span>Total</span>
                <span>{total.toLocaleString()} Ar</span>
              </div>
            </div>
            {!user && (
              <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-xl transition-theme">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <LogIn size={20} className="text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-800 dark:text-red-300 uppercase tracking-widest">Connexion Requise</h4>
                    <p className="text-xs text-red-600 dark:text-red-400 opacity-80">Pour finaliser votre commande</p>
                  </div>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300 mb-4 leading-relaxed">
                  Veuillez vous connecter pour sécuriser votre paiement et recevoir vos confirmations de commande.
                </p>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  Se Connecter Maintenant
                </button>
              </div>
            )}
            <button
              onClick={handlePayment}
              disabled={isProcessing || cart.length === 0}
              className="w-full mt-12 py-5 bg-brand-olive dark:bg-earth-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-earth-900 dark:hover:bg-earth-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 rounded-full"
            >
              {isProcessing ? 'Traitement en cours...' : user ? 'Confirmer le paiement' : 'Connexion pour payer'}
              {!isProcessing && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentCard({ active, onClick, icon, label, desc }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 border text-left flex items-center gap-6 transition-all dark:text-dark-text",
        active 
          ? "border-natural-900 dark:border-dark-tertiary bg-natural-50 dark:bg-dark-tertiary" 
          : "border-natural-200 dark:border-dark-border hover:bg-natural-50 dark:hover:bg-dark-tertiary"
      )}
    >
      <div className={cn("p-3 rounded-full bg-white dark:bg-dark-secondary shadow-sm transition-theme", active && "scale-110")}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-sm uppercase tracking-wider">{label}</div>
        <div className="text-xs opacity-50 dark:text-dark-text-secondary">{desc}</div>
      </div>
      {active && <div className="ml-auto w-4 h-4 rounded-full bg-natural-900 dark:bg-dark-text flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-dark-secondary" />
      </div>}
    </button>
  );
}
