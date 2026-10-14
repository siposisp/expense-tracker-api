import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col justify-between">
            <nav className="flex flex-col gap-y-4">
                <Link to="/expenses" className="font-medium text-base text-violet-300 hover:text-violet-400">
                    Gastos
                </Link>
                <span className="font-medium text-base text-gray-500 cursor-not-allowed">
                    Categorías
                </span>
                <span className="font-medium text-base text-gray-500 cursor-not-allowed">
                    Reportes
                </span>
                <span className="font-medium text-base text-gray-500 cursor-not-allowed">
                    Ajustes
                </span>
            </nav>

            <button
                onClick={handleLogout}
                type="button"
                className="font-medium text-base text-red-400 hover:text-red-500"
            >
                Cerrar sesión
            </button>
        </aside>
    );
}

export default Sidebar;