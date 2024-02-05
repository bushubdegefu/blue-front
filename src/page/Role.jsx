import { SelectInput, ReadOnlySingleInputNoLabel,SingleInputNoLabel,TextInputNoLabel,SingleInput } from "../components/Input"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RefreshIcon, TrashIcon, TrayDownIcon, TrayUpIcon, EditIcon, CancelIcon,UpdateIcon } from "../components/Icons";
import { useEffect, Fragment, useState } from 'react';
import { useRoleStore } from '../store/role';
import { Pagination } from '../components/Pagination';
import { useParams } from "react-router-dom";
import { data } from './User';
import { NormalButton, TabNormalButton } from '../components/Button';
import { useStyle } from '../store/theme';
import 'chart.js/auto';
import { Pie ,Bar } from 'react-chartjs-2';
import { useFeatureStore } from "../store/feature";
import { FeaturesDropDown } from "./Feature";

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
            description : '',
        });
    
        const handleClick =()=>{
            // console.log(values)
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
        //  tailwind styling
        const myContainer=useStyle((state)=>state.styles.componentWorkingDiv) 
        //  pagination dropdown options
        const sizeDropDown= Array.from({length : 50},(_,i) => i+1)
        
        // states from zustand store
        const get_pages = useRoleStore((state)=>state.getRoles)
        const filter_value = useRoleStore((state)=>state.filter)
        const setFiltervalue = useRoleStore((state)=>state.setFilterValue)
        const renderData = useRoleStore((state)=>state.filtered_roles)
        
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
    
        return (
            <div className={myContainer}>
    
            <title>Roles</title>
            <ErrorBoundary>
            <div className="w-full  h-96 flex flex-col overflow-y-scroll scrollbar-none md:flex-row items-stretch justify-start py-5 my-2 bg-slate-100 shadow-xl overflow-x-hidden">
                <div className=' flex w-full md:w-6/12  h-full items-center justify-center'>
               
                <Pie data={data} height="65%" options={{ maintainAspectRatio: false }}/>
                </div>
                <div className='flex w-full md:w-6/12  h-full items-center justify-center'>
                <Bar data={data} height="70%" options={{ maintainAspectRatio: false }} />
                </div>
            </div>
            </ErrorBoundary>
            <ErrorBoundary>
            <div className="bg-zinc-100 h-auto  shadow-lg w-full text-sm">
                <AddRolesForm />
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
                                <p> Description</p>
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
               <div className="flex w-full content-center items-center justify-center h-full ">
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
        const [tabToken,setTabToken]=useState(1)
        const item = useRoleStore((state)=>state.role)
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
        // firstInit()
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
                    <div  className="w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto">
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
            <div className="w-full flex items-stretch justify-start h-full ">
                <div className="w-full tabs">
                    <div className="tab-list flex flex-row p-1 bg-blue-100 flex-wrap space-x-1">
                        <div className="tab" onClick={()=>setTabToken(1)}>
                            <TabNormalButton index={1}  token={tabToken} label="Use Cases" />
                        </div>
                        <div className="tab" onClick={()=>setTabToken(2)}>
                            <TabNormalButton index={2} token={tabToken} label="Features" />
                        </div>
                        <div className="tab" onClick={()=>setTabToken(3)} >
                            <TabNormalButton index={3} token={tabToken} label="Operations" />
                        </div> 
                        <div className="tab" onClick={()=>setTabToken(4)} >
                            <TabNormalButton index={4} token={tabToken} label="Endpoints" />
                        </div>   
                </div>
                    <div className={tabToken == 1 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                        <div className="flex w-full content-center items-center justify-center h-full  p-0">
                        <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                            <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Adding Roles To System Role</div>
                                    <p className="text-gray-700 text-base">
                                    The Added Roles to Roles refers to attaching privlege to a page to provided access to endpoints 
                                    that require the specified roles
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#addpagerole</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                                </div>
                            </div>
                            <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                            
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Resetting Role Password </div>
                                    <p className="text-gray-700 text-base">
                                    Resets Password to "default@123" and forces page to Change password when logging in.
    
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
                                    <div className="font-bold text-xl mb-2">Disable Role </div>
                                    <p className="text-gray-700 text-base">
                                    If page Disabled value is "True"; it means page will not be allowed to login.
                                    
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
                                    <div className="font-bold text-xl mb-2">Add Pages To Roles </div>
                                    <p className="text-gray-700 text-base">
                                    As long as the attached Page is active;Role will have Access to Operations.
                                    In addtion the specified page will not be added to 
                                    the page if Role does not have at least one role that is required by the Page
                                    for access.
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
                                    <div className="font-bold text-xl mb-2">Remove Pages From Roles </div>
                                    <p className="text-gray-700 text-base">
                                    Revokes access to the specified page to Role if removed.
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
                    <div className={tabToken == 2 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                        <ErrorBoundary>
                        <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                <div></div>
                                {
                                
                                                                          
                                 item?.features?.map((feature,index)=>{
                                    return (
                                        <div key={index+feature?.name} className="flex w-4/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                            <div className="w-10/12 text-sm text-nowrap  overflow-hidden  text-ellipsis bg-slate-400 break-all p-1 flex items-center justify-center">
                                                <p className="text-ellipsis">{feature?.name}</p>
                                            </div>
                                            <div className="w-2/12 flex items-center justify-center bg-slate-300">
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
                    <div className={tabToken == 3 ? "tab-panel w-full flex flex-row flex-wrap items-stretch justify-start pt-5 pb-8" : "hidden"} >
                        
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
                        <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                            <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                            
                                <ErrorBoundary>
                                    { item.active ?
                                    <DeactivateRoleButton role_id={item?.id} />: 
                                    <ActivateRoleButton  role_id={item?.id}/>
    
                                    }
                                </ErrorBoundary>
                            </div>
                            
                        </div>
                        <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                            <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                            
                                <ErrorBoundary>
                                    { item.active ?
                                    <DeactivateRoleButton role_id={item?.id} />:
                                    <ActivateRoleButton  role_id={item?.id}/>
    
                                    }
                                </ErrorBoundary>
                            </div>
                            
                        </div>
    
                        
                                   
                    </div> 
                    <div className={tabToken == 4 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                    <ErrorBoundary>
                        <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                <div></div>
                                {                                                                        
                                 endpoints?.map((endpoint,index)=>{
                                    return (
                                        <div key={index+endpoint?.name} className="flex w-3/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                            <div className="w-full text-sm text-nowrap  overflow-hidden  text-ellipsis bg-slate-400 break-all p-1 flex items-center justify-center">
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
                    
                </div> 
            </div>
            
        </Fragment>
        )
        }
        return ""
    }
    
export function EditableSingleRoleComponentMobile({id, endpoints}){
        const [tabToken,setTabToken]=useState(1) 
        const item = useRoleStore((state)=>state.role)
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
                   <div className={ edit ? "hidden":"w-full flex flex-row h-10 justify-center"} >
                        <button onClick={editing} >
                            <EditIcon />
                        </button> 
                    </div>
                    <div className="w-full flex flex-row h-10 justify-center" >
                        <button onClick={()=>setView(!view)}>
                        { view ? <TrayUpIcon /> : <TrayDownIcon /> }
                        </button>
                    </div>
        
                    {/* <div className="flex justify-center items-center w-1/2 p-1 bg-gray-100 ">
                        
                    </div>  */}
                
                    <div className={ view ? "w-full flex flex-row justify-center" : "hidden" }>
                    <div className="w-full tabs">
                    <div className="tab-list text-sm flex flex-row bg-b flex-wrap break-all justify-start p-1 items-stretch space-x-1">
                        <div></div>
                        <div className="tab" onClick={()=>setTabToken(1)}>
                            <TabNormalButton index={1}  token={tabToken} label="Use Cases" />
                        </div>
                        <div className="tab" onClick={()=>setTabToken(2)}>
                            <TabNormalButton index={2} token={tabToken} label="Features" />
                        </div>
                        <div className="tab" onClick={()=>setTabToken(3)} >
                            <TabNormalButton index={3} token={tabToken} label="Operations" />
                        </div>
                        <div className="tab" onClick={()=>setTabToken(4)} >
                            <TabNormalButton index={4} token={tabToken} label="Endpoints" />
                        </div>
                     
                    </div>
                    <div className={tabToken == 1 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                    <div className="flex w-full content-center items-center justify-center h-full  p-0">
                        <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                            <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Adding Roles To System Role</div>
                                    <p className="text-gray-700 text-base">
                                    The Added Roles to Roles refers to attaching privlege to a page to provided access to endpoints 
                                    that require the specified roles
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#addpagerole</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                                </div>
                            </div>
                            <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                            
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">Resetting Role Password </div>
                                    <p className="text-gray-700 text-base">
                                    Resets Password to "default@123" and forces page to Change password when logging in.
    
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
                                    <div className="font-bold text-xl mb-2">Disable Role </div>
                                    <p className="text-gray-700 text-base">
                                    If page Disabled value is "True"; it means page will not be allowed to login.
                                    
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
                    <div className={tabToken == 2 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                        <ErrorBoundary>
                        <div  className="w-full bg-gray-50 text-sm flex flex-row flex-wrap items-stretch justify-start h-auto">
                                {
                                item?.features?.map((feature,index)=>{
                                    return (
                                        <div key={index+feature?.name} className="flex w-6/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                            <div className="w-9/12 bg-slate-400 break-all p-1 flex overflow-hidden text-nowrap text-ellipsis items-center justify-center">
                                                <p>{feature?.name}</p>
                                            </div>
                                            <div className="w-3/12 flex items-center justify-center bg-slate-300">
                                                <ErrorBoundary>
                                                    <DeleteRoleFeatureButton feature={feature.id} role_id={item.id} />
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
                    <div className={tabToken == 3 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                   
                        <div className="flex w-10/12 flex-col items-center justify-center h-full ">
                            <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                            
                                <ErrorBoundary>
                                    { item?.active ?
                                    <DeactivateRoleButton role_id={item.id} /> :
                                    <ActivateRoleButton  role_id={item.id}/>
    
                                    }
                                </ErrorBoundary>
                            </div>
                        </div>            
                    </div>    
                    <div className={tabToken == 4 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                    <ErrorBoundary>
                        <div  className="w-full  bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                                <div></div>
                                {                                                                        
                                 endpoints?.map((endpoint,index)=>{
                                    return (
                                        <div key={index+endpoint?.name} className="flex w-3/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                            <div className="w-full text-sm text-nowrap  overflow-hidden  text-ellipsis bg-slate-400 break-all p-1 flex items-center justify-center">
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