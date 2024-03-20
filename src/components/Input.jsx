import { useState } from "react"

export function SingleInput({ label, inputType, placeHolder,name, value, handler}){

    return(

        <div className="relative w-full mb-3">
            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">{label}</label>
            <input name={name} type={inputType} onChange={handler} aria-label={label} className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder={placeHolder}  value={value}/>
        </div>

    )
}

export function ReadOnlySingleInput({ label, inputType, placeHolder,name, value, handler}){

    return(

        <div className="relative w-full mb-3">
            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">{label}</label>
            <input readonly name={name} type={inputType} onChange={handler} aria-label={label} className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder={placeHolder}  value={value}/>
        </div>

    )
}

export function PasswordInput({ label, inputType, placeHolder,name, value, handler}){
    return(

        <div className="relative w-full mb-3">
            <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="grid-password">{label}</label>
            <input name={name} type={inputType} onChange={handler} aria-label={label} className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder={placeHolder}  value={value}/>
        </div>

    )
}

export function TextInput({ label, placeHolder,name , value, handler,cn}){

    return(
        <div className="relative w-full mb-1">
            <label className={`block uppercase  text-gray-600 text-xs font-bold mb-2`} htmlFor="grid-password">{label}</label>
            <textarea name={name} onChange={handler} aria-label={label} className={`border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all ${cn ? cn : ""} duration-150`} placeholder={placeHolder} value={value} />
        </div>
        )
}

export function CheckBoxInput({label,name,handler, value}){
   
   return   (
   <div>
        <label className="inline-flex items-center cursor-pointer">
            <input name={name}  aria-label={label} value={value} checked={value} onChange={handler ? handler : null}  type="checkbox" className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" />
            <span className={label ? "ml-2 text-sm font-semibold text-gray-600" : "hidden"}>{label}</span>
        </label>
    </div>
    )
}

export function SelectInput({ data, name,handler, label}){
    
    return(
        <div className="relative w-full px-1 mb-3">
        <label className="block uppercase text-gray-600 text-xs font-bold mb-2" aria-label={label}>{label}</label>    
        <select name={name} className="block uppercase text-gray-600 text-xs font-bold w-full mb-2" onChange={handler}>
            <option defaultValue>
                select to add
            </option>
            {
            data.map((item,index)=>{
                return (
                    <option key={item.name+index} className="hover:bg-slate-300" value={item.id} >{item.name}</option>
                )
            })
            }
        </select>
        </div>
    )
}

export function SingleInputNoLabel({ label, inputType, placeHolder,name, value, handler}){

    return(

        <div className="relative w-full flex justify-center items-center ">
            <input name={name} type={inputType} onChange={handler} aria-label={label} className="border-0 resize-y px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-11/12 ease-linear transition-all duration-150" placeholder={placeHolder}  value={value}/>
        </div>

    )
}

export function TextInputNoLabel({ label, inputType, placeHolder,name, value, handler}){
    return(
        <div className="relative w-full flex justify-center items-center">
            <textarea name={name} type={inputType} onChange={handler} aria-label={label} className="border-0 resize-y px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder={placeHolder}  value={value}/>
        </div>

    )
}

export function ReadOnlySingleInputNoLabel({ label, inputType, placeHolder,name, value}){

    return(

        <div className="relative w-full flex justify-center items-center">
            <input readOnly name={name} type={inputType} aria-label={label} className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-11/12 ease-linear transition-all duration-150" placeholder={placeHolder}  value={value}/>
        </div>

    )
}

