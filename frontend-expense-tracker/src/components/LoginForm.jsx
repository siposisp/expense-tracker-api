import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";


export default function Form() {
    // Status for each field of the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // This is executed when the user submits the form (clicks on "Sign in" or presses Enter)
    async function handleSubmit(e) {
        e.preventDefault(); // prevents the page from reloading (default behavior of a <form>)
        setError('');
        setLoading(true);

        try{
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            console.log('Login successful, token saved');
        } catch (error){
            setError('Incorrect email or password');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-white px-10 py-10.5 rounded-3xl border-2 border-gray-300'>
            <h1 className='text-5xl font-semibold'>Welcome Back</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
            <form onSubmit={handleSubmit} className='mt-5'>
                {error && (
                    <p className="text-red-500 font-medium mb-4">{error}</p>
                )}

                <div>
                    <div>
                        <label className='text-lg font-medium'>Email</label>
                        <input
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Enter your email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <label className='text-lg font-medium'>Password</label>
                        <input
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Enter your password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-8 flex justify-between items-center'>
                        <div>
                            <input
                                type="checkbox"
                                id='remember'
                            />
                            <label className='ml-1.5 font-medium text-base' htmlFor="remember">Remember for 30 days</label>
                        </div>
                        <button type="button" className='font-medium text-base text-violet-500'>
                            Forgot password
                        </button>
                    </div>

                    <div className= 'mt-8 flex flex-col gap-y-4'>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className= 'active:scale-[.98] active:duration-60 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                        <button type="button" className="flex border-2 py-2 rounded-xl border-gray-100 active:scale-[.98] active:duration-60 hover:scale-[1.01] items-center justify-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path fill="#4285F4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.875 2.684-6.614z"/>
                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.836.859-3.047.859-2.344 0-4.328-1.585-5.037-3.715H.956v2.332A9 9 0 0 0 9 18z"/>
                            <path fill="#FBBC05" d="M3.963 10.705A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.168.281-1.705V4.963H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.037l3.007-2.332z"/>
                            <path fill="#EA4335" d="M9 3.58c1.322 0 2.507.455 3.441 1.346l2.581-2.582C13.463.891 11.426 0 9 0A9 9 0 0 0 .956 4.963l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58z"/>
                        </svg>
                        Sign in with Google
                        </button>
                    </div>
                    <div className='mt-8 flex justify-center item-center'>
                        <p className='font-medium text-base'>Don't have an account</p>
                        <Link to="/register" className='text-violet-500 text-base font-medium ml-2'>Sign up</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

