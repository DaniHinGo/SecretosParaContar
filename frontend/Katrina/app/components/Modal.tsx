import { useEffect, useState } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Contact from './auth/Contact';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register' | 'contact';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'contact'>(initialView);

  useEffect(() => {
    setCurrentView(initialView);
  }, [initialView]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const switchView = (view: 'login' | 'register' | 'contact') => {
    setCurrentView(view);
  };

  const getTitle = () => {
    switch (currentView) {
      case 'login':
        return 'Iniciar Sesión';
      case 'register':
        return 'Registrarse';
      case 'contact':
        return 'Contáctanos';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <Login onClose={onClose} />;
      case 'register':
        return <Register onClose={onClose} />;
      case 'contact':
        return <Contact onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
        role="document"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="modal-title" className="text-xl font-semibold text-[#002847]">
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {renderContent()}

          {currentView !== 'contact' && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {currentView === 'login' ? (
                  <>
                    ¿No tienes una cuenta?{' '}
                    <button
                      onClick={() => switchView('register')}
                      className="text-[#618EB4] hover:text-[#002847] font-medium transition-colors"
                    >
                      Regístrate aquí
                    </button>
                  </>
                ) : (
                  <>
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      onClick={() => switchView('login')}
                      className="text-[#618EB4] hover:text-[#002847] font-medium transition-colors"
                    >
                      Inicia sesión aquí
                    </button>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal; 