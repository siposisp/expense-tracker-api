import { useState, useEffect } from 'react';
import { getExpenses } from '../api/expenses';

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses()
            .then((data) => {
                setExpenses(data);
            })
            .catch((error) => {
                console.error("Error cargando expenses:", error);
            });
    }, []);

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold mb-6'>Mis gastos</h1>

            <table className='w-full border-collapse'>
                <thead>
                    <tr className='border-b-2 border-gray-200 text-left'>
                        <th className='py-3 px-4'>Descripción</th>
                        <th className='py-3 px-4'>Categoría</th>
                        <th className='py-3 px-4'>Monto</th>
                        <th className='py-3 px-4'>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} className='border-b border-gray-100'>
                            <td className='py-3 px-4'>{expense.description}</td>
                            <td className='py-3 px-4'>{expense.category.name}</td>
                            <td className='py-3 px-4'>{expense.amount}</td>
                            <td className='py-3 px-4'>{expense.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}