import 'chart.js/auto';
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RefreshIcon, TrashIcon, TrayDownIcon, TrayUpIcon, EditIcon, CancelIcon, UpdateIcon} from "../components/Icons";
import {CheckBoxInput, ReadOnlySingleInputNoLabel, SingleInput, SingleInputNoLabel } from "../components/Input"
import { useEffect, Fragment, useState } from 'react';
import { useUserStore } from '../store/user';
import { Pagination } from '../components/Pagination';
import { Navigate, useParams } from "react-router-dom";
import { RolesDropDown } from './Role';
import { NormalButton, TabNormalButton } from '../components/Button';
import { useStyle } from '../store/theme';
import { Pie ,Bar } from 'react-chartjs-2';
import useCheckFeatures from '../uitls/check_features';
import useCheckPage from '../uitls/check_page';


// ########################################
export const data = {
    labels: ['False', 'True'],
    datasets: [
      {
        label: 'Disabled Users',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          ],
      },
    ],
  };

// ########################################
export function EditableGetUserComponent( {item, index} ){
       
    return (
    <Fragment key={'form-row'+index}>
        <div  className="w-full  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto">
            <div className="flex bg-gray-50 w-1/12 rounded-tl-lg justify-center items-center">
                <p>{item.id}</p>
            </div>
            <div className="flex justify-center text-ellipsis text-nowrap items-center break-all bg-gray-50 w-4/12">
                <p className="p-3  text-ellipsis ">{item.uuid}</p>
            </div>
            <div className="flex justify-center items-center break-alltext-nowrap bg-gray-50 w-4/12 text-ellipsis">
                <p> {item.email}</p>
            </div>
            <div className="flex capitalize justify-stretch items-stretch bg-gray-50 w-3/12 ">
                <div  className="w-8/12  flex flex-row space-x-1 my-auto items-stretch justify-center h-auto">
                    <p> {item.disabled.toString()}</p>
                </div>
                <div  className="w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto">
                    <div className="w-full flex justify-center items-center">
                        <a  href={"/user/"+item.id} className="bg-gray-300 w-11/12 h-full rounded-lg  font-bold  transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                            Detials 
                        </a>
                    </div>
                </div>
            </div>
        </div>
       
         
    </Fragment>
    )
}

export function EditableGetUserComponentMobile( {item, index} ){
   
    return (
        <Fragment key={'mobile-form-row'+index}>                   
           
            <div key={index+'-mobile'} className="w-full bg-slate-50 text-sm shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                    <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item.id} </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">UID </div>
                    <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 p-1 break-all bg-gray-300">{item.uuid} </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">email </div>
                    <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 break-all p-1 bg-gray-300 indent-3">{item.email}</div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">Disabled </div>
                    <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{item.disabled.toString()}</div>
                </div> 
                
                
                <div className="w-full flex flex-row justify-center">
                <a  href={`/user/${item.id}`}className="bg-gray-300 w-10/12 h-10 py-2  text-lg font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                Detials 
                </a>
                </div>                              
            </div>
                          
        </Fragment>
    )
}

