import 'chart.js/auto';
import { data } from "../page/User"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RefreshIcon, TrashIcon, TrayDownIcon, TrayUpIcon} from "../components/Icons";
import { useEffect, Fragment, useState } from 'react';
import { useFeatureStore } from '../store/feature';
import { Pagination } from '../components/Pagination';
import { useParams } from "react-router-dom";
import { EndPointsDropDown } from './EndPoint';
import { NormalButton, TabNormalButton } from '../components/Button';
import { useStyle } from '../store/theme';
import { Pie ,Bar } from 'react-chartjs-2';
import { SelectInput } from "../components/Input"
import { useEndPointStore } from '../store/endpoint';

export function FeaturesDropDown({ label, value  ,name, handler}){
    const items = useFeatureStore((state)=>state.drop_features)
    const getItems = useFeatureStore((state)=>state.getDropFeatures)   
    
  
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

export function EditableGetFeatureComponent( {item, index} ){
       
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
                        <a  href={"/feature/"+item.id} className="bg-gray-300 w-11/12 h-full rounded-lg  font-bold  transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                            Detials 
                        </a>
                    </div>
                </div>
            </div>
        </div>
       
         
    </Fragment>
    )
}

export function EditableGetFeatureComponentMobile( {item, index} ){
   
    return (
        <Fragment key={'mobile-form-row'+index}>                   
           
            <div key={index+'-mobile'} className="w-full bg-slate-50 text-sm shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                    <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item.id} </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200">Name</div>
                    <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 p-1 break-all bg-gray-300">{item.name} </div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1 bg-gray-200 ">Description </div>
                    <div className="flex justify-center text-ellipsis text-nowrap overflow-hidden items-center w-8/12 break-all p-1 bg-gray-300 indent-3">{item.description}</div>
                </div>
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 p-1  bg-gray-200 ">Active </div>
                    <div className="flex justify-center items-center w-8/12 p-1 capitalize bg-gray-300 indent-3">{item.active.toString()}</div>
                </div> 
                
                
                <div className="w-full flex flex-row justify-center">
                <a  href={`/feature/${item.id}`}className="bg-gray-300 w-10/12 h-10 py-2  text-lg font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                Detials 
                </a>
                </div>                              
            </div>
                          
        </Fragment>
    )
}

export function FeaturePage(){ 
    const sizeDropDown= Array.from({length : 50},(_,i) => i+1)
    const get_features = useFeatureStore((state)=>state.getFeatures)
    const filter_value = useFeatureStore((state)=>state.filter)
    const setFiltervalue = useFeatureStore((state)=>state.setFilterValue)
    const renderData = useFeatureStore((state)=>state.filtered_features)
    //  pagination states


    const page = useFeatureStore((state)=>state.page)
    const pages = useFeatureStore((state)=>state.pages)
    const pageSize = useFeatureStore((state)=>state.size)
    const setPage = useFeatureStore((state)=>state.setPage)
    const setPageSize = useFeatureStore((state)=>state.setSize)
    const [sPage, setSpage]= useState(1)
    

    useEffect(()=>{
        get_features()
        
    },[])

    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        setFiltervalue(target.value)
    };

    return (
        <>

        <title>Features</title>
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
        <div className="w-full flex items-stretch  justify-start h-full">
                <div className="flex flex-col space-y-0  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0 pt-2">
                    <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0 pb-1">
                        <div className="w-full h-full flex flex-row items-stretch justify-end">
                            <div className="flex justify-center items-center w-10/12 sm:w-3/12 ">
                                <input value={filter_value}  onChange={handleInputChange} maxLength="50" className="rounded-lg w-9/12 text-black" placeholder="search text here .." name="search" type="search"/>
                            </div>
                            <div className="flex justify-center items-center w-10 h-full rounded bg-slate-700">
                                <button onClick={get_features}>
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
                                <EditableGetFeatureComponent  item={x} index={index} />
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
                                        <EditableGetFeatureComponentMobile item={x} index={index} />
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
    )
}

//  Single Feature Page Components Down from here
export function ActivateFeatureButton({ feature_id }){
    const activate = useFeatureStore((state)=>state.activateDeactivate)
    const activateFeature = () => { 
        activate(feature_id,true) 
    }    
    return (
        <div className="flex w-full sm:w-8/12 justify-center items-center" >
            <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-green-700" onClick={()=>activateFeature()} >
                Enable
            </button>
        </div>
        )  

}  

