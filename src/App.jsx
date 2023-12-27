import './main.css'
import { useState } from 'react'
import { LogInPage } from './page/Login'
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { HomePage } from './page/Home'
import { SingleUsersSection, UserPage } from './page/User'
import { EndPointPage } from './page/EndPoint'
import { SignUpPage } from './page/SignUp'
import { FeaturePage, SingleFeaturesSection } from './page/Feature'
import { BlueAppPage } from './page/BlueApp'
import { RolePage, SingleRolesSection } from './page/Role'
import { useStyle } from './store/theme'
import { useLogInStore } from './store/login'
import { ErrorBoundary } from './components/ErrorBoundary'

// npx tailwindcss -i ./src/index.css -m -o ./src/main.css 
// npx tailwindcss -i ./src/main.css -m -o ../static/css/main.min.css --watch

function App() {
  const [dropToggle,setDropToggle]=useState(false)
  const contDivClass=useStyle((state)=> state.styles.bushuContSec)
  const dashDivClass=useStyle((state)=> state.styles.sideBarNav)
  const secClass=useStyle((state)=> state.styles.appSecClass)
  const logout = useLogInStore((state)=>state.logout)
  return (
    <section className={secClass}>

		<div className={dashDivClass}>
        	<div className="w-full p-2 bg-slate-100 ">
            <h6  onClick={()=>setDropToggle(!dropToggle)} className="md:min-w-full text-blueGray-500 text-xs shadow-xl uppercase font-bold block px-5 pt-1 pb-2 no-underline">
           		Blue Admin
            </h6>	
        <ErrorBoundary>
			<div className={dropToggle ? 'w-full hidden' : 'w-full'} >
					
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/"	 onClick={logout}> Home
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/user"	 onClick={null}> User
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/feature"	 onClick={null}> Feature
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/role"	 onClick={null}> Role
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/app"	 onClick={null}> App
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/endpoint"	 onClick={null}> End Points
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/login"	 onClick={null}> Log In
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="/signup"	 onClick={null}> Sign Up
			</a>
			<a className='text-xs uppercase px-10 py-2 hover:bg-slate-300 font-bold block text-lightBlue-500 hover:text-lightBlue-600'
			href="#"	 onClick={logout}> Logout
			</a>
			</div>
		</ErrorBoundary>
       		</div >
        </div>

        <BrowserRouter>
    
          <div className={contDivClass}>
          <Routes>

          <Route path="/" element={<HomePage /> } /> 
          <Route path="/login" element={<LogInPage /> } />
          <Route path="/signup" element={<SignUpPage /> } />  
          <Route path="/user" element={<UserPage /> } />
		  <Route path="/user/:id" element={<SingleUsersSection /> } />
          <Route path="/role" element={<RolePage /> } /> 
		  <Route path="role/:id" element={<SingleRolesSection />} />
          <Route path="/feature" element={<FeaturePage /> } />
		  <Route path="/feature/:id" element={<SingleFeaturesSection />} />
          <Route path="/endpoint" element={<EndPointPage /> } />  
          <Route path="/app" element={<BlueAppPage />} />
          </Routes>
          <Toaster />
          </div>    
    
      	</BrowserRouter>
    </section>
  )
}

export default App
