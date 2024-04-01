
//Reducer para el budget: Controlaremos todo el tema del presupuesto, desde editarlo, eliminarlos, filstrar categorias que reducen el presupuesto, etc. Todas las acciones

export type BudgetActions = 
    {type: 'add-budget', payload:{budget:number}}   //action dispatch que captura el budget

export type BudgetState = {
    budget:number         //Aqui guarda el budget
}

export const initialState: BudgetState = { //iniciamos los estados
    budget:0   
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

    return state
}