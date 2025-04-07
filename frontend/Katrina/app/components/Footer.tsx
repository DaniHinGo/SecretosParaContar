import { useState } from 'react';
import { useNavigate } from '@remix-run/react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubmitting(true);
        
        // Simulamos el envío del formulario
        setTimeout(() => {
            setShowSuccess(true);
            setEmail('');
            setIsSubmitting(false);
            
            // Ocultamos el mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    const handleContactClick = () => {
        // Navegamos a la página principal y abrimos el modal de contacto
        navigate('/?modal=contact');
    };

    return (
        <footer className="bg-[#F43F20] text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna 1: Logo y descripción */}
                    <div className="space-y-4">
                        <div className="border border-white inline-block px-4 py-2">
                            <img src="/images/logocua.png" alt="Logo" className="w-48" />
                        </div>
                        <p className="max-w-md">
                            Fundación dedicada a promover la educación y la lectura en comunidades rurales de Colombia, facilitando el
                            acceso a materiales educativos de calidad.
                        </p>
                        <div className="flex space-x-7">
                            <a href="https://www.instagram.com/secretosparacontar/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                            <a href="https://www.facebook.com/secretosparacontar" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <i className="fab fa-facebook text-2xl"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/fundacionsecretosparacontar/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <i className="fab fa-linkedin text-2xl"></i>
                            </a>
                            <a href="https://www.youtube.com/user/fundasecretos" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <i className="fab fa-youtube text-2xl"></i>
                            </a>
                            <a href="https://x.com/Secretoscontar" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <i className="fab fa-x-twitter text-2xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Columna 2: Enlaces importantes */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-semibold">Enlaces Importantes</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/terminos-condiciones" className="hover:underline">Términos y condiciones</a>
                            </li>
                            <li>
                            <button
                            className="hover:underline"
                            onClick={handleContactClick}
                            >
                            Contáctanos
                            </button>
                            </li>
                            <li>
                                <a href="/nosotros" className="hover:underline">Sobre nosotros</a>
                            </li>
                            <li>
                                <a href="/donaciones" className="hover:underline">Donaciones</a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Suscripción */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Suscríbete a nuestro boletín</h3>
                        <p className="text-sm">Mantente enterado de nuestras novedades en el campo del lector</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Tu correo" 
                                    className="p-2 w-full text-black rounded-l-md focus:outline-none" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="bg-white text-[#F43F20] px-4 py-2 rounded-r-md font-medium hover:bg-gray-100 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        <i className="fas fa-paper-plane"></i>
                                    )}
                                </button>
                            </div>
                            
                            {showSuccess && (
                                <div className="mt-2 text-sm bg-green-500 text-white p-2 rounded-md flex items-center">
                                    <i className="fas fa-check-circle mr-2"></i>
                                    ¡Gracias por suscribirte a nuestro boletín!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/20 py-4">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>© {currentYear} Fundación Secretos para Contar. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
  };
  
  export default Footer;

