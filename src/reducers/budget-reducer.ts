
//Reducer para el budget: Controlaremos todo el tema del presupuesto, desde editarlo, eliminarlos, filstrar categorias que reducen el presupuesto, etc. Todas las acciones

export type BudgetActions = 
    {type: 'add-budget', payload:{budget:number}} |   //action dispatch que captura el budget
    {type: 'show-modal'} |        //Action para mostrar modal
    {type: 'close-modal'}     //Action para cerrar modal

export type BudgetState = {
    budget:number         //Aqui guarda el budget
    modal: boolean
}

export const initialState: BudgetState = { //iniciamos los estados
    budget: 0,
    modal: false   
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

    return state
}