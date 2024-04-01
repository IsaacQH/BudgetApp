
import { useReducer, createContext, ReactNode } from "react";
import { budgetReducer, initialState } from "../reducers/budget-reducer";
import { BudgetState, BudgetActions } from "../reducers/budget-reducer";

type BudgetContextProps = {    //Definiendo ripo de dato para los props de context
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>
}

type BudgetProviderProps = {  //Definiendo los datos para los props de provider que sera de childern
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)  //Configuración necesaria

export const BudgetProvider = ({children}:BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)  //Creamos el reducer con sus valores iniciales
    
    return(      //Configuración para el contextApi
        <BudgetContext.Provider
            value = {{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}