
import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"
import { FilterCategory } from "./FilterCategory"

export const ExpenseList = () => {

    const {state} = useBudget()   //Accediendo al dispatch y state

    //Se encarga de filtrar si existe un filtro asignado, sino devuelve el valor completo
    const filteredExpenses = state.currentCategory ? state.expenses.filter((expense) => expense.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]) //Renderizará cada que cambie el state.expenses solo si es igual a cero

        
    return (
        <div className="m-5 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl font-bold">No registration yet</p>
            ) : (
                <div>
                    <FilterCategory/>
                    <p className="text-gray-600 text-2xl font-bold">{(filteredExpenses.length) ? "Bill List" : "No registration" }</p>
                    {filteredExpenses.map((expense) => (
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
