import { useState } from "react"
import { TextInput, SingleInput } from "../components/Input";
import { NormalButton } from "../components/Button";
import { useUserStore } from "../store/user";


export function SendMailForm(){
    
    const sendmail = useUserStore((state)=>state.sendEmail)
    const [temails,setEmails] = useState("")
    const [values,setValues] = useState({
        emails: [],
        message: "",
        subject: ""
    })

    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValues((values) => ({
           ...values,
           [target.name] : value,
        }));
       
    };

    const handleClick = ()=>{
        if(temails.at(-1) != "," && temails != ""){
            // console.log(values)
            sendmail(values)
            setValues((values)=>({
                emails:[],
                message:"",
                subject:""
            }))
            setEmails("")
        }
    }

    const handleInputEmails = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setEmails(value)     
        let list_emails = value.split(",").filter((elem) => elem != undefined);
        setValues((values) => ({
           ...values,
           emails : list_emails,
        }));
        
       
    };
    return(
        <div className={"bg-zinc-100 h-auto  w-full px-5 md:px-0 md:w-7/12 lg:w-5/12 text-sm"} > 
            <div className="flex w-full shadow-2xl content-center items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center min-w-0 break-words w-full shadow-lg rounded-lg pb-15 bg-gray-200 border-0">                    
                    <div className="w-full  flex-auto px-4 lg:px-10 py-3">
                        <form className="m-2 px-2 w-full">
                            <div className="flex flex-col md:flex-row space-x-2 w-full" >
                            <div></div>
                            <SingleInput 
                            name="Emails" 
                            label="Emails"  
                            inputType="text" 
                            placeHolder="Comma Separted list of emails" 
                            value={temails} 
                            handler={handleInputEmails.bind(this)}  />
                            </div>
                            <div className="flex flex-col md:flex-row space-x-2 w-full" >
                            <div></div>
                            <SingleInput 
                            name="subject" 
                            label="Subject"  
                            inputType="text" 
                            placeHolder="Subject of the Message" 
                            value={values.subject} 
                            handler={handleInputChange.bind(this)}  />
                            </div>
                            <div className="flex flex-col md:flex-row space-x-2 w-full" >
                            <div></div>
                            <TextInput
                            name="message" 
                            label="Message"  
                            inputType="text" 
                            placeHolder="Message you want to send to recipeints" 
                            value={values.message} 
                            cn="h-48"
                            handler={handleInputChange.bind(this)} />
                            </div>                                 
                            <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                            <div></div> 
                            <div className="w-full flex flex-col items-end">
                                <div className="w-full sm:w-4/12">
                                <NormalButton 
                                label="Send" 
                                handleClick={handleClick} />     
                                </div>
                            </div>  
                            </div>                                
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export function HomePage(){ 

    return (
        <div className="w-full h-full flex flex-col py-3" >
        <div className="mx-5 carousel carousel-center bg-slate-50 w-11/12 justify-center rounded-box">
        
            <img className=" 	aspect-ratio: auto; rounded-xl" src="/wing.svg" alt="wings" />
        </div>
        <div className="flex w-full flex-col">
        <div className="divider mx-10"></div> 
        </div>
        <div className="w-full h-full flex flex-col md:flex-row flex-wrap items-stretch pt-5 pb-5  px-2 md:px-10  space-x-1 md:space-x-7  lg:space-x-14 space-y-12 ">
            <div></div>
            <div className="card hover:z-50 mt-30 transition ease-in-out delay-150 hover:scale-95 w-11/12 md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl">
            <figure className="-mt-5 rotate-0 mx-2" ><img className="rounded-xl" src="/blue.svg" alt="blue" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                Admin Features
                <div className="badge bg-slate-200">
                </div>
                </h2>
                <p>
                    Register Users that are relevant to the App.
                </p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">UMS</div> 
                <div className="badge badge-outline">Blue Admin</div>
                </div>
            </div>
            </div>
            <div className="card hover:z-50 mt-30 transition ease-in-out delay-150 hover:scale-95 w-11/12 md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl">
            <figure className="-mt-5 rotate-0 mx-2" ><img className="rounded-xl" src="/blue.svg" alt="blue" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                Register Apps
                <div className="badge bg-slage-200"></div>
                </h2>
                <p>Register Apps that want to use this up manage based on roles</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">UMS</div> 
                <div className="badge badge-outline">Blue Admin</div>
                </div>
            </div>
            </div>
            <div className="card hover:z-50 mt-30 transition ease-in-out delay-150 hover:scale-95 w-11/12 md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl">
            <figure className="-mt-5 rotate-0 mx-2" ><img className="rounded-xl" src="/blue.svg" alt="blue" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                Register Roles
                <div className="badge bg-slage-200"></div>
                </h2>
                <p>Register roles which can be part of an app at a time. Roles are a means used to group features. </p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">UMS</div> 
                <div className="badge badge-outline">Blue UMS</div>
                </div>
            </div>
            </div>
            <div className="card hover:z-50 mt-30 transition ease-in-out delay-150 hover:scale-95 w-11/12 md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl">
            <figure className="-mt-5 rotate-0 mx-2" ><img className="rounded-xl" src="/blue.svg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                Register Features & Endpoints
                <div className="badge bg-slage-200"> </div>
                </h2>
                <p>Features are to be descriptive of what you want to acheive using the app. It can have servral endpoints assocatied with it.
                And Endpoint refres to the api "url" that is suppose to be called to access a given resource. An endpoint can only have one parent feature.     
                </p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">Blue UMS</div> 
                <div className="badge badge-outline">Role Based Admin</div>
                </div>
            </div>
            </div>
            <div className="card hover:z-50 mt-30 transition ease-in-out delay-150 hover:scale-95 w-11/12 md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl">
            <figure className="-mt-5 rotate-0 mx-2" ><img className="rounded-xl" src="/blue.svg" alt="blue" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                Blue Authentication Middleware
                <div className="badge bg-slage-200"></div>
                </h2>
                <p>An Implemented Middleware, where user will not be able to access endpoints if id does not have the required role for the endpoint.</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">UMS</div> 
                <div className="badge badge-outline">Role Mangement</div>
                </div>
            </div>
            </div>
            <div className="card hover:z-50 mt-30 transition ease-in-out delay-150 hover:scale-95 w-11/12 md:w-5/12 lg:w-3/12 bg-base-100 shadow-xl">
            <figure className="-mt-5 rotate-0 mx-2" ><img className="rounded-xl" src="blue.svg" alt="blue" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                RPC Endpoint Summary of Apps
                <div className="badge bg-slage-200"></div>
                </h2>
                <p>The RPC endpoints are for use to apps that are registerd.</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">UMS</div> 
                <div className="badge badge-outline">RPC calls</div>
                </div>
            </div>
            </div>           
            
            
            
           
        </div>
        <div className="flex w-full flex-col">
        <div className="divider mx-10"></div> 
        </div>
        <div className="w-full pb-16 flex flex-col items-center justify-center">
            <h1 className="py-5 text-2xl font-bold">Sending Email</h1>
            <SendMailForm />
        </div>
        </div>
    )
}