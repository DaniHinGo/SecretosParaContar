import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useState, useEffect } from 'react';

import "./tailwind.css";
import Menu from "./components/menu";
import Footer from "./components/Footer";
import Modal from './components/Modal';

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'login' | 'register' | 'contact'>('login');

  // Verificar si hay un parámetro modal en la URL
  useEffect(() => {
    const modalParam = searchParams.get('modal');
    if (modalParam === 'contact' || modalParam === 'login' || modalParam === 'register') {
      setModalView(modalParam as 'login' | 'register' | 'contact');
      setIsModalOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <main className="flex-grow">
        <Outlet /> {/* Aquí se renderizan las diferentes páginas */}
      </main>
      <Footer /> {/* Footer fijo en todas las páginas */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialView={modalView}
      />
    </div>
  );
}
