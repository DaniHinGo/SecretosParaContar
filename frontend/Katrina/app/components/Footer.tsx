const Footer = () => {
    return (
        <footer className="bg-[#F43F20] text-white py-6 px-4 flex flex-wrap justify-between items-center"> 
        {/* Logo y redes sociales */}
        <div className="flex flex-col items-center space-y-4">
          <img src="/images/logocua.png" alt="Logo" className="w-48" />
          <div className="flex space-x-7">
            <img src="/images/instagram.png" alt="Instagram" className="w-6" />
            <img src="/images/facebook.png" alt="Facebook" className="w-6" />
            <img src="/images/tik-tok.png" alt="TikTok" className="w-6" />
            <img src="/images/youtube.png" alt="YouTube" className="w-6" />
          </div>
        </div>

        {/* Enlaces */}
        <div className="flex flex-col text-sm space-y-2 text-center">
          <a href="#" className="hover:underline">Términos y condiciones</a>
          <a href="#" className="hover:underline">Contacto</a>
        </div>

        {/* Suscripción */}
        <div className="text-right">
          <h3 className="font-bold">Suscríbete a nuestro boletín</h3>
          <p className="text-sm">Mantente enterado de nuestras novedades en el campo del lector</p>
          <input type="email" placeholder="Tu correo" className="mt-2 p-2 w-64 text-black rounded-md" />
        </div>
      </footer>
    );
  };
  
  export default Footer;

  