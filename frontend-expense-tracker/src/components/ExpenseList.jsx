import { useState, useEffect } from 'react';
import { getExpenses } from '../api/expenses';

export default function ExpenseList() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses()
            .then((data) => {
                console.log("Expenses recibidos:", data);
                setExpenses(data);
            })
            .catch((error) => {
                console.error("Error cargando expenses:", error);
            });
    }, []);

    return (
        <div>
            <h1>Mis gastos</h1>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.category.name}
                        {expense.description}
                        {expense.amount}
                        {expense.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}