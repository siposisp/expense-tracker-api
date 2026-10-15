
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

function Layout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

     // Cierra el menú móvil cada vez que cambia la ruta
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            {/* Botón hamburguesa para móviles */}
            <header className="flex p-4 md:hidden">
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-200"
                    aria-label="Abrir menú"
                    aria-expanded={menuOpen}
                >
                    <Menu size={24} />
                </button>
            </header>

            <div className="flex flex-1 gap-6 p-3 md:p-6">

                {/* Sidebar de escritorio: el ancho lo define este contenedor */}
                <div className="hidden w-70 shrink-0 md:block">
                    <Sidebar />
                </div>

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>

            {/* Menú desplegable en móviles */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">

                    <button
                        type="button"
                        className="absolute inset-0 h-full w-full bg-black/45"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Cerrar menú"
                    />

                    <div className="relative h-full w-70 max-w-[85vw] overflow-y-auto bg-gray-100 p-3">
                        <Sidebar />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Layout;