export function DeactivateFeatureButton({ feature_id }){
    const deactivate = useFeatureStore((state)=>state.activateDeactivate)
    const deactivateFeature = () => { 

        deactivate(feature_id,false)
    }    
   
        return (
            <div className="flex w-full sm:w-8/12 justify-center items-center" >
                <button className="bg-gray-400 w-10/12 h-10 text-xl font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-red-700" onClick={deactivateFeature} >
                Disable 
                </button>
            </div>
            )  
    

}

function DeleteFeatureEndpointButton({ feature_id , endpoint_id}){
    const deleteFeatureEndpoint = useEndPointStore((state)=>state.deleteEndPointFeature)
    const deleteItem = () => {
        deleteFeatureEndpoint(endpoint_id,feature_id)
      
    }    
    
    return (
        <button onClick={()=>deleteItem()} >
            <TrashIcon />
        </button>
        )
}

export function AddEndPointToFeatureForm( {feature_id } ){
    const addFeatureRole = useEndPointStore((state)=>state.addEndPointFeature)   
    const [value, setValue] = useState();
    const handleClick =()=>{
       
        if ( value != "select to add"){
            addFeatureRole(value,feature_id)
        }
    }
    const handleInputChange = (event) => {
        event.persist();
        const target=event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setValue(value);
      
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
                                    <EndPointsDropDown
                                    name="endpoint-dropdown" 
                                    label="Endpoint options"      
                                    value={value}  
                                    handler={handleInputChange.bind(this)}                                 
                                    />
                                </ErrorBoundary>
                                </div>                                 
                                <div className="flex flex-col md:flex-row space-x-2 w-full" > 
                                <div></div> 
                                <div className="w-full flex flex-row justify-end items-end">
                                    <NormalButton 
                                    label="Add Endpoint" 
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


export function EditableSingleFeatureComponent( {item} ){
    const [tabToken,setTabToken]=useState(1)
  
    if (item != null) {
    return (
    <Fragment key={'form-row'+item.id}>
        <div  className="w-full  text-lg flex flex-row space-x-1 items-stretch justify-center h-auto">
            <div className="flex bg-gray-50 w-1/12 justify-center items-center">
                <p>{item.id}</p>
            </div>
            <div className="flex justify-center items-center text-ellipsis text-nowrap break-all bg-gray-50 w-4/12 overflow-hidden">
                <p className="p-3 ">{item.name}</p>
            </div>
            <div className="flex justify-center items-center break-all bg-gray-50 w-4/12 text-ellipsis">
                <p> {item.description}</p>
            </div>
            <div className="flex justify-center capitalize items-center bg-gray-50 w-3/12 ">
                <p> {item.active.toString()}</p>
            </div>
        </div>
        <br/>
        <div className="w-full flex items-stretch justify-start h-full ">
            <div className="w-full tabs">
                <div className="tab-list flex flex-row p-1 bg-blue-100 flex-wrap space-x-1">
                    <div className="tab" onClick={()=>setTabToken(1)}>
                        <TabNormalButton index={1}  token={tabToken} label="Use Cases" />
                    </div>
                    <div className="tab" onClick={()=>setTabToken(2)}>
                        <TabNormalButton index={2} token={tabToken} label="End Points" />
                    </div>
                    <div className="tab" onClick={()=>setTabToken(3)} >
                        <TabNormalButton index={3} token={tabToken} label="Operations" />
                    </div>
                 
                </div>
                <div className={tabToken == 1 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                    <div className="flex w-full content-center items-center justify-center h-full  p-0">
                    <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                        <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Adding Roles To System Feature</div>
                                <p className="text-gray-700 text-base">
                                The Added Roles to Features refers to attaching privlege to a feature to provided access to endpoints 
                                that require the specified roles
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#addfeaturerole</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                            </div>
                        </div>
                        <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                        
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Resetting Feature Password </div>
                                <p className="text-gray-700 text-base">
                                Resets Password to "default@123" and forces feature to Change password when logging in.

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
                                <div className="font-bold text-xl mb-2">Disable Feature </div>
                                <p className="text-gray-700 text-base">
                                If feature Disabled value is "True"; it means feature will not be allowed to login.
                                
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
                                <div className="font-bold text-xl mb-2">Add Pages To Features </div>
                                <p className="text-gray-700 text-base">
                                As long as the attached Page is active;Feature will have Access to Operations.
                                In addtion the specified page will not be added to 
                                the feature if Feature does not have at least one role that is required by the Page
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
                                <div className="font-bold text-xl mb-2">Remove Pages From Features </div>
                                <p className="text-gray-700 text-base">
                                Revokes access to the specified page to Feature if removed.
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
                                                                                                          
                                 item?.endpoints?.map((endpoint,index)=>{
                                    return (
                                        <div key={index+endpoint?.name} className="flex w-2/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                            <div className="w-9/12 text-sm text-nowrap  overflow-hidden  text-ellipsis bg-slate-400 break-all p-1 flex items-center justify-center">
                                                <p className="text-ellipsis">{endpoint?.name}</p>
                                            </div>
                                            <div className="w-3/12 flex items-center justify-center bg-slate-300">
                                                <ErrorBoundary>
                                                <DeleteFeatureEndpointButton endpoint_id={endpoint.id} feature_id={item.id} />
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
                        <AddEndPointToFeatureForm feature_id={item.id} />
                        </ErrorBoundary>
                    
                </div>
                <div className={tabToken == 3 ? "tab-panel w-full flex flex-row flex-wrap items-stretch justify-start pt-5 pb-8" : "hidden"} >
                    
                    <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                        
                            <ErrorBoundary>
                                { item.active ?
                                <DeactivateFeatureButton feature_id={item.id} /> :
                                <ActivateFeatureButton  feature_id={item.id}/>

                                }
                            </ErrorBoundary>
                        </div>
                        
                    </div> 
                    <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                        
                            <ErrorBoundary>
                                { item.active ?
                                <DeactivateFeatureButton feature_id={item.id} /> :
                                <ActivateFeatureButton  feature_id={item.id}/>
                                }
                            </ErrorBoundary>
                        </div>
                        
                    </div>
                    <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                        
                            <ErrorBoundary>
                                { item.active ?
                                <DeactivateFeatureButton feature_id={item.id} /> :
                                <ActivateFeatureButton  feature_id={item.id}/>

                                }
                            </ErrorBoundary>
                        </div>
                        
                    </div>
                    <div className="flex w-4/12 flex-col items-center justify-center h-full ">
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                        
                            <ErrorBoundary>
                                { item.active ?
                                <DeactivateFeatureButton feature_id={item.id} /> :
                                <ActivateFeatureButton  feature_id={item.id}/>
                                }
                            </ErrorBoundary>
                        </div>
                        
                    </div>

                    
                               
                </div>    
                
            </div> 
        </div>
        
    </Fragment>
    )
    }
    return ""
}

export function EditableSingleFeatureComponentMobile({item}){
    const [tabToken,setTabToken]=useState(1) 
     
    const [view,setView]=useState(false)
  
    if (item != null){

       return (
        <Fragment key={'mobile-form-row'+item.id}>                   
            {/* # */}
            <div key={item.id+'-mobile'} className="w-full bg-slate-50 shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
                <div className="w-full flex flex-row justify-center">
                    <div className="flex justify-center items-center w-4/12 bg-gray-200 p-1">ID </div>
                    <div className="flex justify-center items-center w-8/12 p-1 bg-gray-300">{item.id} </div>
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
               
                <div className="w-full flex flex-row h-10 justify-center" >
                    <button onClick={()=>setView(!view)}>
                    { view ? <TrayUpIcon /> : <TrayDownIcon /> }
                    </button>
                </div> 
            
                <div className={ view ? "w-full flex flex-row justify-center" : "hidden" }>
                <div className="w-full tabs">
                <div className="tab-list flex flex-row bg-b p-1 flex-wrap space-x-1">
                    <div className="tab" onClick={()=>setTabToken(1)}>
                        <TabNormalButton index={1}  token={tabToken} label="Use Cases" />
                    </div>
                    <div className="tab" onClick={()=>setTabToken(2)}>
                        <TabNormalButton index={2} token={tabToken} label="End Points" />
                    </div>
                    <div className="tab" onClick={()=>setTabToken(3)} >
                        <TabNormalButton index={3} token={tabToken} label="Operations" />
                    </div>
                 
                </div>
                <div className={tabToken == 1 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
                <div className="flex w-full content-center items-center justify-center h-full  p-0">
                    <div className="flex flex-row flex-wrap m-1 items-stretch justify-start min-w-0 break-words w-full border-0 p-2">    
                        <div className="max-w-sm rounded m-1 overflow-hidden  bg-blue-100 shadow-lg">   
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Adding Roles To System Feature</div>
                                <p className="text-gray-700 text-base">
                                The Added Roles to Features refers to attaching privlege to a feature to provided access to endpoints 
                                that require the specified roles
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#addfeaturerole</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#access</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#systemdesign</span>
                            </div>
                        </div>
                        <div className="max-w-sm rounded m-1 overflow-hidden bg-blue-100 shadow-lg">
                        
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">Resetting Feature Password </div>
                                <p className="text-gray-700 text-base">
                                Resets Password to "default@123" and forces feature to Change password when logging in.

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
                                <div className="font-bold text-xl mb-2">Disable Feature </div>
                                <p className="text-gray-700 text-base">
                                If feature Disabled value is "True"; it means feature will not be allowed to login.
                                
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
                    <div  className="w-full bg-gray-50 text-lg flex flex-row flex-wrap items-stretch justify-start h-auto">
                            {
                            item?.endpoints?.map((endpoint,index)=>{
                                return (
                                    <div key={index+endpoint.name} className="flex w-6/12 p-1 break-all bg-slate-50 rounded-tl-lg flex-row justify-start items-stretch" >
                                        <div className="w-9/12 bg-slate-400 break-all p-1 flex items-center justify-center">
                                            <p>{endpoint.name}</p>
                                        </div>
                                        <div className="w-3/12 flex items-center justify-center bg-slate-300">
                                            <ErrorBoundary>
                                                <DeleteFeatureEndpointButton endpoint_id={endpoint.id} feature_id={item.id} />
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
                    <AddEndPointToFeatureForm feature_id={item.id} />
                    </ErrorBoundary>
                </div>
                <div className={tabToken == 3 ? "tab-panel w-full pt-5 pb-8" : "hidden"} >
               
                    <div className="flex w-10/12 flex-col items-center justify-center h-full ">
                        <div className="flex flex-row flex-wrap mx-5  items-center space-x-2 space-y-2 justify-center min-w-0 break-words w-full rounded-lg border-0 pb-2">    
                        
                            <ErrorBoundary>
                                { item.active ?
                                <DeactivateFeatureButton feature_id={item.id} /> :
                                <ActivateFeatureButton  feature_id={item.id}/>

                                }
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
return ""
}


export function SingleFeaturesSection( ){
    const myContainer=useStyle((state)=>state.styles.componentWorkingDiv)  
    const getSingleFeature = useFeatureStore((state)=>state.getSingleFeature)
    const item = useFeatureStore((state)=>state.feature)
    const { id } = useParams()
    useEffect(()=>{
        getSingleFeature(id)
    },[])
    return(
        <Fragment>
          <div className={myContainer}>          
            <title>Feature Details</title>
            <div className="bg-zinc-100 shadow-lg h-auto pb-5 w-full ">
            <div className="w-full flex items-stretch  justify-start h-auto  ">
                <div className="flex flex-col space-y-2  items-center justify-start min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-0 pt-5 ">
                    <div className="search bar w-full  text-white text-lg flex flex-row space-x-1 items-stretch justify-center h-auto px-4 lg:px-8 py-8 pt-0">
                        <div className="w-full h-full flex flex-row items-start justify-end">
                            
                            <div className="flex justify-center items-center w-8 h-8 rounded bg-slate-700">
                                <button onClick={()=>getSingleFeature(id)}>
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
                        <EditableSingleFeatureComponent id={id} item={item}  />
                    </ErrorBoundary> 
                    </div>
                    <div className="mobile-block md:hidden w-full flex-auto px-4 lg:px-10 py-10 pt-0">            
                        <div className="w-full flex flex-col items-stretch h-auto space-y-1"> 
                            <ErrorBoundary>
                                <EditableSingleFeatureComponentMobile id={id}  item={item}/>
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