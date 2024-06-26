import { useEffect, useState } from "react"
import { categories } from "../data/categories"
import DatePicker from "react-date-picker"
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { DraftExpense, Value } from "../types"
import { ErrorMessage } from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({  //Iniciamos el state del objeto de bills con valores iniciales
        amount: 0,
        expensename:'',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('') //State para colocar error
    const [previousAmount, setPreviousAmount] = useState(0)  //Monto anterior balance
    const {state, dispatch, totalRest} = useBudget()

    useEffect(() => {     
        if(state.editingID){      //Revisa que exista un state
            const editingExpense = state.expenses.filter((expense) => expense.id === state.editingID)[0]  //Rgresa el primer valor del filter coincidiendo con los ids del state registrado y el arreglo expenses
            setExpense(editingExpense)   //Setea los valores del expense al objeto  y llena el formulario
            setPreviousAmount(editingExpense.amount) //Nos permite congelar para poder evaluar el valor
        }
    },[state.editingID])  //useEffet para revisar cada que exista un editingID

    const handleChangeDate = (value:Value) => {  //Captura en el onChange para tener el valor que se este colocando en el input
        setExpense({
            ...expense,     //Copia de todo el state
            date: value
        })
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target  //destructura name de los inputs para capturar del event.target y el value
        const isAmountField = ['amount'].includes(name) //revisa que no sea amount el name
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value   //setea el name indicado con el value del field indicado, si es truel isAmount devuelve numero o string
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() //Impide actualziar pagina

        //Validando formulario
        if(Object.values(expense).includes('')){ //Revisa si existe includes en el objeto expense
            setError('All field must be fulled')
            return
        }

        //Validando por dispnibilidad de budget
        if((expense.amount - previousAmount) > totalRest){ //Revisa si la resta cerá negativa
            setError('This expenditure exceeds the available balance')
            return
        }
        //Revisando si hay algú ID
        if(state.editingID){ 
            dispatch({type: 'edit-expense', payload: {expense: {id: state.editingID, ...expense}}}) //Pasa el payload con un nuevo objeto pero el mismo id
        } else {
            dispatch({type:'add-expense', payload:{expense: expense}}) //Agrega un bill
        }

        setError('')  //Vacia el error
        setExpense({       //Riiniciando form
            amount: 0,
            expensename:'',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)    //reinicia el amount
    }
        
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            >{state.editingID ? "Editing" : "New Bill"}</legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                
                {/* Input name*/}
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Bill name</label>
                <input
                    type="text"
                    id = "expenseName"
                    placeholder="Add your bill"
                    className="bg-slate-100 p-2"
                    name="expensename"
                    value={expense.expensename}
                    onChange={handleChange}
                />

                {/* Input amount*/}
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Amount</label>
                <input
                    type="number"
                    min="0"
                    id = "amount"
                    placeholder="Add the amount"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount ? expense.amount : ''}
                    onChange={handleChange}
                />

                {/* Input category*/}
                <label
                    htmlFor="category"
                    className="text-xl"
                >Category</label>
                <select
                    id = "category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}   
                >
                    <option value="">-- Select --</option>
                    {categories.map((category)=> (
                        <option 
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>

                {/* Input date*/}
                <label
                    htmlFor="date"
                    className="text-xl"
                >Date of bill</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date} 
                    onChange={handleChangeDate} 
                />

            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-700"
                value={state.editingID ? "Edit Bill" : "Add Bill"}
            />

        </form>
    )
}
