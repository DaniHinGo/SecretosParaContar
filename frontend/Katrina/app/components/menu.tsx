import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from "@remix-run/react";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Nuevo estado para el rol
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Verificar si el usuario está autenticado y su rol al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token); // Si hay token, el usuario está autenticado
    setUserRole(role); // Guardar el rol del usuario
  }, []);

  // Toggle del menú hamburguesa
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle del dropdown del perfil
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    localStorage.removeItem('userRole'); // Eliminar el rol
    setIsLoggedIn(false);
    setUserRole(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleOpenModal = (view: 'login' | 'register' | 'contact') => {
    navigate(`/?modal=${view}`);
    setIsDropdownOpen(false);
  };

  const handleDonate = () => {
    window.open('https://secretosparacontar.org', '_blank');
  };

  return (
    <nav className="w-full">
      {/* Línea superior pequeña */}
      <div className="h-8 w-full bg-[#002847]"></div>

      <div className="bg-[#618EB4] w-full flex flex-wrap items-center justify-between mx-auto p-8">
        {/* Logotipo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logoSpc.png" className="h-12" alt="Secretos para Contar Logo" />
        </Link>

        {/* Menú hamburguesa y ícono de perfil */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Botón de donar */}
          <button
            onClick={handleDonate}
            className="text-white bg-[#002847] hover:bg-[#002847]/90 focus:ring-4 focus:ring-[#002847] font-medium rounded-lg text-sm px-4 py-2 mr-4"
          >
            Donar
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-100 rounded-full md:me-0 focus:ring-4 focus:ring-[#002847]"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Abrir menú de usuario</span>
              <img src="/images/perfil.png" className="h-10 w-10 rounded-full" alt="Perfil" />
            </button>
            {/* Dropdown menu */}
            <div
              className={`z-50 absolute right-0 mt-2 ${isDropdownOpen ? 'block' : 'hidden'} text-base list-none bg-white divide-y divide-[#618EB4] rounded-lg shadow-sm`}
              id="user-dropdown"
            >
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-3">
                    <span className="block text-sm text-darkBlue font-BeVietnamPro">Bonnie Green</span>
                    <span className="block text-sm text-grayMedium truncate">secretosParaContar.com</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-darkBlue hover:bg-lightGreen font-BeVietnamPro"
                        onClick={toggleDropdown}
                      >
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/historial"
                        className="block px-4 py-2 text-sm text-darkBlue hover:bg-lightGreen font-BeVietnamPro"
                        onClick={toggleDropdown}
                      >
                        Historial
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/configuracion"
                        className="block px-4 py-2 text-sm text-darkBlue hover:bg-lightGreen font-BeVietnamPro"
                        onClick={toggleDropdown}
                      >
                        Configuración
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-orange hover:bg-lightGreen font-BeVietnamPro"
                        onClick={handleLogout}
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-[#002847] hover:bg-[#618EB4]/10 font-BeVietnamPro"
                      onClick={() => handleOpenModal('login')}
                    >
                      Iniciar Sesión
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-[#002847] hover:bg-[#618EB4]/10 font-BeVietnamPro"
                      onClick={() => handleOpenModal('register')}
                    >
                      Registrarse
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-[#002847] hover:bg-[#618EB4]/10 font-BeVietnamPro"
                      onClick={() => handleOpenModal('contact')}
                    >
                      Contáctanos
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Botón del menú hamburguesa */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Enlaces del menú */}
        <div
          className={`absolute top-0 left-0 w-full h-auto bg-white shadow-lg transition-transform transform ${
            isMenuOpen ? 'translate-y-0 z-50' : '-translate-y-full'
          } md:relative md:translate-y-0 md:h-auto md:w-auto md:bg-transparent md:shadow-none`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-BeVietnamPro p-4 md:p-0 mt-4 border border-lightGreen rounded-lg bg-lightBeige md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded-sm md:p-0 font-BeVietnamPro font-bold ${location.pathname === '/' ? 'text-orange-600' : 'text-white hover:text-orange-600'}`}
                aria-current={location.pathname === '/' ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/Biblioteca"
                className={`block py-2 px-3 rounded-sm md:p-0 font-BeVietnamPro font-bold ${location.pathname === '/Biblioteca' ? 'text-orange-600' : 'text-white hover:text-orange-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Biblioteca
              </Link>
            </li>
            <li>
              <Link
                to="/Novedades"
                className={`block py-2 px-3 rounded-sm md:p-0 font-BeVietnamPro font-bold ${location.pathname === '/Novedades' ? 'text-orange-600' : 'text-white hover:text-orange-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Novedades
              </Link>
            </li>
            <li>
              <Link
                to="/nosotros"
                className={`block py-2 px-3 rounded-sm md:p-0 font-BeVietnamPro font-bold ${location.pathname === '/nosotros' ? 'text-orange-600' : 'text-white hover:text-orange-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
            </li>
            {userRole === 'Admin' && (
              <li>
                <Link
                  to="/admin"
                  className={`block py-2 px-3 rounded-sm md:p-0 font-BeVietnamPro font-bold ${location.pathname === '/panel-administrativo' ? 'text-orange-600' : 'text-white hover:text-orange-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel Administrativo
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;