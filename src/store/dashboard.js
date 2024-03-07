import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toast from 'react-hot-toast'
import { useLogInStore } from './login'

export const useDashBoardStore = create(
    persist(
    (set,get) => ({
    app_id :"48015a9b-5a86-4a15-944b-94108aa78b4b",
    app_role_features : null,
    app_pages : null,
    role_pages: null,
    getDashboardFeatures: async () => {
     let token = useLogInStore.getState().access_token;
     await   blueClient.request({
            method: 'GET',
            url: `/dashboardfeat?app_id=${get().app_id}`,
            headers: {
                'Content-Type': 'application/json',
                'X-APP-TOKEN' : token
            },
        }).then(function (response) {               
            set((state) => ({ 
                ...state,
                app_role_features: response?.data?.data,
            }))          
              
            }).catch((response,error)=> {
                const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"               
            });
    },
    getDashboardPages: async () => {
        let token = useLogInStore.getState().access_token;
        await   blueClient.request({
               method: 'GET',
               url: `/dashboardpages?app_id=${get().app_id}`,
               headers: {
                   'Content-Type': 'application/json',
                   'X-APP-TOKEN' : token
               },
           }).then(function (response) {               
               set((state) => ({ 
                   ...state,
                   app_pages: response?.data?.data,
               }))             
                 
               }).catch((response,error)=> {
                   const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
        
                  
               });
       },
    getRolePages: async () => {
        let token = useLogInStore.getState().access_token;
        await   blueClient.request({
               method: 'GET',
               url: `/dashboardrolespage?app_id=${get().app_id}`,
               headers: {
                   'Content-Type': 'application/json',
                   'X-APP-TOKEN' : token
               },
           }).then(function (response) {               
               set((state) => ({ 
                   ...state,
                   role_pages: response?.data?.data,
               }))
            
                 
               }).catch((response,error)=> {
                //    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                  
               });
       }
    

    }),
    {
        name: 'dash-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
    )  
)