import { categories } from "../data/categories"

import DatePicker from "react-date-picker"
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'



export const ExpenseForm = () => {
  return (
    <form className="space-y-5">
        <legend
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
        >New Bill</legend>

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
                name="expenseName"

            />

            {/* Input amount*/}
            <label
                htmlFor="amount"
                className="text-xl"
            >Amount</label>
            <input
                type="number"
                id = "amount"
                placeholder="Add the amount"
                className="bg-slate-100 p-2"
                name="amount"
                
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
            />

        </div>

        <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-700"
            value="Add Bill"
        />

    </form>
  )
}
