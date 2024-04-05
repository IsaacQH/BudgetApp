
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterCategory = () => {
    
    const {dispatch} = useBudget()
 
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type:'add-filter-category', payload: {id: e.target.value}})  //Cptura el cambio con el evento y agarra el value
    }

    return (
        <div className="">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5 mb-7 border-b border-gray-200 pb-6">
                    <label htmlFor="category" className="text-gray-600 text-2xl font-bold">Filter by</label>
                    <select 
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded-md"
                        onChange={handleChange}
                    >
                        <option value="" >-- All categories --</option>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
