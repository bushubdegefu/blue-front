
import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import toast from 'react-hot-toast'
import { useLogInStore } from './login'
import { useFeatureStore } from './feature'

export const useEndPointStore = create(
   
        (set,get) => ({
        endpoint : null,
        endpoints : [],
        drop_endpoints:[],
        filter: "",
        total:0,
        pages:1,
        page:1,
        size:15,
        filtered_endpoints: [],
        getEndPoints: async () => {
         let token = useLogInStore.getState().access_token;
         await   blueClient.request({
                method: 'GET',
                url: `/endpoints?page=${get().page}&size=${get().size}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : `Bearer ${token}`
                },
            }).then(function (response) {               
                set((state) => ({ 
                    ...state,
                    endpoints: response?.data?.data,
                    filtered_endpoints : response?.data?.data,
                    total:response?.data?.total,
                    pages: response?.data?.pages
                }))
                  
                  
                }).catch((response,error)=> {
                    const responseError = response?.response?.data?.details
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        },
        getDropEndPoints: async () => {
            let token = useLogInStore.getState().access_token;

            await   blueClient.request({
                   method: 'GET',
                   url: `/endpointdrop`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) { 

                   set((state) => ({ 
                       ...state,
                       drop_endpoints: response?.data?.data,
                       
                   }))
                     
                     
                   }).catch((response,error)=> {
                       const responseError = response?.response?.data?.details
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getSingleEndPoint: async (id) => {
            let token = useLogInStore.getState().access_token;
            
            await   blueClient.request({
                   method: 'GET',
                   url: `/endpoints/${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       endpoint: response?.data?.data,
                       
                   }))
                    
                   }).catch((response,error)=> {
                       const responseError = response?.response?.data?.details
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        addEndPointFeature: async (endpoint_id,id) => {
            let token = useLogInStore.getState().access_token;
            let update_feature= useFeatureStore.getState().getSingleFeature
            await   blueClient.request({
                   method: 'PATCH',
                   url: `/feature_endpoint/${endpoint_id}?feature_id=${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  get().getSingleEndPoint(endpoint_id)
                  update_feature(id)
                    
                   }).catch((response,error)=> {
                       const responseError = response?.response?.data?.details
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        deleteEndPointFeature: async (endpoint_id,id) => {
            let token = useLogInStore.getState().access_token;
            let update_feature =useFeatureStore.getState().getSingleFeature
            await   blueClient.request({
                   method: 'DELETE',
                   url: `/feature_endpoint/${endpoint_id}?feature_id=${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  get().getSingleEndPoint(endpoint_id)
                  update_feature(id)  
                   }).catch((response,error)=> {
                       const responseError = response?.response?.data?.details
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
            get().filterEndPoint()
        }, 
        setPage: (value)=> {
            set((state) => ({ 
                ...state,
                page: value
            }))
            get().getEndPoints()
        },
        setSize: (value)=> {
            let mod_size = value > 50 ? 50: value
            set((state) => ({ 
                ...state,
                size:mod_size
            }))
            get().getEndPoints()
        },
        filterEndPoint: () =>{
            let renderData
            if (get().filter != ''){
                renderData=get().endpoints.filter(item => {
                   return item.name.toLowerCase().includes(get().filter.toLowerCase()) 
                })
            }else{
                renderData = get().endpoints
            }
            set((state)=>({
                ... state,
                filtered_endpoints : renderData
            }))
        },
        patchEndPoint: async (data) => { 
                console.log(data)
            },
        activateDeactivate: async (id,status) => {
            let token = useLogInStore.getState().access_token;
           
         await   blueClient.request({
                method: 'PUT',
                url: `/endpoints/${id}?active=${status.toString()}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : `Bearer ${token}`
                },
            }).then(function (response) {
                console.log(response)
                get().getEndPoints()
                get().getSingleEndPoint(id)
                }).catch((response,error)=> {
                    const responseError = response?.response?.data?.details
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        }

        }),
        
)