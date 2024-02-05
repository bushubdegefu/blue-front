
import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import toast from 'react-hot-toast'
import { useLogInStore } from './login'

export const useRoleStore = create(
   
        (set,get) => ({
        role : null,
        roles : [],
        endpoints: [],
        drop_roles : [],
        filter: "",
        total:0,
        pages:1,
        page:1,
        size:25,
        filtered_roles: [],
        getRoles: async () => {
         let token = useLogInStore.getState().access_token;
         await   blueClient.request({
                method: 'GET',
                url: `/roles?page=${get().page}&size=${get().size}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : `Bearer ${token}`
                },
            }).then(function (response) {               
                set((state) => ({ 
                    ...state,
                    roles: response?.data?.data,
                    filtered_roles : response?.data?.data,
                    total:response?.data?.total,
                    pages: response?.data?.pages
                }))
                  
                  
                }).catch((response,error)=> {
                    // console.log(response)
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        },
        getDropRoles: async () => {
            let token = useLogInStore.getState().access_token;
            await   blueClient.request({
                   method: 'GET',
                   url: `/droproles`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {               
                   set((state) => ({ 
                       ...state,
                       drop_roles: response?.data?.data,
                       
                   }))
                     
                     
                   }).catch((response,error)=> {
                    
                       const responseError = response?.response?.data?.details
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getSingleRole: async (id) => {
            let token = useLogInStore.getState().access_token;
            await   blueClient.request({
                   method: 'GET',
                   url: `/roles/${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       role: response?.data?.data,
                       
                   }))
                    
                   }).catch((response,error)=> {
                       const responseError = response?.response?.data?.details
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getRoleEndpoints: async (id) => {
            let token = useLogInStore.getState().access_token;
            await   blueClient.request({
                   method: 'GET',
                   url: `/role_endpoints?role_id=${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       endpoints: response?.data?.data,
                       
                   }))
                    
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
            get().filterRole()
        }, 
        setPage: (value)=> {
            set((state) => ({ 
                ...state,
                page: value
            }))
            get().getRoles()
        },
        setSize: (value)=> {
            let mod_size = value > 50 ? 50: value
            set((state) => ({ 
                ...state,
                size:mod_size
            }))
            get().getRoles()
        },
        filterRole: () =>{
            let renderData
            if (get().filter != ''){
                renderData=get().roles.filter(item => {
                   return item.name.toLowerCase().includes(get().filter.toLowerCase()) 
                })
            }else{
                renderData = get().roles
            }
            set((state)=>({
                ... state,
                filtered_roles : renderData
            }))
        },
        patchRole: async (data) => { 
            let token = useLogInStore.getState().access_token;
            await  blueClient.request({
                   method: 'PATCH',
                   url: `/roles/${data?.id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
                   data: data
               }).then(function (response) {               
                    get().getSingleRole(data?.id)
                    get().getRoles()
                 }).catch((response,error)=> {
                       const responseError = response?.response?.data?.details
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
            },
        postRole: async (data) => { 
                let token = useLogInStore.getState().access_token;
                await  blueClient.request({
                       method: 'POST',
                       url: `/roles`,
                       headers: {
                           'Content-Type': 'application/json',
                           'X-APP-TOKEN' : `Bearer ${token}`
                       },
                       data: data
                   }).then(function (response) {               
                        get().getRoles()
                         
                     }).catch((response,error)=> {
                           const responseError = response?.response?.data?.details
                           toast.error(responseError,{
                               position: 'top-right'
                             })
                          
                       });
                },
        activateDeactivate: async (id,status) => {
            let token = useLogInStore.getState().access_token;
           
         await   blueClient.request({
                method: 'PUT',
                url: `/roles/${id}?active=${status.toString()}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : `Bearer ${token}`
                },
            }).then(function (response) {
                
                get().getRoles()
                get().getSingleRole(id)
                }).catch((response,error)=> {
                    const responseError = response?.response?.data?.details
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        }

        }),
        
)