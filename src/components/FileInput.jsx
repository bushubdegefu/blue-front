
export function FileInput({ label, name,value, handler }){

    return(
        <div className="relative w-full mb-3">
        
          <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor={name}>{label}</label>
          <input name={name} onChange={handler} file={value} aria-label={label} className="bg-white w-full border-0 px-3 py-3 rounded file:border-0 file:px-3 file:py-3 shadow focus:outline-none focus:ring ease-linear transition-all duration-150" type="file" />

        </div>
    )
}
