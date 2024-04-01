import { useMemo, useState } from "react"

export const BudgetForm = () => {

  const [budget, setBudget] = useState(0)

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    event.preventDefault
    setBudget(event.target.valueAsNumber)  //Lo convierte a número
  }

  const isValid = useMemo(() => {      //Usa useMemo para renderizar cada que budget cambia
    return isNaN(budget) || budget <= 0  //Regresa true para hacer disable si no es un numero o es igual o menor a cero
  },[budget])

  return (
    <>
      <form className=" space-y-5 ">
          <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-500 font-bold text-center">Define your budget</label>
            <input 
              id="budget"
              type="number"
              className="w-full bg-white border rounded-full border-gray-200 p-2"
              placeholder="Budget"
              name="budget"
              value={budget}
              onChange={handleChange}
            />
          </div>

          <input 
            type="submit" 
            className="py-2 px-6 border rounded-full w-full bg-blue-500 text-center font-black uppercase text-white hover:bg-blue-600 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
            value="Create budget" 
            disabled={isValid}
          />
      </form>
    </>
  )
}
