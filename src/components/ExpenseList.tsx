
import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpenseList = () => {

    const {state} = useBudget()   //Accediendo al dispatch y state

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]) //Renderizará cada que cambie el state.expenses solo si es igual a cero
        
    return (
        <div className="m-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl font-bold">No registration yet</p>
            ) : (
                <div>
                    <p className="text-gray-600 text-2xl font-bold my-5">Bill List</p>
                    {state.expenses.map((expense) => (
                        <ExpenseDetail
                            key = {expense.id}
                            expense = {expense}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