export function UserPage(){ 
    // check feature and page  roles for render
    const page_check = useCheckPage("Page")
    
    const sizeDropDown= Array.from({length : 50},(_,i) => i+1)
    const get_users = useUserStore((state)=>state.getUsers)
    const filter_value = useUserStore((state)=>state.filter)
    const setFiltervalue = useUserStore((state)=>state.setFilterValue)
    const renderData = useUserStore((state)=>state.filtered_users)
    const myContainer=useStyle((state)=>state.styles.componentWorkingDiv) 
    //  pagination states


    const page = useUserStore((state)=>state.page)
    const pages = useUserStore((state)=>state.pages)
    const pageSize = useUserStore((state)=>state.size)
    const setPage = useUserStore((state)=>state.setPage)
    const setPageSize = useUserStore((state)=>state.setSize)
    const [sPage, setSpage]= useState(1)
    const totalUsers = useUserStore((state)=>state.total)
    const activePercentage = useUserStore((state)=>state.activeUserCounts)   

    useEffect(()=>{
        get_users()
        
    },[])

    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        setFiltervalue(target.value)
    };

    return (page_check ?
        <div className={myContainer}>
        <title>Users</title>
        <ErrorBoundary>
        <div className="w-full  h-56 overflow-y-hidden flex flex-col px-2 md:flex-row justify-start py-5 my-2 bg-slate-100 shadow-xl overflow-x-hidden">
            <div className="stats mx-10 w-full overflow-hidden shadow">    
                <div className="stat">
                    <div className="stat-title">Total Blue UMS Users </div>
                    <div className="stat-value ">{totalUsers} </div>
                    <div className="stat-desc">Current Users of System</div>
                </div>
                
                <div className="stat">
                    <div className="stat-title"> Active Users</div>
                    <div className="stat-value ">{activePercentage() != "NaN" ? activePercentage()+"%" : "" } </div>
                    <div className="stat-desc"> Are active from this Page</div>                       
                </div>         
            </div>
        </div>
        </ErrorBoundary>
        <ErrorBoundary>
        <div className="w-full flex items-stretch  justify-start h-full">
                <div className="flex flex-col space-y-0  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0 pt-2">
                    <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0 pb-1">
                        <div className="w-full h-full flex flex-row items-stretch justify-end">
                            <div className="flex justify-center items-center w-10/12 sm:w-3/12 ">
                                <input value={filter_value}  onChange={handleInputChange} maxLength="50" className="rounded-lg w-9/12 text-black" placeholder="search text here .." name="search" type="search"/>
                            </div>
                            <div className="flex justify-center items-center w-10 h-full rounded bg-slate-700">
                                <button onClick={get_users}>
                                    <RefreshIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-start h-auto px-4 lg:px-8 py-1 pt-0">
                        <Pagination 
                        page={page} 
                        pageSize={pageSize} 
                        setPage={setPage.bind(this)} 
                        setPageSize={setPageSize.bind(this)} 
                        maxPage={pages} 
                        sPage={sPage}
                        setSpage={setSpage.bind(this)}
                        options={sizeDropDown} />
                    </div>
                    <div className="pc-block hidden md:block w-full flex-auto space-y-1  px-4 lg:px-8 py-8 pt-0">
                    <div className="w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto">
                            <div className="flex bg-slate-700 w-1/12 rounded-tl-lg justify-center items-center">
                                <p>ID</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-4/12">
                                <p>UID</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-4/12">
                            <p> Email</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-3/12 rounded-tr-lg">
                            <p>Disabled</p>
                            </div>
                    </div>
                              
                    <ErrorBoundary>
                    {
                        renderData?.map((x,index) =>{
                            return(
                                <Fragment key={"editable"+index} >
                                <EditableGetUserComponent  item={x} index={index} />
                                </Fragment>
                            )
                        })
                    }
                    </ErrorBoundary>
                    </div>
                    <div className="mobile-block md:hidden w-full flex-auto px-4 lg:px-10 py-10 pt-0">            
                        <div className="w-full flex flex-col items-stretch h-auto space-y-1"> 
                        <ErrorBoundary>
                        {
                            renderData?.map((x,index) =>{       
                                return (
                                    <Fragment key={'mobile-one'+index}>
                                        <EditableGetUserComponentMobile item={x} index={index} />
                                    </Fragment>
                                )    
                                    })
                        }
                        </ErrorBoundary>
                        </div>
                    </div>
                
                </div>        
            </div>
        </ErrorBoundary>
        </div>
        :
        <Navigate to="/home" />
    )
}

//  Single User Page Components Down from here
export function ActivateUserButton({ user_id }){
    const activate = useUserStore((state)=>state.activateDeactivate)
    const activateUser = () => { 
        activate(user_id,false) 
    }    
    return (
        <div className="flex w-full sm:w-8/12 justify-center items-center" >
            <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-green-700" onClick={()=>activateUser()} >
                Enable
            </button>
        </div>
        )  

}  

