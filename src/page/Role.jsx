import 'chart.js/auto';
import { SelectInput, ReadOnlySingleInputNoLabel,SingleInputNoLabel,TextInputNoLabel,SingleInput } from "../components/Input"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RefreshIcon, TrashIcon, TrayDownIcon, TrayUpIcon, EditIcon, CancelIcon,UpdateIcon } from "../components/Icons";
import { useEffect, Fragment, useState } from 'react';
import { useRoleStore } from '../store/role';
import { Pagination } from '../components/Pagination';
import { Navigate, useParams } from "react-router-dom";
import { data } from './User';
import { NormalButton, TabNormalButton } from '../components/Button';
import { useStyle } from '../store/theme';
import { Pie ,Bar } from 'react-chartjs-2';
import { useFeatureStore } from "../store/feature";
import { FeaturesDropDown } from "./Feature";
import { AppsDropDown } from "./BlueApp";
import useCheckFeatures from '../uitls/check_features';
import useCheckPage from '../uitls/check_page';

export function RolesDropDown({ label, roleId  ,name, handler}){
        const roles = useRoleStore((state)=>state.drop_roles)
        const getRoles = useRoleStore((state)=>state.getDropRoles)   
        
      
        useEffect(()=>{
            getRoles()
        },[])
        
        if (roles.length > 0){
    
            return(       
                <>
            <SelectInput data={roles} name={name} value={roleId} handler={handler} label={label} />             
            </>
             )
             
            }
        return ""
}

export function EditableGetRoleComponent( {item, index} ){
           
        return (
        <Fragment key={'form-row'+index}>
            <div  className="w-full  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto">
                <div className="flex bg-gray-50 w-1/12 rounded-tl-lg justify-center items-center">
                    <p>{item.id}</p>
                </div>
                <div className="flex justify-center text-ellipsis text-nowrap items-center break-all bg-gray-50 w-4/12">
                    <p className="p-3  text-ellipsis ">{item.name}</p>
                </div>
                <div className="flex justify-center items-center break-alltext-nowrap bg-gray-50 w-4/12 text-ellipsis">
                    <p> {item.description}</p>
                </div>
                <div className="flex capitalize justify-stretch items-stretch bg-gray-50 w-3/12 ">
                    <div  className="w-8/12  flex flex-row space-x-1 my-auto items-stretch justify-center h-auto">
                        <p> {item.active.toString()}</p>
                    </div>
                    <div  className="w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto">
                        <div className="w-full flex justify-center items-center">
                            <a  href={"/role/"+item.id} className="bg-gray-300 w-11/12 h-full rounded-lg  font-bold  transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                                Detials 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
           
             
        </Fragment>
        )
}
    
export function EditableGetRoleComponentMobile( {item, index} ){
       
        return (
            <Fragment key={'mobile-form-row'+index}>                   
                    <div key={index+'-mobile'} className="w-full bg-slate-50 text-sm shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                        <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item?.id} </div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">Name </div>
                        <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 p-1 break-all bg-gray-300">{item?.name} </div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Name </div>
                        <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 break-all p-1 bg-gray-300 indent-3">{item?.description}</div>
                    </div>
                    <div className="w-full flex flex-row justify-center">
                        <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">Active </div>
                        <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{item?.active.toString()}</div>
                    </div> 
                    
                    
                    <div className="w-full flex flex-row justify-center">
                    <a  href={`/role/${item.id}`}className="bg-gray-300 w-10/12 h-10 py-2  text-lg font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                    Detials 
                    </a>
                    </div>                              
                </div>
                              
            </Fragment>
        )
}

