
export function Pagination ({ page , pageSize, setPage, setPageSize, maxPage, sPage, setSpage, options}){
    const handleSelect=(event)=>{
        const value = event.target.value
        setPageSize(value)
        setPage(1)
        setSpage(1)
    }

    const handlePagnin=(x)=>{
        if( (sPage+x) <= 0 ){
            setSpage(1)
            setPage(1)
        }else if((setSpage+x) >= maxPage)
        {
            setSpage(maxPage-2)
        }else{
            let edited=sPage+x 
            setSpage(edited)
            if(x < 0){
                setPage(edited+2)
            }else{
                setPage(edited)
            }
        }
    }
    const handleFirst = ()=>{
        setSpage(1)
        setPage(1)
    }
    const handleLast = (x)=>{
        setSpage(maxPage-2)
        setPage(maxPage-2)
    }
    return(
        <div className="w-full h-full flex flex-col  md:flex-row p-2 md:p-0 md:space-x-3 items-stretch justify-start">
                <div className="bg-gray-400 md:rounded  flex justify-start items-center text-black p-1 md:p-2">

                    <select value={pageSize} className="rounded uppercase text-gray-600 text-sm font-bold " onChange={handleSelect}>
                        {
                                options.map((value)=>{
            
                                        return(
                                            <option key={value} value={value} >{value}</option>
        
                                        )
                                    
                                })   
                            } 
                            
                    </select>
                </div>            
                <div className="flex flex-row justify-start items-stretch w-auto h-full bg-gray-400 md:rounded p-1 md:p-2">
                    { (sPage == 1 ) ?
                                "" 
                                :
                            <>
                            <div className="flex items-stretch pl-1 pr-1 justify-center w-14 text-black" onClick={handleFirst} >
                            <div className="w-full bg-gray-100 flex items-center justify-center">
                            <p >First</p>
                            </div>
                            </div>
                            <div className="flex items-stretch pr-1 justify-center w-20 text-black" onClick={()=>handlePagnin(-2)} >
                            <div className="w-full bg-gray-100 flex items-center justify-center">
                            <p >... Prev</p>
                            </div>
                            </div>
                            </>    
                                                
                        
                    }
                    <div className="flex items-stretch pr-1 justify-center w-10 text-black">
                        <div className={ sPage == page ? "w-full flex items-center justify-center bg-lime-200" : "w-full bg-gray-100 flex items-center justify-center" } onClick={()=>setPage(sPage)}>
                            <p >{sPage}</p>
                        </div>
                    </div>
                    {   maxPage < sPage+1 ?
                            ""
                            :                   
                        <div  className="flex items-stretch pr-1 justify-center w-10 text-black"  >
                        <div className={ sPage+1 == page ? "w-full flex items-center justify-center bg-lime-200" : "w-full bg-gray-100 flex items-center justify-center"  } onClick={()=>setPage(sPage+1)}>
                            <p >{sPage+1}</p>
                        </div>
                    </div>
                    }
                    {   maxPage < sPage+2 ?
                        "" 
                        :
                    <div className="flex items-stretch pr-1 justify-center w-10 text-black">
                        <div className={ sPage+2 == page ? "w-full flex items-center justify-center bg-lime-200" : "w-full bg-gray-100 flex items-center justify-center" } onClick={()=>setPage(sPage+2)}>
                            <p >{sPage+2}</p>
                        </div>
                    </div>
                    }
                    { (maxPage < sPage+2 ) ?
                        ""
                        :
                        <>
                            <div className="flex items-stretch pr-1 justify-center w-20 text-black" onClick={()=>handlePagnin(2)}>
                            <div className="w-full bg-gray-100 flex items-center justify-center">
                            <p >... Next</p>
                            </div>
                            </div>
                            <div className="flex items-stretch pr-1 justify-center w-14 text-black" onClick={handleLast}>
                            <div className="w-full bg-gray-100 flex items-center justify-center">
                            <p >Last</p>
                            </div>
                            </div>
                        </>
                        
                        
                    
                    }
                </div>
            </div>
    )
}