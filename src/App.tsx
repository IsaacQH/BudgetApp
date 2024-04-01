import { BudgetForm } from "./components/BudgetForm"

function App() {


  return (
    <>
     <header className=" bg-blue-500 py-8 max-h-full">
        <h1 className="uppercase text-center font-black text-4xl text-white">Budget Control</h1>
     </header>

     <div className="max-w-3xl mx-auto bg-slate-50 shadow-lg rounded-lg mt-10 p-10">
      <BudgetForm/>
     </div>
    </>
  )
}

export default App
