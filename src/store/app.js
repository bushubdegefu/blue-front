
import { blueClient } from './client'
import { create } from 'zustand'
import toast from 'react-hot-toast'
import { useLogInStore } from './login'
import { useFeatureStore } from './feature'

export const useAppStore = create(
   
        (set,get) => ({
        app : null,
        apps : [],
        app_matrix:[],
        drop_apps:[],
        filter: "",
        total:0,
        pages:1,
        page:1,
        size:15,
        filtered_apps: [],
        getApps: async () => {
         let token = useLogInStore.getState().access_token;
         await   blueClient.request({
                method: 'GET',
                url: `/apps?page=${get().page}&size=${get().size}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : token
                },
            }).then(function (response) {               
                set((state) => ({ 
                    ...state,
                    apps: response?.data?.data,
                    filtered_apps : response?.data?.data,
                    total:response?.data?.total,
                    pages: response?.data?.pages
                }))
                  
                  
                }).catch((response,error)=> {
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        },
        getDropApps: async () => {
            let token = useLogInStore.getState().access_token;

            await   blueClient.request({
                   method: 'GET',
                   url: `/appsdrop`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) { 

                   set((state) => ({ 
                       ...state,
                       drop_apps: response?.data?.data,
                       
                   }))
                     
                     
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getSingleApp: async (id) => {
            let token = useLogInStore.getState().access_token;
            
            await   blueClient.request({
                   method: 'GET',
                   url: `/apps/${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       app: response?.data?.data,
                       
                   }))
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getAppMatrix: async (app_id) => {
            let token = useLogInStore.getState().access_token;
            
            await   blueClient.request({
                   method: 'GET',
                   url: `/appsmatrix/${app_id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  
                    set((state) => ({ 
                        ...state,
                        app_matrix: response?.data?.data
                    }))

                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        setFilterValue: (value)=> {
            set((state) => ({ 
                ...state,
                filter:value
            }))
            get().filterApp()
        }, 
        setPage: (value)=> {
            set((state) => ({ 
                ...state,
                page: value
            }))
            get().getApps()
        },
        setSize: (value)=> {
            let mod_size = value > 50 ? 50: value
            set((state) => ({ 
                ...state,
                size:mod_size
            }))
            get().getApps()
        },
        filterApp: () =>{
            let renderData
            if (get().filter != ''){
                renderData=get().apps.filter(item => {
                   return item.name.toLowerCase().includes(get().filter.toLowerCase()) 
                })
            }else{
                renderData = get().apps
            }
            set((state)=>({
                ... state,
                filtered_apps : renderData
            }))
        },
        patchApp: async (data) => { 
            let token = useLogInStore.getState().access_token;
            await  blueClient.request({
                   method: 'PATCH',
                   url: `/apps/${data?.id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
                   data: data
               }).then(function (response) {           
                    get().getSingleApp(data?.id)
                    get().getApps()
                 }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
            },
        postApp: async (data) => { 
                let token = useLogInStore.getState().access_token;
                await  blueClient.request({
                       method: 'POST',
                       url: `/apps`,
                       headers: {
                           'Content-Type': 'application/json',
                           'X-APP-TOKEN' : token
                       },
                       data: data
                   }).then(function (response) {               
                        get().getApps()
                         
                     }).catch((response,error)=> {
                           console.log(response)
                           const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                           toast.error(responseError,{
                               position: 'top-right'
                             })
                          
                       });
                },
        deleteApp: async (id) => { 
                    let token = useLogInStore.getState().access_token;
                    await  blueClient.request({
                           method: 'DELETE',
                           url: `/apps/${id}`,
                           headers: {
                               'Content-Type': 'application/json',
                               'X-APP-TOKEN' : token
                           },
                       }).then(function (response) {           
                            get().getApps()
                         }).catch((response,error)=> {
                               const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                               toast.error(responseError,{
                                   position: 'top-right'
                                 })
                              
                           });
                    },
        activateDeactivate: async (id,status) => {
            let token = useLogInStore.getState().access_token;
           
         await   blueClient.request({
                method: 'PUT',
                url: `/apps/${id}?active=${status.toString()}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : token
                },
            }).then(function (response) {
                console.log(response)
                get().getApps()
                get().getSingleApp(id)
                }).catch((response,error)=> {
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        },
        
        }),
        
)