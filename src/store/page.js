
import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import toast from 'react-hot-toast'
import { useLogInStore } from './login'
import { useRoleStore } from './role'

export const usePageStore = create(
   
        (set,get) => ({
        page : null,
        pages_list : [],
        drop_pages:[],
        filter: "",
        total:0,
        pages:1,
        page_num:1,
        size:15,
        filtered_pages: [],
        getPages: async () => {
         let token = useLogInStore.getState().access_token;
         await   blueClient.request({
                method: 'GET',
                url: `/pages?page=${get().page_num}&size=${get().size}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : `Bearer ${token}`
                },
            }).then(function (response) {               
                set((state) => ({ 
                    ...state,
                    pages_list: response?.data?.data,
                    filtered_pages : response?.data?.data,
                    total:response?.data?.total,
                    pages: response?.data?.pages
                }))
                                    
                }).catch((response,error)=> {
                    console.log(response)
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        },
        getDropPages: async () => {
            let token = useLogInStore.getState().access_token;

            await   blueClient.request({
                   method: 'GET',
                   url: `/pagedrop`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) { 

                   set((state) => ({ 
                       ...state,
                       drop_pages: response?.data?.data,
                       
                   }))
                     
                     
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        getSinglePage: async (id) => {
            let token = useLogInStore.getState().access_token;
            
            await   blueClient.request({
                   method: 'GET',
                   url: `/pages/${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       page: response?.data?.data,
                       
                   }))
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        addPageRole: async (page_id,id) => {
            let token = useLogInStore.getState().access_token;
            let update_role= useRoleStore.getState().getSingleRole
            await   blueClient.request({
                   method: 'PATCH',
                   url: `/pagesroles/${page_id}?role_id=${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  get().getSinglePage(page_id)
                  update_role(id)
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        deletePageRole: async (page_id,id) => {
            let token = useLogInStore.getState().access_token;
            let update_role =useRoleStore.getState().getSingleRole
            await   blueClient.request({
                   method: 'DELETE',
                   url: `/pagesroles/${page_id}?role_id=${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
               }).then(function (response) {
                  get().getSinglePage(page_id)
                  update_role(id)  
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
            get().filterPage()
        }, 
        setPage: (value)=> {
            set((state) => ({ 
                ...state,
                page_num: value
            }))
            get().getPages()
        },
        setSize: (value)=> {
            let mod_size = value > 50 ? 50: value
            set((state) => ({ 
                ...state,
                size:mod_size
            }))
            get().getPages()
        },
        filterPage: () =>{
            let renderData
            if (get().filter != ''){
                renderData=get().pages_list.filter(item => {
                   return item.name.toLowerCase().includes(get().filter.toLowerCase()) 
                })
            }else{
                renderData = get().pages_list
            }
            set((state)=>({
                ... state,
                filtered_pages : renderData
            }))
        },
        patchPage: async (data) => { 
            let token = useLogInStore.getState().access_token;
            await  blueClient.request({
                   method: 'PATCH',
                   url: `/pages/${data?.id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : `Bearer ${token}`
                   },
                   data: data
               }).then(function (response) {           
                    get().getSinglePage(data?.id)
                    get().getPages()
                 }).catch((response,error)=> {
                       console.log(error)
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
            },
        postPage: async (data) => { 
                let token = useLogInStore.getState().access_token;
                await  blueClient.request({
                       method: 'POST',
                       url: `/pages`,
                       headers: {
                           'Content-Type': 'application/json',
                           'X-APP-TOKEN' : `Bearer ${token}`
                       },
                       data: data
                   }).then(function (response) {               
                        get().getPages()
                         
                     }).catch((response,error)=> {
                           const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                           toast.error(responseError,{
                               position: 'top-right'
                             })
                          
                       });
                },
        deletePage: async (id) => { 
                    let token = useLogInStore.getState().access_token;
                    await  blueClient.request({
                           method: 'DELETE',
                           url: `/pages/${id}`,
                           headers: {
                               'Content-Type': 'application/json',
                               'X-APP-TOKEN' : `Bearer ${token}`
                           },
                       }).then(function (response) {           
                            get().getPages()
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
                url: `/pages/${id}?active=${status.toString()}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : `Bearer ${token}`
                },
            }).then(function (response) {
                console.log(response)
                get().getPages()
                get().getSinglePage(id)
                }).catch((response,error)=> {
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        }

        }),
        
)