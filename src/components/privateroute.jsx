import { Navigate, Outlet } from 'react-router-dom'
import { useLogInStore } from "../store/store"

export function PrivateRoutes () {
   
    let authToken=useLogInStore((state)=> state.access_token)
    
        return (
            authToken ? <Outlet/> : <Navigate to='/login'/>
        )
}

