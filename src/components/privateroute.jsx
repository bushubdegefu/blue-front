import { Navigate, Outlet } from 'react-router-dom'
import { useLogInStore } from '../store/login' 

export function PrivateRoutes () {
   
    let authToken=useLogInStore((state)=> state.blue_admin_token)
    
        return (
            authToken ? <Outlet/> : <Navigate to='/login'/>
        )
}

