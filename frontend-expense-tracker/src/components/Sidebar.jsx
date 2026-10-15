import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Receipt, LayoutGrid, BarChart3, Settings, LogOut } from 'lucide-react';

// "to: null" means that this page does not yet exist
const navItems = [
    { label: 'Inicio', icon: Home, to: null },
    { label: 'Gastos', icon: Receipt, to: '/expenses' },
    { label: 'Categorías', icon: LayoutGrid, to: null },
    { label: 'Reportes', icon: BarChart3, to: null },
    { label: 'Configuración', icon: Settings, to: null },
];






function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <aside className="min-h-full bg-white rounded-2xl p-5 flex flex-col shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 px-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500" />
                <span className="text-xl font-bold">Expense Tracker</span>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex flex-col gap-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    // Página que aún no existe: se ve apagada y no navega
                    if (!item.to) {
                        return (
                            <span
                                key={item.label}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 cursor-not-allowed"
                            >
                                <Icon size={20} />
                                {item.label}
                            </span>
                        );
                    }

                    // Página real: NavLink con estilo activo/inactivo
                    return (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors ${
                                    isActive
                                        ? 'bg-violet-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Icon size={20} />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Log out, pinned to the bottom */}
            <div className="mt-auto pt-6 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    type="button"
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;