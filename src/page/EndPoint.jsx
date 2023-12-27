import 'chart.js/auto';
import { data } from "../page/User"
import { ErrorBoundary } from '../components/ErrorBoundary'
import { RefreshIcon, TrashIcon, TrayDownIcon, TrayUpIcon} from "../components/Icons";
import { useEffect, Fragment, useState } from 'react';
import { useEndPointStore } from '../store/endpoint';
import { Pagination } from '../components/Pagination';
import { useParams } from "react-router-dom";
import { RolesDropDown } from './Role';
import { NormalButton, TabNormalButton } from '../components/Button';
import { useStyle } from '../store/theme';
import { Pie ,Bar } from 'react-chartjs-2';
import { SelectInput } from "../components/Input"

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

export function EditableGetEndPointComponent( {item, index} ){
       
    return (
    <Fragment key={'form-row'+index}>
        <div  className="w-full  text-sm flex flex-row space-x-1 items-stretch justify-center h-auto">
            <div className="flex bg-gray-50 w-1/12 rounded-tl-lg justify-center items-center">
                <p>{item?.id}</p>
            </div>
            <div className="flex justify-center text-ellipsis text-nowrap items-center break-all bg-gray-50 w-4/12">
                <p className="p-3  text-ellipsis ">{item?.name}</p>
            </div>
            <div className="flex justify-center items-center break-alltext-nowrap bg-gray-50 w-4/12 text-ellipsis">
                <p> {item?.description}</p>
            </div>
            <div className="flex capitalize justify-stretch items-stretch bg-gray-50 w-3/12 ">
                <div  className="w-8/12  flex flex-row space-x-1 my-auto items-stretch justify-center h-auto">
                    <p> {item?.route_path}</p>
                </div>
                <div  className="w-5/12  text-lg flex flex-row space-x-1 items-stretch my-auto justify-center h-auto">
                    <div className="w-full flex justify-center items-center">
                        <a  href={"/endpoint/"+item.id} className="bg-gray-300 w-11/12 h-full rounded-lg  font-bold  transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                            Detials 
                        </a>
                    </div>
                </div>
            </div>
        </div>
       
         
    </Fragment>
    )
}

export function EditableGetEndPointComponentMobile( {item, index} ){
   
    return (
        <Fragment key={'mobile-form-row'+index}>                   
           
            <div key={index+'-mobile'} className="w-full bg-slate-50 text-sm shadow-xl rounded-xl p-2 flex space-y-1 flex-col items-stretch justify-center" >
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
                
                
                <div className="w-full flex flex-row justify-center">
                <a  href={`/endpoint/${item.id}`}className="bg-gray-300 w-10/12 h-10 py-2  text-lg font-bold rounded-lg transition ease-in-out duration-75 hover:-translate-y-1 hover:scale-110 text-black text-center" >
                Detials 
                </a>
                </div>                              
            </div>
                          
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

    return (
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
        <div className="w-full flex items-stretch  justify-start h-full">
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
    )
}