//ARCHIVO: que contienen los tipos de datos


//Tipo de dato para el bill guardadp
export type Expense = {
    id: string,
    name: string,
    amount: number,
    category: string,
    date: Value       //Tipo de dato Value por dependencia
}

export type DraftExpense = Omit<Expense, 'id'> //Es el tipo de dato plantilla sin id

//Tipos de dato para las fechas dependencia
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

//Tipo de dato para Categories:
export type Category = {
    id: string,
    name: string,
    icon:string
}
