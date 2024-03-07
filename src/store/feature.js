
import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import toast from 'react-hot-toast'
import { useLogInStore } from './login'
import { useRoleStore } from './role'

export const useFeatureStore = create(
   
        (set,get) => ({
        feature : null,
        features : [],
        drop_features:[],
        filter: "",
        total:0,
        pages:1,
        page:1,
        size:15,
        filtered_features: [],
        getFeatures: async () => {
         let token = useLogInStore.getState().access_token;
         await   blueClient.request({
                method: 'GET',
                url: `/features?page=${get().page}&size=${get().size}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : token
                },
            }).then(function (response) {               
                set((state) => ({ 
                    ...state,
                    features: response?.data?.data,
                    filtered_features : response?.data?.data,
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
        getDropFeatures: async () => {
            let token = useLogInStore.getState().access_token;

            await   blueClient.request({
                   method: 'GET',
                   url: `/featuredrop`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) { 

                   set((state) => ({ 
                       ...state,
                       drop_features: response?.data?.data,
                       
                   }))
                     
                     
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getSingleFeature: async (id) => {
            let token = useLogInStore.getState().access_token;
            
            await   blueClient.request({
                   method: 'GET',
                   url: `/features/${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       feature: response?.data?.data,
                       
                   }))
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        addFeatureRole: async (feature_id,role_id) => {
            let token = useLogInStore.getState().access_token;
            let update_role= useRoleStore.getState().getSingleRole
            await   blueClient.request({
                   method: 'PATCH',
                   url: `/featuresrole/${feature_id}?role_id=${role_id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  get().getSingleFeature(feature_id)
                  update_role(role_id)
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        deleteFeatureRole: async (feature_id,role_id) => {
            let token = useLogInStore.getState().access_token;
            let update_role =useRoleStore.getState().getSingleRole
            await   blueClient.request({
                   method: 'DELETE',
                   url: `/featuresrole/${feature_id}?role_id=${role_id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  get().getSingleFeature(feature_id)
                  update_role(role_id)  
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
            get().filterFeature()
        }, 
        setPage: (value)=> {
            set((state) => ({ 
                ...state,
                page: value
            }))
            get().getFeatures()
        },
        setSize: (value)=> {
            let mod_size = value > 50 ? 50: value
            set((state) => ({ 
                ...state,
                size:mod_size
            }))
            get().getFeatures()
        },
        filterFeature: () =>{
            let renderData
            if (get().filter != ''){
                renderData=get().features.filter(item => {
                   return item.name.toLowerCase().includes(get().filter.toLowerCase()) 
                })
            }else{
                renderData = get().features
            }
            set((state)=>({
                ... state,
                filtered_features : renderData
            }))
        },
        patchFeature: async (data) => { 
            let token = useLogInStore.getState().access_token;
            await  blueClient.request({
                   method: 'PATCH',
                   url: `/features/${data?.id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
                   data: data
               }).then(function (response) {           
                    get().getSingleFeature(data?.id)
                    get().getFeatures()
                 }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
            },
        postFeature: async (data) => { 
                let token = useLogInStore.getState().access_token;
                await  blueClient.request({
                       method: 'POST',
                       url: `/features`,
                       headers: {
                           'Content-Type': 'application/json',
                           'X-APP-TOKEN' : token
                       },
                       data: data
                   }).then(function (response) {               
                        get().getFeatures()
                         
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
                url: `/features/${id}?active=${status.toString()}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : token
                },
            }).then(function (response) {
                
                get().getFeatures()
                get().getSingleFeature(id)
                }).catch((response,error)=> {
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        }

        }),
        
)