import { useEffect, useState } from "react"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useDashBoardStore } from "../store/dashboard"
import { useLogInStore } from "../store/login"

export function Dashboard(){

    const [dropToggle,setDropToggle]=useState(false)
    const loggedIn = useLogInStore((state)=>state.blue_admin_token)
    const role_pages = useDashBoardStore((state)=>state.role_pages)
    const user_roles = useLogInStore((state)=>state.roles)
    const logout = useLogInStore((state)=>state.resetTokenLogout)
    const app_pages = useDashBoardStore((state)=>state.app_pages)
    const first_load = useDashBoardStore((state)=>state.getDashboardFeatures)
    const first_pages = useDashBoardStore((state)=>state.getDashboardPages)
    const load_pages = useDashBoardStore((state)=>state.getRolePages)
    
    useEffect(()=>{
        if (loggedIn){
            first_load()
            first_pages()   
            load_pages()
        }
    },[loggedIn])
    
    const CheckRoles = (page_name) => {
        let result = false
        if (user_roles != null ){

            for (let key of user_roles) {    
                if (app_pages != null && key != null && role_pages?.[key] != null){       
                    if (role_pages?.[key].indexOf(page_name) > -1){
                        result = true
                        break;
                    }
                }
                
            }  
        }
            
        return result
    }

    return (    
            <div className="w-full p-2 bg-slate-100 ">
                <h6  onClick={()=>setDropToggle(!dropToggle)} className="md:min-w-full text-blueGray-500 text-xs shadow-xl uppercase font-bold block px-5 pt-1 pb-2 no-underline">
                    Blue Admin
                </h6>	
                <ErrorBoundary>
                    <div className={dropToggle ? 'w-full hidden' : 'w-full'} >
                        {
                            app_pages?.BlueAdmin.sort().map((page,index)=>{                     
                                if (CheckRoles(page)){
                                    return (
                                    <a key={page+index} className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                        href={"/"+page.toLowerCase().replace(/\s+/g, '')}	 onClick={null}> {page}
                                    </a> 
                                    )
                              }  
                            return ""                               
                            })
                                
                        }    
                        { !loggedIn ?
                                <a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                href="/Login"	 onClick={null}> Login
                                </a> 
                                :
                            <a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                            href="/#"	 onClick={logout}> Logout
                            </a> 
                        }
                    </div>
                </ErrorBoundary>
                </div >          
                )

}