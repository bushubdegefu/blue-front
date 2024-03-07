import 'chart.js/auto';
import { data } from "../page/User"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RefreshIcon, TrashIcon, EditIcon, UpdateIcon, CancelIcon} from "../components/Icons";
import { useEffect, Fragment, useState } from 'react';
import { useEndPointStore } from '../store/endpoint';
import { Pagination } from '../components/Pagination';
import { NormalButton } from '../components/Button';
import { Pie ,Bar } from 'react-chartjs-2';
import { SelectInput, SingleInput,ReadOnlySingleInputNoLabel,SingleInputNoLabel } from "../components/Input"
import useCheckPage from '../uitls/check_page';
import useCheckFeatures from '../uitls/check_features';

export function EndPointsDropDown({ label, value  ,name, handler}){
    const items = useEndPointStore((state)=>state.drop_endpoints)
    const getItems = useEndPointStore((state)=>state.getDropEndPoints)   
     
    useEffect(()=>{
        getItems()
    },[])
    
    if (items.length > 0){
        
        return(       
        <>
        <SelectInput data={items} name={name} value={value} handler={handler} label={label} />             
        </>
         )
         
        }
    return ""
}

export function AddEndpointForm(){
    const post = useEndPointStore((state)=>state.postEndpoint)
    const [values, setValues] = useState({
        name: '',
        description : '',
        route_path: ''
    });

    const handleClick =()=>{
        // console.log(values)
        post(values)
        setValues((values) => ({
            ...values,
            name: '',
            description : '',
            route_path: ''
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
                                label="Endpoint Name"  
                                inputType="text" 
                                placeHolder="Get Users" 
                                value={values.name} 
                                handler={handleInputChange.bind(this)}  />
                                <SingleInput 
                                name="description" 
                                label="Description"  
                                inputType="text" 
                                placeHolder="Description of this Feature" 
                                value={values.description} 
                                handler={handleInputChange.bind(this)} />
                                <SingleInput
                                value={values.route_path} 
                                label="Enpoint"
                                name="route_path"
                                handler={handleInputChange.bind(this)}
                                />
                                </div>                                 
                                <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                <div></div> 
                                <div className="w-full flex flex-col items-end">
                                    <div className="w-full sm:w-3/12">
                                    <NormalButton 
                                    label="Add" 
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

export function EditableGetEndPointComponent( {item, index} ){
    
    const [edit,setEdit]=useState(false)
    const patch = useEndPointStore((state)=>state.patchEndpoint)
    const deleteEnd = useEndPointStore((state)=>state.deleteEndpoint)
    const feature_check = useCheckFeatures("features_write")
    const [values, setValues] = useState({
        id: '',
        name: '',
        description : '',
        route_path: ''
    });

    const editing=()=>{
        setEdit(!edit)
        setValues((values) => ({
            ...values,
            id : item?.id,
            name: item?.name,
            description: item?.description,
            route_path : item.route_path ? item?.route_path : ""
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

    return (
        <Fragment key={'form-row'+index}>

            <div  className={edit ? "hidden" :"w-full  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto"}>
                <div className="flex bg-gray-50 w-1/12 rounded-tl-lg justify-center items-center">
                    <p>{item?.id}</p>
                </div>
                <div className="flex justify-center text-ellipsis text-nowrap items-center break-all bg-gray-50 w-3/12">
                    <p className="p-3  text-ellipsis ">{item?.name}</p>
                </div>
                <div className="flex justify-center items-center break-all text-nowrap bg-gray-50 w-3/12 text-ellipsis">
                    <p> {item?.description}</p>
                </div>
                <div className="flex justify-center items-center break-all text-nowrap bg-gray-50 w-3/12 text-ellipsis o">
                    <p> {item?.route_path}</p>
                </div>
                <div className={`flex capitalize justify-stretch items-stretch bg-gray-50 w-2/12`}>
                    <div  className="w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto">
                        <div className={`w-full ${feature_check ? "": "hidden" }  flex justify-center items-center`}>
                            <button onClick={editing}>
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                    <div  className="w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto">
                        <div className={`w-full flex justify-center items-center ${feature_check ? "": "hidden" }` }>
                            <button onClick={()=>deleteEnd(item?.id)}>
                                <TrashIcon />
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
                            label="Endpoint ID"  
                            inputType="text" 
                            placeHolder="Admin" 
                            value={values.id} 
                                />
                    </div>
                    <div className="flex justify-center items-center text-ellipsis text-nowrap break-all bg-gray-50 w-3/12 overflow-hidden">
                        <SingleInputNoLabel 
                            name="name" 
                            label="Name"  
                            inputType="text" 
                            placeHolder="Name of the Endpoint" 
                            value={values?.name} 
                            handler={handleInputChange.bind(this)}  />
                    </div>
                    <div className="flex justify-center items-center break-all bg-gray-50 w-3/12 text-ellipsis">
                        <SingleInputNoLabel 
                            name="description" 
                            label="Description"  
                            inputType="text" 
                            placeHolder="What the Call to the  Endpoint Does" 
                            value={values?.description} 
                            handler={handleInputChange.bind(this)} />
                    </div>
                    <div className="flex justify-center items-center break-all bg-gray-50 w-3/12 text-ellipsis">
                        <SingleInputNoLabel 
                            name="route_path" 
                            label="Route Path"  
                            inputType="text" 
                            placeHolder="Endpoint Address to Call upon" 
                            value={values?.route_path} 
                            handler={handleInputChange.bind(this)} />
                    </div>
                    <div className="flex justify-center items-center break-all bg-gray-50 w-2/12 text-ellipsis">
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
        
            
        </Fragment>
    )
}

export function EditableGetEndPointComponentMobile( {item, index} ){
    const [edit,setEdit]=useState(false)
    const patch = useEndPointStore((state)=>state.patchEndpoint)
    const deleteEnd = useEndPointStore((state)=>state.deleteEndpoint)
    const feature_check = useCheckFeatures("features_write")
    const [values, setValues] = useState({
        id: '',
        name: '',
        description : '',
        route_path: ''
    });

    const editing=()=>{
        setEdit(!edit)
        setValues((values) => ({
            ...values,
            id : item?.id,
            name: item?.name,
            description: item?.description,
            route_path : item.route_path ? item?.route_path : ""
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
    return (
        <Fragment key={'mobile-form-row'+index}>                   
            <div key={index+'-mobile'} className={edit ? "hidden":"w-full bg-slate-50 text-sm shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center"} >
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                    <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item?.id} </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">Name</div>
                    <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 p-1 break-all bg-gray-300">{item?.name} </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Description </div>
                    <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 break-all p-1 bg-gray-300 indent-3">{item?.description}</div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">Path </div>
                    <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{item?.route_path}</div>
                </div> 
                
                <div className={ edit ? "hidden":`w-full space-x-2 flex flex-row h-10 justify-center ${feature_check ? "": "hidden" } items-center`} >
                        <div className='flex w-5/12 h-full rounded-2xl justify-center items-center bg-slate-200'>
                            <button  onClick={editing} >
                                <EditIcon />
                            </button>
                        </div>
                        <div className='flex w-5/12 h-full rounded-2xl justify-center items-center bg-slate-200'>
                            <button  onClick={()=>deleteEnd(item?.id)}>
                                <TrashIcon />
                            </button> 
                        </div>
                </div>                              
            </div>

            <ErrorBoundary>
            <div key={item?.id+'-mobile-form'} className={edit ? "w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" : "hidden"}>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300"> 
                            <ReadOnlySingleInputNoLabel 
                                name="id" 
                                label="Endpoint ID"  
                                inputType="text" 
                                placeHolder="Admin" 
                                value={values.id} 
                                    /> 
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">Name</div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <SingleInputNoLabel 
                                name="name" 
                                label="Enpoint Name"  
                                inputType="text" 
                                placeHolder="User Identifier" 
                                value={values?.name} 
                                handler={handleInputChange.bind(this)}  />
                            </div>
                        </div>
                        <div className="w-full flex flex-row  justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Description </div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <SingleInputNoLabel 
                                name="description" 
                                label="Description"  
                                inputType="text" 
                                placeHolder="Description of Endpoint Address" 
                                value={values?.description} 
                                handler={handleInputChange.bind(this)} />
                            </div>
                        </div>
                        <div className="w-full flex flex-row  justify-center">
                            <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Endpoint(Path)</div>
                            <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">
                            <SingleInputNoLabel 
                                name="route_path" 
                                label="Route Path"  
                                inputType="text" 
                                placeHolder="Description of Endpoint Address" 
                                value={values?.route_path} 
                                handler={handleInputChange.bind(this)} />
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
            </ErrorBoundary>
                          
        </Fragment>
    )
}

export function EndPointPage(){ 
    const sizeDropDown= Array.from({length : 50},(_,i) => i+1)
    const get_endpoints = useEndPointStore((state)=>state.getEndPoints)
    const filter_value = useEndPointStore((state)=>state.filter)
    const setFiltervalue = useEndPointStore((state)=>state.setFilterValue)
    const renderData = useEndPointStore((state)=>state.filtered_endpoints)
    //  pagination states

    const page_check = useCheckPage("Endpoint")
    const feature_check = useCheckFeatures("features_write")

    const page = useEndPointStore((state)=>state.page)
    const pages = useEndPointStore((state)=>state.pages)
    const pageSize = useEndPointStore((state)=>state.size)
    const setPage = useEndPointStore((state)=>state.setPage)
    const setPageSize = useEndPointStore((state)=>state.setSize)
    const [sPage, setSpage]= useState(1)
    

    useEffect(()=>{
        get_endpoints()
        
    },[])

    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        setFiltervalue(target.value)
    };

    return ( page_check ?
        <>

        <title>EndPoints</title>
        <ErrorBoundary>
        <div className="w-full  h-72 flex flex-col overflow-y-scroll scrollbar-none md:flex-row items-stretch justify-start py-5 my-2 bg-slate-100 shadow-xl overflow-x-hidden">
            <div className=' flex w-full md:w-6/12  h-full items-center justify-center'>
           
            <Pie data={data} height="65%" options={{ maintainAspectRatio: false }}/>
            </div>
            <div className='flex w-full md:w-6/12  h-full items-center justify-center'>
            <Bar data={data} height="70%" options={{ maintainAspectRatio: false }} />
            </div>
        </div>
        </ErrorBoundary>
        <ErrorBoundary>
        <div className={ `${feature_check ? "": "hidden" } bg-zinc-100 h-auto  shadow-lg w-full text-sm py-2`}>
                <AddEndpointForm />
            </div>
        </ErrorBoundary>
        <ErrorBoundary>
        <div className="w-full flex shadow-xl border-t-2 rounded-xl border-gray-700 items-stretch  justify-start h-full">
                <div className="flex flex-col space-y-0  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0 pt-2">
                    <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0 pb-1">
                        <div className="w-full h-full flex flex-row items-stretch justify-end">
                            <div className="flex justify-center items-center w-10/12 sm:w-3/12 ">
                                <input value={filter_value}  onChange={handleInputChange} maxLength="50" className="rounded-lg w-9/12 text-black" placeholder="search text here .." name="search" type="search"/>
                            </div>
                            <div className="flex justify-center items-center w-10 h-full rounded bg-slate-700">
                                <button onClick={get_endpoints}>
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
                            <div className="flex justify-center items-center bg-slate-700 w-3/12">
                                <p>Name</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-3/12">
                            <p>Description</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-3/12">
                            <p>Path(Endpoint)</p>
                            </div>
                            <div className="flex justify-center items-center bg-slate-700 w-2/12 rounded-tr-lg">
                            <p>Actions</p>
                            </div>
                    </div>
                              
                    <ErrorBoundary>
                    {
                        renderData?.map((x,index) =>{
                            return(
                                <Fragment key={"editable"+index} >
                                <EditableGetEndPointComponent  item={x} index={index} />
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
                                        <EditableGetEndPointComponentMobile item={x} index={index} />
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
        </>
        :
        ""
    )
}