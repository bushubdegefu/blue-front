
import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import toast from 'react-hot-toast'
import { useLogInStore } from './login'

export const useUserStore = create(
   
        (set,get) => ({
        user : null,
        users : [],
        filter: "",
        total:0,
        pages:1,
        page:1,
        size:15,
        filtered_users: [],
        getUsers: async () => {
         let token = useLogInStore.getState().access_token;
         await   blueClient.request({
                method: 'GET',
                url: `/users?page=${get().page}&size=${get().size}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : token
                },
            }).then(function (response) {               
                set((state) => ({ 
                    ...state,
                    users: response?.data?.data,
                    filtered_users : response?.data?.data,
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
        getSingleUser: async (id) => {
            let token = useLogInStore.getState().access_token;
            await   blueClient.request({
                   method: 'GET',
                   url: `/users/${id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  set((state) => ({ 
                       ...state,
                       user: response?.data?.data,
                       
                   }))
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        addUserRole: async (user_id,role_id) => {
            let token = useLogInStore.getState().access_token;
            await   blueClient.request({
                   method: 'POST',
                   url: `/userrole/${user_id}/${role_id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                    console.log(response)
                  get().getSingleUser(user_id)
                    
                   }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
           },
        deleteUserRole: async (user_id,role_id) => {
            let token = useLogInStore.getState().access_token;
            await   blueClient.request({
                   method: 'DELETE',
                   url: `/userrole/${user_id}/${role_id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
               }).then(function (response) {
                  get().getSingleUser(user_id)
                    
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
            get().filterUser()
        }, 
        setPage: (value)=> {
            set((state) => ({ 
                ...state,
                page: value
            }))
            get().getUsers()
        },
        setSize: (value)=> {
            let mod_size = value > 50 ? 50: value
            set((state) => ({ 
                ...state,
                size:mod_size
            }))
            get().getUsers()
        },
        filterUser: () =>{
            let renderData
            if (get().filter != ''){
                renderData=get().users.filter(item => {
                   return item.email.toLowerCase().includes(get().filter.toLowerCase()) 
                })
            }else{
                renderData = get().users
            }
            set((state)=>({
                ... state,
                filtered_users : renderData
            }))
        },
        activeUserCounts: () =>{
            let renderData
                renderData=get().users.filter(item => {
                   return item.disabled.toString().toLowerCase().includes("false") 
                })
                let bottom = get().size > get().total ? get().total : get().size
                 
            let percentage =(renderData.length/bottom) * 100 
            return percentage.toFixed(2)
            
        },
        patchUser: async (data) => { 
            console.log(data)
            let token = useLogInStore.getState().access_token;
            await  blueClient.request({
                   method: 'PATCH',
                   url: `/users/${data?.id}`,
                   headers: {
                       'Content-Type': 'application/json',
                       'X-APP-TOKEN' : token
                   },
                   data: data
               }).then(function (response) { 
                               
                    get().getSingleUser(data?.id)
                    get().getUsers()
                 }).catch((response,error)=> {
                       const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                       toast.error(responseError,{
                           position: 'top-right'
                         })
                      
                   });
            },
        postUser: async (data) => { 
                let token = useLogInStore.getState().access_token;
                await  blueClient.request({
                       method: 'POST',
                       url: `/users`,
                       headers: {
                           'Content-Type': 'application/json',
                           'X-APP-TOKEN' : token
                       },
                       data: { "email": data?.email,
                                "password" : data?.password }
                   }).then(function (response) {               
                        get().getUsers()
                         
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
                url: `/users/${id}?status=${status.toString()}`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APP-TOKEN' : token
                },
            }).then(function (response) {
                console.log(response)
                get().getUsers()
                get().getSingleUser(id)
                }).catch((response,error)=> {
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        }

        }),
        
)