'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { signInWithGoogle } = useAuth();
  const { isDarkMode } = useTheme();

  const handleSignIn = async () => {
    await signInWithGoogle();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-xl p-8 shadow-xl ${
                isDarkMode 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-gray-800'
              }`}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Sign in to CourseMate
              </h2>
              <button
                onClick={handleSignIn}
                className={`w-full flex items-center justify-center gap-3 rounded-lg px-6 py-3 transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
                Sign in with Google
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 