export function AddRolesForm(){
        const post = useRoleStore((state)=>state.postRole)
        const [values, setValues] = useState({
            name: '',
            app_id:0,
            description : '',
        });
    
        const handleClick =()=>{
            console.log(values)
            post(values)
            setValues((values) => ({
                ...values,
                name: '',
                description : '',
             }));
            
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
    
    
        return(
            <Fragment>
               <div className="flex w-full content-center items-center justify-center h-full ">
                    <div className="flex flex-col items-center justify-center min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-0">                    
                        <div className="w-full flex-auto px-4 lg:px-10 py-3 pt-0">
                            <form className="m-2 px-2 w-full">
                                    <div className="flex flex-col md:flex-row space-x-2 w-full" >
                                    <div></div>
                                    <SingleInput 
                                    name="name" 
                                    label="Role Name"  
                                    inputType="text" 
                                    placeHolder="Admin" 
                                    value={values.name} 
                                    handler={handleInputChange.bind(this)}  />
                                    <SingleInput 
                                    name="description" 
                                    label="Description"  
                                    inputType="text" 
                                    placeHolder="HR Administrator" 
                                    value={values.description} 
                                    handler={handleInputChange.bind(this)} />
                                     
                                    </div>
                                    <div className="flex flex-col md:flex-row space-x-2 w-full" >
                                    <div></div>
                                    <ErrorBoundary>
                                        <AppsDropDown
                                        name="app_id" 
                                        label="Apps Options"      
                                        value={values.app_id}  
                                        handler={handleInputChange.bind(this)}                                 
                                        />
                                    </ErrorBoundary>
                                    </div>                             
                                    <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                    <div></div> 
                                    <div className="w-full flex flex-col items-end">
                                        <div className="w-full sm:w-3/12">
                                        <NormalButton 
                                        label="Add Role" 
                                        handleClick={handleClick} />     
                                        </div>
                                    </div>  
    
                                    </div>
                                    
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        
    }

export function RolePage(){ 
        
    //  
    //render checks
        const feature_check = useCheckFeatures("role_write")
        const page_check = useCheckPage("Page") 

        //  tailwind styling
        const myContainer=useStyle((state)=>state.styles.componentWorkingDiv) 
        //  pagination dropdown options
        const sizeDropDown= Array.from({length : 50},(_,i) => i+1)
        
        // states from zustand store
        const get_pages = useRoleStore((state)=>state.getRoles)
        const filter_value = useRoleStore((state)=>state.filter)
        const setFiltervalue = useRoleStore((state)=>state.setFilterValue)
        const renderData = useRoleStore((state)=>state.filtered_roles)
        const totalRoles = useRoleStore((state)=>state.total)
        const activePercentage = useRoleStore((state)=>state.activeRoleCounts)
        
        //  pagination states   
        const page = useRoleStore((state)=>state.page)
        const pages = useRoleStore((state)=>state.pages)
        const pageSize = useRoleStore((state)=>state.size)
        const setPage = useRoleStore((state)=>state.setPage)
        const setPageSize = useRoleStore((state)=>state.setSize)
        const [sPage, setSpage]= useState(1)
        
    
        useEffect(()=>{
            get_pages()    
        },[])
    
        const handleInputChange = (event) => {
            event.persist();
            const target=event.target
            setFiltervalue(target.value)
        };
    
        return ( page_check ?

            <div className={myContainer}>
                <title>Roles</title>
                <ErrorBoundary>
                    <div className="w-full h-56 overflow-y-hidden flex flex-col px-2 md:flex-row justify-start py-5 my-2 bg-slate-100 shadow-xl overflow-x-hidden">
                    <div className="stats mx-10 w-full overflow-hidden shadow">
  
                        <div className="stat">
                            <div className="stat-title">Total Blue UMS Roles </div>
                            <div className="stat-value ">{totalRoles} Roles </div>
                            <div className="stat-desc">user can assume</div>
                        </div>
                        
                        <div className="stat">
                            <div className="stat-title"> Active Role</div>
                            <div className="stat-value ">{activePercentage() != "NaN" ? activePercentage()+"%" : "" } </div>
                            <div className="stat-desc"> Are active from this Page</div>                       
                        </div>             
                        </div>
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div className= {`bg-zinc-100 h-auto ${feature_check ? "": "hidden" } shadow-lg w-full text-sm` }>
                        <AddRolesForm />
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div className="w-full shadow-xl border-t-2 rounded-xl border-gray-700  flex items-stretch  justify-start h-full">
                            <div className="flex flex-col space-y-0  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0 pt-2">
                                <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0 pb-1">
                                    <div className="w-full h-full flex flex-row items-stretch justify-end">
                                        <div className="flex justify-center items-center w-10/12 sm:w-3/12 ">
                                            <input value={filter_value}  onChange={handleInputChange} maxLength="50" className="rounded-lg w-9/12 text-black" placeholder="search text here .." name="search" type="search"/>
                                        </div>
                                        <div className="flex justify-center items-center w-10 h-full rounded bg-slate-700">
                                            <button onClick={get_pages}>
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
                                            <p>Name</p>
                                        </div>
                                        <div className="flex justify-center items-center bg-slate-700 w-4/12">
                                        <p>Description</p>
                                        </div>
                                        <div className="flex justify-center items-center bg-slate-700 w-3/12 rounded-tr-lg">
                                        <p>Active</p>
                                        </div>
                                </div>
                                        
                                <ErrorBoundary>
                                {
                                    renderData?.map((x,index) =>{
                                        return(
                                            <Fragment key={"editable"+index} >
                                            <EditableGetRoleComponent  item={x} index={index} />
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
                                                    <EditableGetRoleComponentMobile item={x} index={index} />
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

//  Single Role Page Components Down from here
export function ActivateRoleButton({ role_id }){
        const activate = useRoleStore((state)=>state.activateDeactivate)
        const activateRole = () => { 
            activate(role_id,true) 
        }    
        return (
            <div className="flex w-full sm:w-8/12 justify-center items-center" >
                <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-green-700" onClick={()=>activateRole()} >
                    Enable
                </button>
            </div>
            )  
    
}  
    
export function DeactivateRoleButton({ role_id }){
        const deactivate = useRoleStore((state)=>state.activateDeactivate)
        const deactivateRole = () => { 
    
            deactivate(role_id,false)
        }    
       
            return (
                <div className="flex w-full sm:w-8/12 justify-center items-center" >
                    <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-red-700" onClick={deactivateRole} >
                    Disable 
                    </button>
                </div>
                )  
        
    
}
    
function DeleteRoleFeatureButton({ feature_id , role_id}){
        const deleteFeatureRole = useFeatureStore((state)=>state.deleteFeatureRole)
        const deleteRoleFeature = () => {
            deleteFeatureRole(feature_id,role_id)
           
        }    
        
        return (
            <button onClick={()=>deleteRoleFeature()} >
                <TrashIcon />
            </button>
            )
}
    
export function AddFeatureToRoleForm( {role_id} ){
        // render role and feature check
        const feature_check = useCheckFeatures("role_write")

        const addFeatureRole = useFeatureStore((state)=>state.addFeatureRole)   
        const [featureId, setfeatureId] = useState();
        const handleClick =()=>{
           
            if ( featureId != "select to add"){
                addFeatureRole(featureId,role_id)
            }
        }
        const handleInputChange = (event) => {
            event.persist();
            const target=event.target
            const value = target.type === 'checkbox' ? target.checked : target.value;
            setfeatureId(value);
          
        };
     
    
        return(
            <Fragment>
               <div className={` flex w-full content-center items-center justify-center h-full ${feature_check ? "": "hidden" }`}>
                    <div className="flex flex-col items-center justify-center min-w-0 break-words w-full rounded-lg  border-0">                    
                        <div className="w-full  flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form className="p-5 w-full bg-sky-50 rounded-lg ">
                                    <div className="flex flex-col  md:flex-row w-full" >
                                    <div></div>
                                    <ErrorBoundary>
                                        <FeaturesDropDown
                                        name="feature-dropdown" 
                                        label="Features Options"      
                                        value={featureId}  
                                        handler={handleInputChange.bind(this)}                                 
                                        />
                                    </ErrorBoundary>
                                    </div>                                 
                                    <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                    <div></div> 
                                    <div className="w-full flex flex-row justify-end items-end">
                                        <NormalButton 
                                        label="Add Feature" 
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

export function AddAppToRoleForm( {role_id} ){
    //  render feature and role check
    const feature_check = useCheckFeatures("role_write")

    const addApptoRole = useRoleStore((state)=>state.addAppToRole)   
    const [appId, setappId] = useState();
    const handleClick =()=>{
        
        if ( appId != "select to add"){
            addApptoRole(appId,role_id)
        }
    }
    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setappId(value);
    };
    
    return(
        <Fragment>
            <div className={`${feature_check ? "": "hidden" } flex w-full content-center items-center justify-center h-full`}>
                <div className="flex flex-col items-center justify-center min-w-0 break-words w-full rounded-lg  border-0">                    
                    <div className="w-full  flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form className="p-5 w-full bg-sky-50 rounded-lg ">
                                <div className="flex flex-col  md:flex-row w-full" >
                                <div></div>
                                <ErrorBoundary>
                                    <AppsDropDown
                                    name="feature-dropdown" 
                                    label="Features Options"      
                                    value={appId}  
                                    handler={handleInputChange.bind(this)}                                 
                                    />
                                </ErrorBoundary>
                                </div>                                 
                                <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                <div></div> 
                                <div className="w-full flex flex-row justify-end items-end">
                                    <NormalButton 
                                    label="Add" 
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
    
function PatchRoleButton({ patch_data,cancel }){

        const patch = useRoleStore((state)=>state.patchRole)
        const patchRole = () => { 
                patch(patch_data)
                cancel(false)
        }    
        
        return (
            <button onClick={()=>patchRole()} >
                <UpdateIcon />
            </button>
            )  
        
    
}  
    
export function EditableSingleRoleComponent( {id , endpoints} ){
        // role render check with feature
        const feature_check = useCheckFeatures("role_write")
        
        const [tabToken,setTabToken]=useState(1)
        const item = useRoleStore((state)=>state.role)
        const app = useRoleStore((state)=>state.app)
        const getSingleRole = useRoleStore((state)=>state.getSingleRole)
        const [edit,setEdit]=useState(false)
        const [values, setValues] = useState({
            id : "",
            name: "",
            description : "",
        });
        
        const handleInputChange = (event) => {
            event.persist();
            const target=event.target
            const value = target.type === 'checkbox' ? target.checked : target.value;
            setValues((values) => ({
               ...values,
               [target.name] : value,
            }));
        };

        const editing=()=>{
            setEdit(!edit)
            setValues((values) => ({
                ...values,
                id : item?.id,
                name: item?.name,
                description: item?.description
                }));
        }
        
        useEffect(()=>{
            getSingleRole(id)    
        },[])

        if (item != null) {
            return (
                <Fragment key={'form-row'+item.id}>
                    <div  className={!edit ? "w-full  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto": "hidden"}>
                        <div className="flex bg-gray-50 w-1/12 justify-center items-center">
                            <p>{item?.id}</p>
                        </div>
                        <div className="flex justify-center items-center text-ellipsis text-nowrap break-all bg-gray-50 w-4/12 overflow-hidden">
                            <p className="p-3 ">{item?.name}</p>
                        </div>
                        <div className="flex justify-center items-center break-all bg-gray-50 w-4/12 text-ellipsis">
                            <p> {item?.description}</p>
                        </div>
                        <div className="flex justify-center capitalize items-center bg-gray-50 w-3/12 ">
                            <div  className="w-8/12  flex flex-row space-x-1 my-auto items-stretch justify-center h-auto">
                                <p> {item?.active.toString()}</p>
                            </div>
                            <div  className={`${feature_check ? "": "hidden" } w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto`}>
                                <div className="w-full flex justify-center items-center">
                                    <button onClick={editing}>
                                        <EditIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  className={!edit ? "w-full py-1  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto": "hidden"}>
                        <div className="flex bg-gray-50 font-bold text-2xl w-full justify-center items-center">
                            <p> {app?.name}</p>
                        </div> 
                    </div>
                    
                    <ErrorBoundary>
                    <div  className={edit ? "w-full  text-lg flex flex-row space-x-1 items-stretch justify-center h-auto" : "hidden"}>
                        <div className="flex bg-gray-50 w-1/12 justify-center items-center">
                            <ReadOnlySingleInputNoLabel 
                                name="id" 
                                label="Role ID"  
                                inputType="text" 
                                placeHolder="Admin" 
                                value={values.id} 
                                    />
                        </div>
                        <div className="flex justify-center items-center text-ellipsis text-nowrap break-all bg-gray-50 w-4/12 overflow-hidden">
                            <SingleInputNoLabel 
                                name="name" 
                                label="Role Name"  
                                inputType="text" 
                                placeHolder="Admin" 
                                value={values.name} 
                                handler={handleInputChange.bind(this)}  />
                        </div>
                        <div className="flex justify-center items-center break-all bg-gray-50 w-4/12 text-ellipsis">
                            <TextInputNoLabel 
                                name="description" 
                                label="Description"  
                                inputType="text" 
                                placeHolder="HR Administrator" 
                                value={values.description} 
                                handler={handleInputChange.bind(this)} />
                        </div>
                        <div className="flex justify-center capitalize items-center bg-gray-50 w-3/12 ">
                            <div className="flex justify-center items-center w-6/12 bg-gray-50">
                                <ErrorBoundary>
                                    <PatchRoleButton patch_data={values} cancel={setEdit} />
                                </ErrorBoundary>
                            </div>
                            <div className="flex justify-center items-center w-6/12 bg-gray-50">
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
                                <div className="flex w-ful content-center items-center justify-center h-full  p-0">
                                <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                                    <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Updating  Role Attribute</div>
                                            <p className="text-gray-700 text-base">
                                            Updating role included changing description and status,and which app the role belongs to.
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#updaterole</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                                        </div>
                                    </div>
                                    <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Disable Role </div>
                                            <p className="text-gray-700 text-base">
                                            If Role  is Disabled "True"; the user with this specfic role will not be able to access endpoints asscocaited with the role.
                                            
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#disable</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#enable</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#role</span>
                                        </div>
                                    </div> 
                                    <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Add Features To Roles </div>
                                            <p className="text-gray-700 text-base">
                                            As long as the attached feature is active;Role will have Access to Operations on 
                                            Endpoints grouped with te feature.
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#addfeature</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#torole</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#blueadmin</span>
                                        </div>
                                    </div>
                                    <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Remove Features From Roles </div>
                                            <p className="text-gray-700 text-base">
                                            Removes related Features with the role.
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

                            <a name="my_tabs_2" onClick={()=>setTabToken(2)}  role="tab" className={`tab ${tabToken == 2 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="Features"> Features </a>
                            <div role="tabpanel" className="tab-content bg- bg-gray-200  border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                        <div></div>
                                        <div className='w-full flex  items-center justify-center bg-gray-50 font-bold text-xl'> 
                                        <p>
                                        Features Asscociated With this Role
                                        </p>
                                        </div>
                                        {                                                                           
                                            item?.features?.map((feature,index)=>{
                                                return (
                                                    <div key={index+feature?.name} className="flex w-4/12 rounded-2x  p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                                        <div className="w-10/12 text-sm text-nowrap  overflow-hidden  text-ellipsis bg-sky-100 break-all p-1 flex items-center justify-center">
                                                            <p className="text-ellipsis">{feature?.name}</p>
                                                        </div>
                                                        <div className={`${feature_check ? "": "hidden" } w-2/12 flex items-center justify-center bg-slate-300`}>
                                                            <ErrorBoundary>
                                                                <DeleteRoleFeatureButton feature_id={feature?.id} role_id={item?.id} />
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
                                    <AddFeatureToRoleForm role_id={item?.id} />
                                </ErrorBoundary>
                            </div>

                            <a name="my_tabs_2" onClick={()=>setTabToken(3)}  role="tab" className={`tab ${tabToken == 3 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black]`} aria-label="Operations" >Operations</a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                                    <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                                    
                                        <ErrorBoundary>
                                            { item.active ?
                                            <DeactivateRoleButton role_id={item?.id} /> :
                                            <ActivateRoleButton  role_id={item?.id}/>
            
                                            }
                                        </ErrorBoundary>
                                    </div>
                                </div>
                            </div>

                            <a name="my_tabs_2" onClick={()=>setTabToken(4)}  role="tab" className={`tab ${tabToken == 4 ? "tab-active" : ""} ${feature_check ? "": "hidden" }  [--tab-bg:white] [--tab-border-color:black]`} aria-label="EndPoints" >EndPoints</a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                    <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                            <div></div>
                                            <div className='w-full flex  items-center justify-center bg-sky-50 font-bold text-xl'> 
                                            <p>
                                            Endpoints that can be accesed with this Role
                                            </p>
                                            </div>
                                            {                                                                        
                                            endpoints?.map((endpoint,index)=>{
                                                return (
                                                    <div key={index+endpoint?.name} className="flex w-3/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                                        <div className="w-full text-sm text-nowrap  overflow-hidden  text-ellipsis bg-sky-100 break-all p-1 flex items-center justify-center">
                                                            <p className="text-ellipsis">{endpoint?.name}</p>
                                                        </div>
                                                    </div>
                                                    )
                                                })   
                                            } 
                                    </div>
                                    <br/>
                                </ErrorBoundary>
                            </div>
                        
                            <a name="my_tabs_2" onClick={()=>setTabToken(5)}  role="tab" className={`tab ${tabToken == 5 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black] `} aria-label="App">App</a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                    <AddAppToRoleForm role_id={item?.id} />
                                </ErrorBoundary>
                            </div>
                                    
                    </div> 
                                       
                </Fragment>
                )
        }
        return ""
}
    
export function EditableSingleRoleComponentMobile({id, endpoints}){
        const feature_check = useCheckFeatures("role_write")
        const [tabToken,setTabToken]=useState(1) 
        const item = useRoleStore((state)=>state.role)
        const app = useRoleStore((state)=>state.app)
        const [view,setView]=useState(false)
        const getSingleRole = useRoleStore((state)=>state.getSingleRole)
        const [edit,setEdit]=useState(false)
        const [values, setValues] = useState({
            id : "",
            name: "",
            description : "",
        });
        
        const handleInputChange = (event) => {
            event.persist();
            const target=event.target
            const value = target.type === 'checkbox' ? target.checked : target.value;
            setValues((values) => ({
               ...values,
               [target.name] : value,
            }));
        };
        
        const editing=()=>{
            setEdit(!edit)
            setValues((values) => ({
                ...values,
                id : item?.id,
                name: item?.name,
                description: item?.description
                }));
        
        }
        useEffect(()=>{
            getSingleRole(id)
        },[])
        
        if (item != null){
           
           return (
            <Fragment key={'mobile-form-row'+item?.id}>                   
                {/* # */}
                <div key={item?.id+'-mobile'} className="w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
                    <div  className={!edit ? "w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" : "hidden"}>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item?.id} </div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">Name </div>
                            <div className="flex justify-center items-center text-ellipsis text-nowrap overflow-hidden w-8/12 p-1 break-all bg-gray-300">{item?.name} </div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Description </div>
                            <div className="flex justify-center items-center  w-8/12 break-all p-1 bg-gray-300 indent-3">{item?.description}</div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">Disabled </div>
                            <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{item?.active.toString()}</div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">App </div>
                            <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{app?.name}</div>
                        </div>
                    </div> 
                   {/* ### */}
                   <div key={item?.id+'-mobile-form'} className={edit ? "w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" : "hidden"}>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300"> 
                            <ReadOnlySingleInputNoLabel 
                                name="id" 
                                label="Role ID"  
                                inputType="text" 
                                placeHolder="Admin" 
                                value={values.id} 
                                    /> 
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">Role </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <SingleInputNoLabel 
                                name="name" 
                                label="Role Name"  
                                inputType="text" 
                                placeHolder="Admin" 
                                value={values.name} 
                                handler={handleInputChange.bind(this)}  />
                            </div>
                        </div>
                        <div className="w-full flex flex-row  justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Description </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <TextInputNoLabel 
                                name="description" 
                                label="Description"  
                                inputType="text" 
                                placeHolder="HR Administrator" 
                                value={values.description} 
                                handler={handleInputChange.bind(this)} />
                            </div>
                        </div> 
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-1/2 p-1 bg-gray-100 ">
                                <ErrorBoundary>
                                    <PatchRoleButton patch_data={values} cancel={setEdit}/>
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
                   <div className={ edit ? "hidden":`w-full flex ${feature_check ? "": "hidden" } flex-row h-10 justify-center`} >
                        <button onClick={editing} >
                            <EditIcon />
                        </button> 
                    </div>
                    <div className="w-full flex flex-row h-10 justify-center" >
                        <button onClick={()=>setView(!view)}>
                        { view ? <TrayUpIcon /> : <TrayDownIcon /> }
                        </button>
                    </div>
        
                
                    <div className={ view ? "w-full  flex flex-auto justify-center" : "hidden" }>
                    <div role="tablist" className="tabs tabs-lifted w-full">
                            <a  name="my_tabs_2" onClick={()=>setTabToken(1)} role="tab" className={`tab ${tabToken == 1 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="UseCases"> UseCases </a>
                            <div role="tabpanel" className="tab-content  bg-gray-200  border-base-300 rounded-box p-6">
                                <div className="flex w-ful content-center items-center justify-center h-full  p-0">
                                <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                                    <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Updating  Role Attribute</div>
                                            <p className="text-gray-700 text-base">
                                            Updating role included changing description and status,and which app the role belongs to.
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#updaterole</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                                        </div>
                                    </div>
                                    <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Disable Role </div>
                                            <p className="text-gray-700 text-base">
                                            If Role  is Disabled "True"; the user with this specfic role will not be able to access endpoints asscocaited with the role.
                                            
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#disable</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#enable</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#role</span>
                                        </div>
                                    </div> 
                                    <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Add Features To Roles </div>
                                            <p className="text-gray-700 text-base">
                                            As long as the attached feature is active;Role will have Access to Operations on 
                                            Endpoints grouped with te feature.
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#addfeature</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#torole</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#blueadmin</span>
                                        </div>
                                    </div>
                                    <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">Remove Features From Roles </div>
                                            <p className="text-gray-700 text-base">
                                            Removes related Features with the role.
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

                            <a name="my_tabs_2" onClick={()=>setTabToken(2)} role="tab" className={`tab ${tabToken == 2 ? "tab-active" : ""} [--tab-bg:white] [--tab-border-color:black]`} aria-label="Features"> Features </a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                        <div></div>
                                        <div className='w-full flex  items-center justify-center bg-sky-50 font-bold text-xl'> 
                                        <p>
                                        Features Asscociated With this Role
                                        </p>
                                        </div>
                                        {                                                                           
                                            item?.features?.map((feature,index)=>{
                                                return (
                                                    <div key={index+feature?.name} className="flex w-4/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                                        <div className="w-10/12 text-sm text-nowrap  overflow-hidden  text-ellipsis bg-sky-100 break-all p-1 flex items-center justify-center">
                                                            <p className="text-ellipsis">{feature?.name}</p>
                                                        </div>
                                                        <div className={`${feature_check ? "": "hidden" } w-2/12 flex items-center justify-center bg-slate-300`}>
                                                            <ErrorBoundary>
                                                                <DeleteRoleFeatureButton feature_id={feature?.id} role_id={item?.id} />
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
                                    <AddFeatureToRoleForm role_id={item?.id} />
                                </ErrorBoundary>
                            </div>

                            <a name="my_tabs_2" onClick={()=>setTabToken(3)}  role="tab" className={`tab ${tabToken == 3 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black]`} aria-label="Operations" >Operations</a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                                    <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                                    
                                        <ErrorBoundary>
                                            { item.active ?
                                            <DeactivateRoleButton role_id={item?.id} /> :
                                            <ActivateRoleButton  role_id={item?.id}/>
            
                                            }
                                        </ErrorBoundary>
                                    </div>
                                </div>
                            </div>

                            <a name="my_tabs_2" onClick={()=>setTabToken(4)}  role="tab" className={`tab ${tabToken == 4 ? "tab-active" : ""} ${feature_check ? "": "hidden" }  [--tab-bg:white] [--tab-border-color:black]`} aria-label="EndPoints" >EndPoints</a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                    <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                            <div></div>
                                            <div className='w-full flex  items-center justify-center bg-sky-50 font-bold text-xl'> 
                                            <p>
                                            Endpoints that can be accesed with this Role
                                            </p>
                                            </div>
                                            {                                                                        
                                            endpoints?.map((endpoint,index)=>{
                                                return (
                                                    <div key={index+endpoint?.name} className="flex w-3/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                                        <div className="w-full text-sm text-nowrap  overflow-hidden  text-ellipsis bg-sky-100 break-all p-1 flex items-center justify-center">
                                                            <p className="text-ellipsis">{endpoint?.name}</p>
                                                        </div>
                                                    </div>
                                                    )
                                                })   
                                            } 
                                    </div>
                                    <br/>
                                </ErrorBoundary>
                            </div>
                        
                            <a name="my_tabs_2" onClick={()=>setTabToken(5)}  role="tab" className={`tab ${tabToken == 5 ? "tab-active" : ""} ${feature_check ? "": "hidden" } [--tab-bg:white] [--tab-border-color:black] `} aria-label="App">App</a>
                            <div role="tabpanel" className="tab-content bg-gray-200 border-base-300 rounded-box p-6">
                                <ErrorBoundary>
                                    <AddAppToRoleForm role_id={item?.id} />
                                </ErrorBoundary>
                            </div>
                                    
                    </div>  
                    </div>                             
                </div>
                              
            </Fragment>
        )
    }
    return ""
}   
    
export function SingleRolesSection( ){
        const myContainer=useStyle((state)=>state.styles.componentWorkingDiv)  
        const getSingleRole = useRoleStore((state)=>state.getSingleRole)
        const getRoleEndpoints = useRoleStore((state)=>state.getRoleEndpoints)
        const endpoints = useRoleStore((state)=>state.endpoints)
           

        const { id } = useParams()
        useEffect(()=>{
            getRoleEndpoints(id)
        },[])
        return(
            <Fragment>
              <div className={myContainer}>          
                <title>Role Details</title>
                <div className="bg-zinc-100 shadow-lg h-auto pb-5 w-full ">
                <div className="w-full flex items-stretch  justify-start h-auto  ">
                    <div className="flex flex-col space-y-2  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-0 pt-5 ">
                        <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0">
                            <div className="w-full h-full flex flex-row items-start justify-end">
                                
                                <div className="flex justify-center items-center w-8 h-8 rounded bg-slate-700">
                                    <button onClick={()=>getSingleRole(id)}>
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
                                <p>Name</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-4/12">
                            <p> Description</p>
                            </div>
                            <div className="flex justify-center items-center rounded-tr-lg bg-slate-700 w-3/12">
                            <p>Active</p>
                            </div>
                            
                        </div>
                        <ErrorBoundary>
                            <EditableSingleRoleComponent id={id} endpoints={endpoints}  />
                        </ErrorBoundary> 
                        </div>
                        <div className="mobile-block md:hidden w-full flex-auto px-4 lg:px-10 py-10 pt-0">            
                            <div className="w-full flex flex-col items-stretch h-auto space-y-1"> 
                                <ErrorBoundary>
                                    <EditableSingleRoleComponentMobile id={id}  endpoints={endpoints} />
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