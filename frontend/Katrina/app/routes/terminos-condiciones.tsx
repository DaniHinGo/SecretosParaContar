import React from 'react';

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-[#002847] mb-8">Términos y Condiciones</h1>
          
          <div className="space-y-6 text-[#002847]">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Introducción</h2>
              <p className="mb-4">
                Bienvenido a Secretos para Contar. Al acceder y utilizar nuestro sitio web y servicios, 
                aceptas estos términos y condiciones en su totalidad.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Uso del Sitio</h2>
              <p className="mb-4">
                Nuestro sitio web está diseñado para proporcionar información sobre nuestros programas 
                educativos y materiales. Te comprometes a:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Proporcionar información precisa y completa</li>
                <li>No usar el sitio para fines ilegales</li>
                <li>No interferir con la seguridad del sitio</li>
                <li>Respetar los derechos de propiedad intelectual</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Contenido y Propiedad Intelectual</h2>
              <p className="mb-4">
                Todo el contenido en nuestro sitio web está protegido por derechos de autor y otras 
                leyes de propiedad intelectual. No está permitida la reproducción o distribución no 
                autorizada de nuestro contenido.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Privacidad</h2>
              <p className="mb-4">
                Tu privacidad es importante para nosotros. Nuestra política de privacidad describe 
                cómo recopilamos, usamos y protegemos tu información personal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Donaciones</h2>
              <p className="mb-4">
                Las donaciones realizadas a través de nuestro sitio son voluntarias y no reembolsables. 
                Nos comprometemos a utilizar los fondos recibidos para los fines especificados en 
                nuestros programas educativos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Modificaciones</h2>
              <p className="mb-4">
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                Los cambios serán efectivos inmediatamente después de su publicación en el sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre estos términos y condiciones, por favor contáctanos a través 
                de nuestro formulario de contacto o al correo electrónico info@secretosparacontar.org
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosCondiciones; 