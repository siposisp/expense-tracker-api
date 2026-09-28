import ExpenseList from "../components/ExpenseList";

function Expenses() {
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center">
                <ExpenseList />
            </div>
        </div>
    );
}

export default Expenses;