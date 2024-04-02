
import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"


type ExpenseDetailProp = {
    expense: Expense
}

export const ExpenseDetail = ({expense}: ExpenseDetailProp) => {

    const categoryInfo = useMemo(() => categories.filter((category) => category.id === expense.category)[0], [expense])
    
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center ">
            <div>
                <img src={`/icono_${categoryInfo.icon}.svg`} alt="icon image" className="w-20 h-20"/>
            </div>

            <div className="flex-1 space-y-3">
                <p className="text-sm font-bold text-slate-500 uppercase">{categoryInfo.name}</p>
                <p>{expense.expensename}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>

            <AmountDisplay
                amount = {expense.amount}
            />

        </div>
    )
}
