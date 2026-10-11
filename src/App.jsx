// ============================================================
// App.jsx — Root SPA orchestrator with screen routing
// Screens: welcome → builder → reviewing → preparing → ready
// ============================================================
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import WelcomeScreen from './components/WelcomeScreen';
import StudioBuilder from './components/StudioBuilder';
import ReviewModal from './components/ReviewModal';
import PreparingScreen from './components/PreparingScreen';
import OrderReadyScreen from './components/OrderReadyScreen';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';

// App-level screen IDs
const SCREENS = {
  WELCOME: 'welcome',
  BUILDER: 'builder',
  PREPARING: 'preparing',
  READY: 'ready',
};

// Generate order number
let orderCounter = 0;
const generateOrderNumber = () => {
  orderCounter++;
  return `#ML-${String(orderCounter).padStart(3, '0')}`;
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [customerName, setCustomerName] = useState('');
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const { toasts, addToast, dismissToast } = useToast();

  // Called when user clicks "Pesan Sekarang" in builder
  const handleCheckout = useCallback((data) => {
    setOrderData(data);
    setIsReviewOpen(true);
  }, []);

  // Called when user confirms in review modal
  const handleConfirmOrder = useCallback(() => {
    setIsReviewOpen(false);
    setOrderNumber(generateOrderNumber());
    setScreen(SCREENS.PREPARING);
  }, []);

  // Called when preparing animation finishes
  const handlePreparingDone = useCallback(() => {
    setScreen(SCREENS.READY);
  }, []);

  // Reset everything
  const handleReset = useCallback(() => {
    setOrderData(null);
    setOrderNumber('');
    setCustomerName('');
    setScreen(SCREENS.WELCOME);
  }, []);

  return (
    <div className="min-h-screen h-full overflow-x-hidden font-sans antialiased">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      <AnimatePresence mode="wait">
        {screen === SCREENS.WELCOME && (
          <motion.div key="welcome" variants={pageVariants} initial="initial" animate="enter" exit="exit">
            <WelcomeScreen
              onStart={(name) => {
                setCustomerName(name || 'Sobat Martabak');
                setScreen(SCREENS.BUILDER);
              }}
            />
          </motion.div>
        )}

        {screen === SCREENS.BUILDER && (
          <motion.div key="builder" variants={pageVariants} initial="initial" animate="enter" exit="exit">
            <StudioBuilder
              customerName={customerName}
              onCheckout={handleCheckout}
              addToast={addToast}
            />
            {/* Review modal is layered on top of builder */}
            <ReviewModal
              isOpen={isReviewOpen}
              onClose={() => setIsReviewOpen(false)}
              onConfirm={handleConfirmOrder}
              customerName={customerName}
              selectedSize={orderData?.selectedSize}
              selectedBase={orderData?.selectedBase}
              placedToppings={orderData?.placedToppings ?? []}
              selectedFinishings={orderData?.selectedFinishings ?? []}
            />
          </motion.div>
        )}

        {screen === SCREENS.PREPARING && (
          <motion.div
            key="preparing"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed inset-0 w-screen h-screen overflow-hidden"
          >
            <PreparingScreen onDone={handlePreparingDone} />
          </motion.div>
        )}

        {screen === SCREENS.READY && orderData && (
          <motion.div key="ready" variants={pageVariants} initial="initial" animate="enter" exit="exit">
            <OrderReadyScreen
              orderNumber={orderNumber}
              customerName={customerName}
              selectedSize={orderData.selectedSize}
              selectedBase={orderData.selectedBase}
              placedToppings={orderData.placedToppings}
              selectedFinishings={orderData.selectedFinishings}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
