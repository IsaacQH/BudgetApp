import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"

export const BudgetTracker = () => {

    const {state, totalExpenses, totalRest} = useBudget() //Se pasan las funciones del context

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex justify-center">
                    <img src="/grafico.jpg" alt="Graph"></img>
                </div>

                <div className="flex flex-col justify-center items-center gap-8">
                    <button
                        type="button"
                        className="bg-pink-600 w-full p-2 text-white text-center uppercase font-bold rounded-lg"
                    >Reset App</button>

                    <AmountDisplay
                        label = "Budget"
                        amount = {state.budget}
                    /> 
                    <AmountDisplay
                        label = "Spent"
                        amount = {totalExpenses}
                    />
                    <AmountDisplay
                        label = "Balance"
                        amount = {totalRest}
                    />

                </div>
            </div>
        </>

    )
}
