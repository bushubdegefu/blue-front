import { useState } from "react"
import { SingleInput, CheckBoxInput, PasswordInput  } from "../components/Input"
import { NormalButton } from "../components/Button"
import { useUserStore } from "../store/user"
import { ErrorBoundary } from "../components/ErrorBoundary"




export function SignUpPage(){

    const postUser = useUserStore((state)=>state.postUser) 

    const [show,setShow]=useState(false)
    const [match,setMatch]=useState(false)
    const [values, setValues] = useState({
        "email": "",
        "password": "",
        "disabled": true
    });
    const [conpassword,setConpassword]=useState('')
    
    const handleClick = ()=>{
        if (conpassword != values.password){
            setMatch(true)
        } else {
            setMatch(false)
            postUser(values)
            setValues((values) => ({
                ...values,
                "email": "",
                "password": "",
                "disabled": false
             }));
             setConpassword('')
        }
    }
    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValues((values) => ({
           ...values,
           [target.name] : value,
        }));
       
    };
    const handleConfirmChange = (event) => {
        event.persist();
        const target=event.target
        const convalue = target.type === 'checkbox' ? target.checked : target.value;
        setConpassword(convalue);
       
    };

    return(
        <div className="items-start justify-center w-11/12 h-auto p-2 m-2">          
            <title>Register</title>
            <div className="flex w-full content-center items-center justify-center h-full">
                <div className="w-full sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 sm:px-4 py-5 bg-gray-200 rounded-xl shadow">
                    <div className="relative -mt-12 mx-auto  bg-slate-100 opacity-90 flex flex-col min-w-0 break-words w-full mb-1 shadow-lg rounded-lg  border-0">
                       
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-gray-400 text-center mb-3 font-bold">
                            <a className="text-black-200" href="/login">  <small>Or sign in with credentials</small> </a>
                            </div>
                            <form>
                                   
                                    <SingleInput 
                                    name="email" 
                                    label="Email"  
                                    inputType="text" 
                                    placeHolder="beimdegefu@gmail.com"
                                    value={values.email} 
                                    handler={handleInputChange.bind(this)} />

                                    <PasswordInput 
                                    name="password" 
                                    label="Password"  
                                    inputType={show ? "text" : "password"}
                                    placeHolder="password" 
                                    value={values.password} 
                                    handler={handleInputChange.bind(this)} />

                                    <PasswordInput 
                                    name="confirm password" 
                                    label="Confirm Password"  
                                    inputType={show ? "text" : "password"}
                                    placeHolder="password" 
                                    value={conpassword} 
                                    handler={handleConfirmChange.bind(this)} />

                                    {match ?  <div className="flex flex-wrap pt-0 relative">
                                                    <div className="w-full ">
                                                        <p className="text-red-500">
                                                        <small>password do not match</small>
                                                        </p>
                                                    </div>
                                                </div> : null
                                                }      
                                    <br/>
                                    <CheckBoxInput
                                    value={values.disabled} 
                                    label="Disabled"
                                    name="disabled"
                                    handler={handleInputChange.bind(this)}
                                    />
                                    <br/>
                                    <CheckBoxInput
                                    value={show} 
                                    label="Show Password"
                                    name="show"
                                    handler={()=>setShow(!show)}
                                    />
                                    <br/>                                    
                                   <ErrorBoundary>
                                        <NormalButton 
                                        label="Sign Up" 
                                        handleClick={handleClick.bind(this)} />
                                    </ErrorBoundary>
                                    
                                 
                            </form>
                        </div>
                    </div>

                </div>
            </div>
         
       
        </div>
    )
    

}