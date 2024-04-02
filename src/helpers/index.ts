//Convierte el valor de dinero a una lectura más accesible
export function formatCurrency(amount:number){
    return new Intl.NumberFormat('en-US', {style: 'currency', currency:'USD'}).format(amount)
}


//Convierte la fecha en un valor leible y personalizable
export function formatDate(dateStr:string):string {
    const dateObj = new Date(dateStr)  //Convertimos el input en fecha
    const options: Intl.DateTimeFormatOptions = {  //Objeto de formato
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('en-US', options).format(dateObj)   //Regresa la fecha
}