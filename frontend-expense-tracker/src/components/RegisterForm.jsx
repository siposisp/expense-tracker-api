import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Form() {
    // Status for each field of the form
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const data = await register(name, email, password);
            localStorage.setItem('token', data.token);
            console.log('Usuario creado exitosamente, token guardado');
            navigate('/expenses');
        } catch (err){
            setError(err.response?.data?.error || 'No se pudo crear la cuenta');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-white px-10 py-10.5 rounded-3xl border-2 border-gray-300'>
            <h1 className='text-5xl font-semibold'>Crear cuenta</h1>
            <p className='font-medium text-lg text-gray-500 mt-3'>Introduce tus datos para empezar.</p>
            <form onSubmit={handleSubmit} className='mt-5'>
                {error && (
                    <p className="text-red-500 font-medium mb-4">{error}</p>
                )}

                <div>
                    <div>
                        <label className='text-lg font-medium'>Nombre</label>
                        <input
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Ingresa tu nombre'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <label className='text-lg font-medium'>Correo</label>
                        <input
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Ingresa tu correo'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <label className='text-lg font-medium'>Contraseña</label>
                        <input
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Ingresa tu contraseña'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <div>
                            <input
                                type="checkbox"
                                id='remember'
                            />
                            <label className='ml-1.5 font-medium text-base' htmlFor="remember">Recordar por 30 días</label>
                        </div>
                    </div>

                    <div className= 'mt-8 flex flex-col gap-y-4'>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className= 'active:scale-[.98] active:duration-60 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                        >
                            {loading ? 'Creando cuenta...' : 'Crear cuenta'} 
                        </button>
                    </div>
                    <div className='mt-8 flex justify-center item-center'>
                        <p className='font-medium text-base'>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className='text-violet-500 text-base font-medium ml-2'>Iniciar sesión</Link>
                    </div>
                </div>
            </form>
        </div>
    )

}