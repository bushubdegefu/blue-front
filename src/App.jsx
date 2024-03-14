import './main.css'
import { LogInPage } from './page/Login'
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast'
import { HomePage } from './page/Home'
import { SingleUsersSection, UserPage } from './page/User'
import { EndPointPage } from './page/EndPoint'
import { SignUpPage } from './page/SignUp'
import { FeaturePage, SingleFeaturesSection } from './page/Feature'
import { BlueApp } from './page/BlueApp'
import { BluePage } from './page/BluePage'
import { RolePage, SingleRolesSection } from './page/Role'
import { useStyle } from './store/theme'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Dashboard, DashboardMobile, DashboardPCBar } from './page/Dashboard'
import { PrivateRoutes } from './components/privateroute'
import { useDashBoardStore } from './store/dashboard';
import { useEffect } from 'react'
import { useLogInStore } from './store/login'
function App() {
  
  const contDivClass=useStyle((state)=> state.styles.bushuContSec)
  const dashDivClass=useStyle((state)=> state.styles.sideBarNav)
  const secClass=useStyle((state)=> state.styles.appSecClass)
  const first_load = useDashBoardStore((state)=>state.getDashboardFeatures)
  const first_pages = useDashBoardStore((state)=>state.getDashboardPages)
  const load_pages = useDashBoardStore((state)=>state.getRolePages)
  const loggedIn = useLogInStore((state)=>state.blue_admin_token)

  useEffect(()=>{
		  first_load()
		  first_pages()   
		  load_pages()
	  
  },[loggedIn])		
  
  return (
    <section className={secClass}>
		<ErrorBoundary>
			<div className={dashDivClass}>
				<Dashboard />
			</div>
		</ErrorBoundary>
    <ErrorBoundary>
      <DashboardMobile />
    </ErrorBoundary>


        <BrowserRouter>
    
		<div className='w-full h-full flex flex-row md:flex-col space-y-1 overflow-hidden'>
			<div className='w-full hidden lg:block'>
				<DashboardPCBar />
			</div>	
			
			<div className={contDivClass}>
				<Routes>
					<Route path="/" element={<HomePage /> } />
					<Route path="/home" element={<HomePage /> } /> 
					<Route path="/login" element={<LogInPage /> } />
					<Route path="/signup" element={<SignUpPage /> } />  

					<Route element={<PrivateRoutes /> } >
					<Route path="/user" element={<UserPage /> } />
					<Route path="/user/:id" element={<SingleUsersSection /> } />
					<Route path="/role" element={<RolePage /> } /> 
					<Route path="role/:id" element={<SingleRolesSection />} />
					<Route path="/feature" element={<FeaturePage /> } />
					<Route path="/feature/:id" element={<SingleFeaturesSection />} />
					<Route path="/endpoint" element={<EndPointPage /> } />  
					<Route path="/page" element={<BluePage />} />
					<Route path="/app" element={<BlueApp />} />
					</Route>
				</Routes>
				<Toaster />
			</div>    
		</div>
    
      	</BrowserRouter>
    </section>
  )
}

export default App
