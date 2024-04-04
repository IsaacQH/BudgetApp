
//Reducer para el budget: Controlaremos todo el tema del presupuesto, desde editarlo, eliminarlos, filstrar categorias que reducen el presupuesto, etc. Todas las acciones
import {v4 as uuidv4} from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    {type: 'add-budget', payload:{budget:number}} |   //action dispatch que captura el budget
    {type: 'show-modal'} |        //Action para mostrar modal
    {type: 'close-modal'} |    //Action para cerrar modal
    {type: 'add-expense', payload: {expense: DraftExpense}} |  //Action que añade expense tipo draft sin id
    {type: 'remove-expense', payload:{id:Expense['id']}} | //Action que captura el id y remueve
    {type: 'edit-get-id', payload:{id:Expense['id']}} |  //Action que captura y guarda el id editable
    {type: 'edit-expense', payload:{expense: Expense}}

//FUNCIONES
const createExpense = (draftExpense:DraftExpense) : Expense => { //Ingresa un tipo draft regresa el objeto con ID
    return {
        ...draftExpense,    //Copia del objeto
        id: uuidv4(),     //Regresa el added id con función
    }
}

const initialBudget = (): number => {      
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? parseFloat(localStorageBudget) : 0; // Convertir a número usando parseFloat
};

const initialExpenses = (): Expense[] => {      
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []; 
};

    //REDUCER CONFIG
export type BudgetState = {
    budget:number         //Aqui guarda el budget
    modal: boolean
    expenses: Expense[] //Tipo expense porque añadirá un id
    editingID: Expense['id']   //Alberga el id que se editará
}

export const initialState: BudgetState = { //iniciamos los estados
    budget: initialBudget(),         //usa funcion para revisar localStorage
    modal: false,    
    expenses: initialExpenses(),    //usa funcion para revisar localStorage
    editingID: ''
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
            modal: false, //Seteamos a true y mostramos modal
            editingID:''   //elimina el id guardado
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

    if(action.type === 'remove-expense'){

        const updatedExpenses = state.expenses.filter((expense)=> expense.id !== action.payload.id) //Filtra todo aquello que no sea igual al id, regrea el eliminado

        return {
            ...state,
            expenses: updatedExpenses,
            editingID: ''    //Vacia el edit
        }
    }

    if(action.type === 'edit-get-id'){  //Registra el id
        return {
            ...state,
            editingID: action.payload.id,   //Captura en el state el id editable
            modal:true          //Abre modal para editar
        }
    }

    if(action.type === 'edit-expense'){
        const updatedExpenses = state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense)  
        //Hace un map en todo el arreglo, donde coincide el id con el action activo y en caso contrario regresa el objeto tal cual esta
        return {
            ...state,
            expenses: updatedExpenses,  //Coloca el expense updated
            modal: false,     //Quita el modal
            editingID:''   //elimina el id guardado
        }

    }

    return state
}