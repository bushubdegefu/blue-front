import { useEffect, useState } from "react"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useDashBoardStore } from "../store/dashboard"
import { useLogInStore } from "../store/login"
import { useNavigate } from "react-router-dom"
import { BackIcon } from "../components/Icons"


export function Dashboard(){

    const [dropToggle,setDropToggle]=useState(false)
    const role_pages = useDashBoardStore((state)=>state.role_pages)
    const user_roles = useLogInStore((state)=>state.roles)
    const logout = useLogInStore((state)=>state.resetTokenLogout)
    const app_pages = useDashBoardStore((state)=>state.app_pages)
    const loggedIn = useLogInStore((state)=>state.blue_admin_token) 

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
        }else{
            if(role_pages?.["Anonymous"].indexOf(page_name) > -1){
                result = true
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
                                    <a key={page+index+"pc"} className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                        href={"/"+page.toLowerCase().replace(/\s+/g, '')}	 onClick={null}> {page}
                                    </a> 
                                    )
                              }  
                            return ""                               
                            })
                                
                        }    
                        { !loggedIn ?
                            ""
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


export function DashboardMobile(){

    const role_pages = useDashBoardStore((state)=>state.role_pages)
    const user_roles = useLogInStore((state)=>state.roles)
    const logout = useLogInStore((state)=>state.resetTokenLogout)
    const app_pages = useDashBoardStore((state)=>state.app_pages)
    const loggedIn = useLogInStore((state)=>state.blue_admin_token)
        
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
        }else{
            if(role_pages?.["Anonymous"].indexOf(page_name) > -1){
                result = true
            }
        }
            
        return result
    }

    return (
        <div className="navbar flex flex-row items-stretch lg:hidden bg-base-300 rounded-box">
            <div className="flex-1 px-2  lg:flex-none">
            <a className="text-lg font-bold">Blue UMS</a>
            </div> 
            <div className="flex w-10/12 justify-end flex-1 px-2">
                <div className="flex items-stretch">
                    <a href="/home" className="btn btn-ghost rounded-btn">Home</a>
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Admin Pages</div>
                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                            app_pages?.BlueAdmin.sort().map((page,index)=>{ 
                                                                  
                                                if (CheckRoles(page)){
                                                    return (
                                                    <li key={page+index+"mobile"}>
                                                        <a  className='text-xs uppercase hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                                            href={"/"+page.toLowerCase().replace(/\s+/g, '')}	 onClick={null}> {page}
                                                        </a>
                                                    </li> 
                                                    )
                                            }  
                                            return ""                               
                                            })
                                                
                                        }
                                        { !loggedIn ?
                                                ""
                                                :
                                                <li>
                                                    <a className='text-xs uppercase hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                                    href="/#"	 onClick={logout}> Logout
                                                    </a> 
                                                </li>
                                        }
                            </ul>
                    </div>
                </div>
            </div>
        </div>            
    )
}



export function DashboardPCBar(){
    const history = useNavigate()

    const logout = useLogInStore((state)=>state.resetTokenLogout)
    const loggedIn = useLogInStore((state)=>state.blue_admin_token)
    const user_email = useLogInStore((state)=>state.user_name)
    return (
        <div className="navbar w-full px-5 mx-1 bg-slate-100">
            <div className="flex-1">
                <a  onClick={()=>history(-1)}> 
                <BackIcon />
                </a>
                <a className="btn btn-ghost text-xl">{user_email}</a>
            </div>
            <div className="flex-none  justify-end">
                <ul className="menu menu-horizontal px-1">
                <li>
                    <details>
                    <summary>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    </summary>
                    <ul className="p-2 bg-base-100 rounded-t-none">
                        { !loggedIn ?
                        <li><a href="/login" >Login</a></li>
                            :
                        <li><a href="#" onClick={logout}>Logout</a></li>
                        }
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>
    )
}