
import { useMemo } from "react"
import { useBudget } from "./hooks/useBudget"

import { BudgetForm } from "./components/BudgetForm"
import { BudgetTracker } from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpenseList } from "./components/ExpenseList"

function App() {

  const {state} = useBudget()  //Llamamos al custom Hook que tiene el context

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]) //Revisa si existe o hay un budget
  
  return (
    <>
     <header className=" bg-blue-500 py-8 max-h-full">
        <h1 className="uppercase text-center font-black text-4xl text-white">Budget Control</h1>
     </header>

     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
      {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
     </div>

     {isValidBudget && (
      <main className="max-w-3xl mx-auto py-10">
        <ExpenseList/>
        <ExpenseModal/>
      </main>
     )}
    </>
  )
}

export default App
