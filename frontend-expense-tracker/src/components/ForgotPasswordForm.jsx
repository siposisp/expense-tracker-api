import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/auth";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const data = await forgotPassword(email);
            setMessage(data.message);
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-white px-10 py-10.5 rounded-3xl border-2 border-gray-300'>
            <h1 className='text-4xl font-semibold'>Forgot password?</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>
                Enter your email and we'll send you a reset link.
            </p>

            {message ? (
                <p className="mt-8 text-green-600 font-medium">{message}</p>
            ) : (
                <form onSubmit={handleSubmit} className='mt-8'>
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

                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button
                            type="submit"
                            disabled={loading}
                            className='active:scale-[.98] active:duration-60 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold disabled:opacity-50'
                        >
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </div>
                </form>
            )}

            <div className='mt-8 flex justify-center items-center'>
                <Link to="/login" className='text-violet-500 text-base font-medium'>Back to login</Link>
            </div>
        </div>
    )
}