import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {

    const {state, dispatch, totalExpenses, totalRest} = useBudget() //Se pasan las funciones del context

    const percentage = +((totalRest/state.budget) * 100).toFixed(2) //Regresa un valor de 2 en decimales ej . 40,56 . Hacerlo numero

    const minPercentage = 25

    const confirmReset = () => {
        const confirmation = confirm("Are you sure you want to reset the application?")

        if(confirmation){
            dispatch({type:'reset-application'})
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex justify-center">
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage < minPercentage ? '#DC2626' : '#3b82f6',
                            trailColor:'#F5F5F5',
                            textSize:8,
                            textColor: percentage < minPercentage ? '#DC2626' : '#3b82f6'
                        })}
                        text={`${percentage}% available`}
                    />
                </div>

                <div className="flex flex-col justify-center items-center gap-8">
                    <button
                        type="button"
                        className="bg-pink-600 w-full p-2 text-white text-center uppercase font-bold rounded-lg"
                        onClick={()=> confirmReset()}
                    >Reset Application</button>

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