//  Single User Page Components Down from here
export function ResetPasswordButton({ email_id }){
    const reset_password = useUserStore((state)=>state.changePassword)

    const resetPassword = () => { 
        let data = {
            "email" : email_id,
            "password" : "default@12"
          }
        reset_password(data,true) 
    }    
    return (
        <div className="flex w-full sm:w-8/12 justify-center items-center" >
            <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110" onClick={()=>resetPassword()} >
                Reset Password
            </button>
        </div>
        )  

}  

export function DeactivateUserButton({ user_id }){
    const deactivate = useUserStore((state)=>state.activateDeactivate)
    const deactivateUser = () => { 

        deactivate(user_id,true)
    }    
   
        return (
            <div className="flex w-full sm:w-8/12 justify-center items-center" >
                <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-red-700" onClick={deactivateUser} >
                Disable 
                </button>
            </div>
            )  
    

}

function DeleteUserRoleButton({ user_id , role_id}){
    const deleteRole = useUserStore((state)=>state.deleteUserRole)
    const deleteRouteRole = () => {
        deleteRole(user_id,role_id)
        // mutate({uid, role_id, access_token})
    }    
    
    return (
        <button onClick={()=>deleteRouteRole()} >
            <TrashIcon />
        </button>
        )
}

export function AddRoleToUserForm( {user_id } ){
    // feature render check
    const feature_check = useCheckFeatures("user_write")

    const addUserRole = useUserStore((state)=>state.addUserRole)   
    const [roleId, setRoleId] = useState();
    const handleClick =()=>{
        console.log(roleId)
        if ( roleId != "select to add"){
            addUserRole(user_id,roleId)
        }
    }
    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setRoleId(value);
      
    };
 

    return(
        <Fragment>
           <div className={`flex w-full content-center items-center justify-center h-full ${feature_check ? "": "hidden" } `}>
                <div className="flex flex-col items-center justify-center min-w-0 break-words w-full rounded-lg  border-0">                    
                    <div className="w-full  flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form className="p-5 w-full bg-sky-50 rounded-lg ">
                                <div className="flex flex-col  md:flex-row w-full" >
                                <div></div>
                                <ErrorBoundary>
                                    <RolesDropDown
                                    name="role-dropdown" 
                                    label="Role drop drown"      
                                    roleId={roleId}  
                                    handler={handleInputChange.bind(this)}                                 
                                    />
                                </ErrorBoundary>
                                </div>                                 
                                <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                <div></div> 
                                <div className="w-full flex flex-row justify-end items-end">
                                    <NormalButton 
                                    label="Add Role" 
                                    handleClick={handleClick} />                                       
                                </div>  

                                </div>
                                
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
    
}

export function ChangePasswordForm( {email_id } ){
    // feature render check
    const feature_check = useCheckFeatures("user_write")
    const reset_password = useUserStore((state)=>state.changePassword)
    const [password, setPassword] = useState();
    const handleClick =()=>{
        let data = {
            "email" : email_id,
            "password" : password
          }
        if ( password != "select to add"){
            reset_password(data,false)
        }
    }
    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setPassword(value);
      
    };
 

    return(
        <Fragment>
           <div className={`flex w-full content-center items-center justify-center h-full ${feature_check ? "": "hidden" } `}>
                <div className="flex flex-col items-center justify-center min-w-0 break-words w-full rounded-lg  border-0">                    
                    <div className="w-full  flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form className="p-5 w-full bg-sky-50 rounded-lg ">
                                <div className="flex flex-col  md:flex-row w-full" >
                                <div></div>
                                <ErrorBoundary>
                                    <SingleInput
                                    name="password" 
                                    label="Password"      
                                    password={password}  
                                    handler={handleInputChange.bind(this)}                                 
                                    />
                                </ErrorBoundary>
                                </div>                                 
                                <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                <div></div> 
                                <div className="w-full flex flex-row justify-end items-end">
                                    <NormalButton 
                                    label="Change Password" 
                                    handleClick={handleClick} />                                       
                                </div>  

                                </div>
                                
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
    
}

