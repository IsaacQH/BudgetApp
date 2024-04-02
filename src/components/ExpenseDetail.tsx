
import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"

import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProp = {
    expense: Expense
}

export const ExpenseDetail = ({expense}: ExpenseDetailProp) => {

    const categoryInfo = useMemo(() => categories.filter((category) => category.id === expense.category)[0], [expense])

    const {dispatch} = useBudget()

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() =>{}}
            >
            Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => {dispatch({type:'remove-expense',payload:{id: expense.id}})}}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )
    
    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={0.7}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
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
            </SwipeableListItem>
        </SwipeableList>
    )
}
