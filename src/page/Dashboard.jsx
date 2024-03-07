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
                                 	href="/login" onClick={null}> Login
                                </a> 
                                // <Link to={"/login"}></Link>
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
        <div className="navbar block lg:hidden bg-base-300 rounded-box">
            <div className="flex-1 px-2 lg:flex-none">
            <a className="text-lg font-bold">Blue UMS</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                    <a href="/home" className="btn btn-ghost rounded-btn">Home</a>
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Admin Pages</div>
                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            {
                                            app_pages?.BlueAdmin.sort().map((page,index)=>{                     
                                                if (CheckRoles(page)){
                                                    return (
                                                    <li>
                                                        <a key={page+index} className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                                            href={"/"+page.toLowerCase().replace(/\s+/g, '')}	 onClick={null}> {page}
                                                        </a>
                                                    </li> 
                                                    )
                                            }  
                                            return ""                               
                                            })
                                                
                                        }
                                        { !loggedIn ?
                                                <li>
                                                    <a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
                                                        href="/login" onClick={null}> Login
                                                    </a> 
                                                </li>
                                                // <Link to={"/login"}></Link>
                                                :
                                                <li>
                                                    <a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
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