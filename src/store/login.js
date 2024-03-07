
import { blueClient } from './client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

import toast from 'react-hot-toast'

export const useLogInStore = create(

    persist(
        (set,get) => ({
        blue_admin_token :false,
        access_token : null,
        refresh_token : null,
        roles: ["Anonymous"],
        user_name: null,
        user_id: null,
        responseError : null,  
        setToken: async (data) => {
         
         await   blueClient.request({
                method: 'POST',
                url: '/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }).then(function (response) {
                
                const access_token = response?.data?.data.access_token
                const refresh_token = response?.data?.data.refresh_token
                const user  = jwtDecode(access_token)


                set((state) => ({ 
                    ...state,
                    blue_admin_token: true ,
                    roles: user?.roles,
                    user_name: user?.email,
                    user_id: user?.uuid,
                    access_token : `Bearer ${access_token}`,
                    refresh_token : refresh_token
                }))
              
                }).catch((response,error)=> {
                    const responseError = response?.data?.details ? response?.data?.details : "Something Went Wrong, Try again"
                    toast.error(responseError,{
                        position: 'top-right'
                      })
                   
                });
        }, 
        resetTokenLogout: () => set({ 
                blue_admin_token: false,
                roles: null,
                user_name: null,
                user_id: null,
                access_token : null,
                refresh_token : null,
                responseError : null,
            }),
        }),
        {
            name: 'login-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)
