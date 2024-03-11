
export function NormalButton({ label, handleClick}){
    return (
      <button onClick={handleClick ? handleClick : null} aria-label={label} className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-2 w-full ease-linear transition-all duration-150" type="button">
        {label}
      </button>
    )
  }

export function TabNormalButton({ label, handleClick, token, index}){
    return (
      <button onClick={handleClick ? handleClick : null} aria-label={label} 
      className={token == index ?"bg-gray-400 text-black text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" 
        :
       "bg-gray-300 text-black text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" }
         type="button">
        {label}
      </button>
    )
  }