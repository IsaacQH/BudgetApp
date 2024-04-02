
//Reducer para el budget: Controlaremos todo el tema del presupuesto, desde editarlo, eliminarlos, filstrar categorias que reducen el presupuesto, etc. Todas las acciones
import {v4 as uuidv4} from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    {type: 'add-budget', payload:{budget:number}} |   //action dispatch que captura el budget
    {type: 'show-modal'} |        //Action para mostrar modal
    {type: 'close-modal'} |    //Action para cerrar modal
    {type: 'add-expense', payload: {expense: DraftExpense}}

export type BudgetState = {
    budget:number         //Aqui guarda el budget
    modal: boolean
    expenses: Expense[] //Tipo expense porque añadirá un id
}

export const initialState: BudgetState = { //iniciamos los estados
    budget: 0,
    modal: false,   
    expenses: []
}

const createExpense = (draftExpense:DraftExpense) : Expense => { //Ingresa un tipo draft regresa el objeto con ID
    return {
        ...draftExpense,    //Copia del objeto
        id: uuidv4(),     //Regresa el added id con función
    }
}


export const budgetReducer = (
    state: BudgetState = initialState,
    action:BudgetActions
) => { 

    if(action.type === 'add-budget'){
        return{
            ...state,
            budget: action.payload.budget //Captura el budget en reducer
        }
    }

    if(action.type === 'show-modal'){
        return{
            ...state,
            modal: true //Seteamos a true y mostramos modal
        }
    }

    if(action.type === 'close-modal'){
        return{
            ...state,
            modal: false //Seteamos a true y mostramos modal
        }
    }

    if(action.type === 'add-expense'){
        const expense = createExpense(action.payload.expense)
        return{
            ...state,
            expenses: [...state.expenses, expense], //Toma una copia del aarreglo pasado, añade uno nuevo
            modal: false
        }
    }

    return state
}