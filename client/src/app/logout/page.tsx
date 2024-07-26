"use client";
import axiosInstance from '@/axiosInstance';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {

    const {push} = useRouter();
  
    useEffect(()=>{

        const logout = async()=>{
            try {
              await axiosInstance.get("/api/parcels/logout",{
                  withCredentials:true,
                  headers:{
                      "Content-Type":"application/json",
                  },
              })
                
              push("/");
            
         } catch (error) {
           console.log(error);
         }
      
          }
      
          logout();
          
          
    },[]);

}

export default page