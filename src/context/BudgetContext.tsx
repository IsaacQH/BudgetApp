
import { useReducer, createContext, ReactNode, useMemo } from "react";
import { budgetReducer, initialState } from "../reducers/budget-reducer";
import { BudgetState, BudgetActions } from "../reducers/budget-reducer";

type BudgetContextProps = {    //Definiendo ripo de dato para los props de context
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>,
    totalExpenses:number,
    totalRest:number
}

type BudgetProviderProps = {  //Definiendo los datos para los props de provider que sera de childern
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)  //Configuración necesaria

export const BudgetProvider = ({children}:BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)  //Creamos el reducer con sus valores iniciales


    const totalExpenses = useMemo( () => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses])  //Caldula el total de gastos, usa un reduce

    const totalRest =state.budget - totalExpenses //Calcula el total de la resta disponible


    
    return(      //Configuración para el contextApi
        <BudgetContext.Provider
            value = {{
                state,
                dispatch,
                totalExpenses,
                totalRest
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}