export function EditableSingleUserComponent( {item} ){
    //  for component render checks based on features
    const feature_check = useCheckFeatures("user_write")

    const [tabToken,setTabToken]=useState(1)
    const patch = useUserStore((state)=>state.patchUser)
    const [edit,setEdit]=useState(false)
    const [values, setValues] = useState({
        id: '',
        email : '',
        disabled: ''
    });

    const editing=()=>{
        setEdit(!edit)
        setValues((values) => ({
            ...values,
                id : item?.id,
                email: item?.email,
                disabled: item?.disabled
            }));
        }

    const handlePatch =()=>{
        patch(values)
        setEdit(false)
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
    
    if (item != null) {
    return (
        <Fragment key={'form-row'+item.id}>
            <div  className={edit ? "hidden":"w-full  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto"}>
                <div className="flex bg-gray-50 w-1/12 justify-center items-center">
                    <p>{item.id}</p>
                </div>
                <div className="flex justify-center items-center text-ellipsis text-nowrap break-all bg-gray-50 w-4/12 overflow-hidden">
                    <p className="p-3 ">{item.uuid}</p>
                </div>
                <div className="flex justify-center items-center break-all bg-gray-50 w-4/12 text-ellipsis">
                    <p> {item.email}</p>
                </div>
                <div className="flex justify-center capitalize items-center bg-gray-50 w-3/12 ">
                        <div  className="w-8/12  flex flex-row space-x-1 my-auto items-stretch justify-center h-auto">
                            <p> {item.disabled.toString()}</p>
                        </div>
                        <div  className={`w-5/12 ${feature_check ? "": "hidden" }  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto`}>
                            <div className="w-full flex justify-center items-center">
                                <button onClick={editing}>
                                    <EditIcon />
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            <ErrorBoundary>
                <div  className={edit ? "w-full  text-lg flex flex-row space-x-1 items-stretch justify-center h-auto" : "hidden"}>
                    <div className="flex bg-gray-50 w-1/12 justify-center items-center">
                        <ReadOnlySingleInputNoLabel 
                            name="id" 
                            label="User ID"  
                            inputType="text" 
                            placeHolder="Admin" 
                            value={values.id} 
                                />
                    </div>
                    <div className="flex justify-center items-center text-ellipsis text-nowrap break-all bg-gray-50 w-4/12 overflow-hidden">
                        <ReadOnlySingleInputNoLabel 
                            name="uuid" 
                            label="UUID"  
                            inputType="text" 
                            placeHolder="user identifier" 
                            value={item?.uuid} 
                            handler={handleInputChange.bind(this)}  />
                    </div>
                    <div className="flex justify-center items-center break-all bg-gray-50 w-4/12 text-ellipsis">
                        <SingleInputNoLabel 
                            name="email" 
                            label="email"  
                            inputType="text" 
                            placeHolder="What you can do with feature" 
                            value={values?.email} 
                            handler={handleInputChange.bind(this)} />
                    </div>
                    <div className="flex justify-center items-center break-all bg-gray-50 w-3/12 text-ellipsis">
                        <div className="flex justify-center items-center h-full w-4/12 bg-gray-100">
                            <CheckBoxInput
                                value={values?.disabled} 
                                label=""
                                name="disabled"
                                handler={handleInputChange.bind(this)}
                                />
                        </div>
                        <div className="flex justify-center items-center w-4/12 bg-gray-50">
                            <ErrorBoundary>
                                <button onClick={()=>handlePatch()} >
                                    <UpdateIcon />
                                </button>
                            </ErrorBoundary>
                        </div>
                        <div className="flex justify-center items-center w-4/12 bg-gray-50">
                            <button onClick={()=>setEdit(!edit)} >
                                <CancelIcon />
                            </button>                            
                        </div>
                    </div>
                </div>        
            </ErrorBoundary>
            <br/>
            <div role="tablist" className="tabs tabs-lifted w-full">
                <a  name="my_tabs_2" onClick={()=>setTabToken(1)} role="tab" className={`tab ${tabToken == 1 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="UseCases"> UseCases </a>
                <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                        <div className="flex w-full content-center items-center justify-center h-full  p-0">
                        <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                            <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Adding Roles To System User</div>
                                    <p className="text-gray-700 text-base">
                                    The Added Roles to Users refers to attaching privlege to a user to provided access to endpoints 
                                    that require the specified roles
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#adduserrole</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                                </div>
                            </div>
                            <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">        
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Resetting User Password </div>
                                    <p className="text-gray-700 text-base">
                                    Resets Password to "default@123" and forces user to Change password when logging in.

                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </div>
                            <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg"> 
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Disable User </div>
                                    <p className="text-gray-700 text-base">
                                    If user Disabled value is "True"; it means user will not be allowed to login.
                                    
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </div> 
                            <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Remove Pages From Users </div>
                                    <p className="text-gray-700 text-base">
                                    Revokes access to the specified page to User if removed.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                </div>
                            </div>  
                        </div>
                        </div>
                </div>
                <a  name="my_tabs_2" onClick={()=>setTabToken(2)} role="tab" className={`tab ${tabToken == 2 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="UseCases"> Roles </a>
                <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                        <ErrorBoundary>
                        <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                <div></div>
                                <div className='w-full flex  items-center justify-center bg-sky-50 font-bold text-xl'> 
                                <p>
                                Roles of User {item?.email}
                                </p>
                                </div>
                                {                                                                       
                                item.roles?.map((role,index)=>{
                                    return (
                                        <div key={index+role.name} className="flex w-4/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                            <div className="w-10/12 text-sm text-nowrap text-ellipsis bg-sky-50 break-all p-1 flex items-center justify-center">
                                                <p>{role.name}</p>
                                            </div>
                                            <div className={`w-2/12 flex items-center justify-center bg-slate-300 ${feature_check ? "": "hidden" }`}>
                                                <ErrorBoundary>
                                                    <DeleteUserRoleButton role_id={role.id} user_id={item.id} />
                                                </ErrorBoundary>
                                            </div>
                                        </div>
                                        )
                                    })   
                                    
                                
                                } 
                        </div>
                            <br/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                                <AddRoleToUserForm user_id={item.id} />
                        </ErrorBoundary>
                </div>
                <a  name="my_tabs_2" onClick={()=>setTabToken(3)} role="tab" className={`tab ${tabToken == 3 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black]`} aria-label="UseCases"> Operations </a>
                <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 w-full rounded-box p-6">
                    <div className="flex w-full flex-col md:flex-row items-center justify-center h-full ">
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                            <ErrorBoundary>
                                { item.disabled ?
                                <ActivateUserButton  user_id={item.id}/>:
                                <DeactivateUserButton user_id={item.id} />

                                }
                            </ErrorBoundary>
                        </div>  
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                            <ErrorBoundary>
                                <ResetPasswordButton email_id={item.email} />
                            </ErrorBoundary>
                        </div>  
                    </div> 
                </div>
                <a  name="my_tabs_2" onClick={()=>setTabToken(4)} role="tab" className={`tab ${tabToken == 4 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black]`} aria-label="Change Password"> ChangePassword </a>
                <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                    <ChangePasswordForm email_id={item.email} />
                </div>

            </div>
           
            
        </Fragment>
        )
    }
    return ""
}

export function EditableSingleUserComponentMobile({item}){
    // feature render check with roles
    const feature_check = useCheckFeatures("user_write")

    const [tabToken,setTabToken]=useState(1) 
    const [view,setView]=useState(false)
    const patch = useUserStore((state)=>state.patchUser)
    const [edit,setEdit]=useState(false)
    const [values, setValues] = useState({
        id: '',
        email : '',
        disabled: ''
    });

    const editing=()=>{
        setEdit(!edit)
        setValues((values) => ({
            ...values,
                id : item?.id,
                email: item?.email,
                disabled: item?.disabled
            }));
    
    }
    const handlePatch =()=>{
        patch(values)
        setEdit(false)
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
  
    if (item != null){

       return (
        <Fragment key={'mobile-form-row'+item.id}>                   
            {/* # */}
            <div key={item.id+'-mobile'} className="w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
                <div  className={!edit ? "w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" : "hidden"}> 
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                        <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item.id} </div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">UUID </div>
                        <div className="flex justify-center items-center text-ellipsis text-nowrap overflow-hidden w-8/12 p-1 break-all bg-gray-300">{item.uuid} </div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Email </div>
                        <div className="flex justify-center items-center  w-8/12 break-all p-1 bg-gray-300 indent-3">{item.email}</div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">Disabled </div>
                        <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{item.disabled.toString()}</div>
                    </div> 
                </div>
                {/* ### */}
                <div key={item?.id+'-mobile-form'} className={edit ? "w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" : "hidden"}>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300"> 
                            <ReadOnlySingleInputNoLabel 
                                name="id" 
                                label="User ID"  
                                inputType="text" 
                                placeHolder="Admin" 
                                value={values.id} 
                                    /> 
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">UUID</div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <ReadOnlySingleInputNoLabel 
                                name="uuid" 
                                label="UUID Name"  
                                inputType="text" 
                                placeHolder="User Identifier" 
                                value={item?.uuid} 
                                handler={handleInputChange.bind(this)}  />
                            </div>
                        </div>
                        <div className="w-full flex flex-row  justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Email </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <SingleInputNoLabel 
                                name="email" 
                                label="Email"  
                                inputType="text" 
                                placeHolder="Email Address" 
                                value={values?.email} 
                                handler={handleInputChange.bind(this)} />
                            </div>
                        </div>
                        <div className="w-full flex flex-row  justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Disabled</div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                                <CheckBoxInput
                                value={values?.disabled} 
                                label=""
                                name="disabled"
                                handler={handleInputChange.bind(this)}
                                />
                            </div>
                        </div> 
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-1/2 p-1 bg-gray-100 ">
                                <ErrorBoundary>
                                    <button onClick={()=>handlePatch()} >
                                        <UpdateIcon />
                                    </button>
                                </ErrorBoundary>
                            </div>
                            <div className="flex justify-center items-center w-1/2 p-1 bg-gray-100 indent-3">
                                <button onClick={()=>setEdit(!edit)} >
                                    <CancelIcon />
                                </button>   
                            </div>
                        </div>                             
                </div>
                {/* ### */}
                <div className={ edit ? "hidden":`w-full flex flex-row h-10 justify-center ${feature_check ? "": "hidden" } `} >
                        <button onClick={editing} >
                            <EditIcon />
                        </button> 
                </div>
                <div className="w-full flex flex-row h-10 justify-center" >
                    <button onClick={()=>setView(!view)}>
                    { view ? <TrayUpIcon /> : <TrayDownIcon /> }
                    </button>
                </div> 
            
                <div className={ view ? "w-full flex flex-row justify-center" : "hidden" }>
                    <div role="tablist" className="tabs tabs-lifted w-full">
                        <a  name="my_tabs_2" onClick={()=>setTabToken(1)} role="tab" className={`tab ${tabToken == 1 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="UseCases"> UseCases </a>
                        <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                            <div className="flex w-full content-center items-center justify-center h-full  p-0">
                            <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                                <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">Adding Roles To System User</div>
                                        <p className="text-gray-700 text-base">
                                        The Added Roles to Users refers to attaching privlege to a user to provided access to endpoints 
                                        that require the specified roles
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#adduserrole</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                                    </div>
                                </div>
                                <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">        
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">Resetting User Password </div>
                                        <p className="text-gray-700 text-base">
                                        Resets Password to "default@123" and forces user to Change password when logging in.

                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                    </div>
                                </div>
                                <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg"> 
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">Disable User </div>
                                        <p className="text-gray-700 text-base">
                                        If user Disabled value is "True"; it means user will not be allowed to login.
                                        
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                    </div>
                                </div> 
                                <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">Remove Pages From Users </div>
                                        <p className="text-gray-700 text-base">
                                        Revokes access to the specified page to User if removed.
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                    </div>
                                </div>  
                            </div>
                            </div>
                        </div>
                        <a  name="my_tabs_2" onClick={()=>setTabToken(2)} role="tab" className={`tab ${tabToken == 2 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="UseCases"> Roles </a>
                        <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                        <div></div>
                                        <div className='w-full flex  items-center justify-center bg-sky-50 font-bold text-xl'> 
                                        <p>
                                        Roles of User {item?.email}
                                        </p>
                                        </div>
                                        {                                                                       
                                        item.roles?.map((role,index)=>{
                                            return (
                                                <div key={index+role.name} className="flex w-4/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                                    <div className="w-10/12 text-sm text-nowrap text-ellipsis bg-sky-50 break-all p-1 flex items-center justify-center">
                                                        <p>{role.name}</p>
                                                    </div>
                                                    <div className={`w-2/12 flex items-center justify-center bg-slate-300 ${feature_check ? "": "hidden" }`}>
                                                        <ErrorBoundary>
                                                            <DeleteUserRoleButton role_id={role.id} user_id={item.id} />
                                                        </ErrorBoundary>
                                                    </div>
                                                </div>
                                                )
                                            })   
                                            
                                        
                                        } 
                                </div>
                                    <br/>
                                </ErrorBoundary>
                                <ErrorBoundary>
                                        <AddRoleToUserForm user_id={item.id} />
                                </ErrorBoundary>
                        </div>
                        <a  name="my_tabs_2" onClick={()=>setTabToken(3)} role="tab" className={`tab ${tabToken == 3 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black]`} aria-label="Operations"> Operations </a>
                        <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                            <div className="flex w-full flex-col items-center justify-center h-full ">
                                <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                                
                                    <ErrorBoundary>
                                        { item.disabled ?
                                        <ActivateUserButton  user_id={item.id}/>:
                                        <DeactivateUserButton user_id={item.id} />

                                        }
                                    </ErrorBoundary>
                                </div> 
                                <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                                    <ErrorBoundary>
                                        <ResetPasswordButton email_id={item.email} />
                                    </ErrorBoundary>
                                </div>   
                            </div> 
                        </div>
                        <a  name="my_tabs_2" onClick={()=>setTabToken(4)} role="tab" className={`tab ${tabToken == 4 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black]`} aria-label="Change Password"> ChangePassword </a>
                        <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                        <ChangePasswordForm email_id={item.email} />
                         </div>
                    </div>
                </div>                             
            </div>
                          
        </Fragment>
    )
}
return ""
}

export function SingleUsersSection( ){
    const myContainer=useStyle((state)=>state.styles.componentWorkingDiv)  
    const getSingleUser = useUserStore((state)=>state.getSingleUser)
    const item = useUserStore((state)=>state.user)
    const { id } = useParams()
    useEffect(()=>{
        getSingleUser(id)
    },[])
    return(
        <Fragment>
          <div className={myContainer}>          
            <title>User Details</title>
            <div className="bg-zinc-100 shadow-lg h-auto pb-5 w-full ">
            <div className="w-full flex items-stretch  justify-start h-auto  ">
                <div className="flex flex-col space-y-2  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-0 pt-5 ">
                    <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0">
                        <div className="w-full h-full flex flex-row items-start justify-end">
                            
                            <div className="flex justify-center items-center w-8 h-8 rounded bg-slate-700">
                                <button onClick={()=>getSingleUser(id)}>
                                    <RefreshIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pc-block w-full  hidden md:block"> 
                    <div className="w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto">
                        <div className="flex bg-slate-700 w-1/12 rounded-tl-lg justify-center items-center">
                            <p>ID</p>
                        </div>
                        <div className="flex justify-center items-center bg-slate-700 w-4/12">
                            <p>UID</p>
                        </div>
                        <div className="flex justify-center items-center bg-slate-700 w-4/12">
                        <p> Email</p>
                        </div>
                        <div className="flex justify-center items-center rounded-tr-lg bg-slate-700 w-3/12">
                        <p>Disabled</p>
                        </div>
                        
                    </div>
                    <ErrorBoundary>
                        <EditableSingleUserComponent id={id} item={item}  />
                    </ErrorBoundary> 
                    </div>
                    <div className="mobile-block md:hidden w-full flex-auto px-4 lg:px-10 py-10 pt-0">            
                        <div className="w-full flex flex-col items-stretch h-auto space-y-1"> 
                            <ErrorBoundary>
                                <EditableSingleUserComponentMobile id={id}  item={item}/>
                            </ErrorBoundary>      
                        </div>
                    </div>
                
                </div>        
            </div>
        </div>
        </div>
        </Fragment>
         )      
           
}