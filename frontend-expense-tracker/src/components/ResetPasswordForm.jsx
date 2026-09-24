import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../api/auth";

export default function ResetPasswordForm() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-white px-10 py-10.5 rounded-3xl border-2 border-gray-300'>
            <h1 className='text-4xl font-semibold'>Reset password</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Enter your new password below.</p>

            {success ? (
                <p className="mt-8 text-green-600 font-medium">
                    Password reset! Redirecting to login...
                </p>
            ) : (
                <form onSubmit={handleSubmit} className='mt-8'>
                    {error && (
                        <p className="text-red-500 font-medium mb-4">{error}</p>
                    )}

                    <div>
                        <label className='text-lg font-medium'>New password</label>
                        <input
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='At least 8 characters'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className='text-lg font-medium'>Confirm password</label>
                        <input
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder='Repeat your password'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={8}
                            required
                        />
                    </div>

                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button
                            type="submit"
                            disabled={loading}
                            className='active:scale-[.98] active:duration-60 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold disabled:opacity-50'
                        >
                            {loading ? 'Resetting...' : 'Reset password'}
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