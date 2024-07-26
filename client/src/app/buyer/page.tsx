"use client"
import axiosInstance from '@/axiosInstance'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const buyer = () => {

  const {push} = useRouter();



  useEffect(()=>{

    const user = async()=>{
      try {
        const response = await axiosInstance.get("/api/parcels/get-user",{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json",
            },
        })
  
        if(response.data.success){
            if(response.data.user.role=="buyer"){
                push("/buyer")
            }
            if(response.data.user.role=="seller"){
                push("/seller")
            }
            if(response.data.user.role=="delivery"){
                push("/service")
            }
        }
        else{
          push("/")
        }
      
   } catch (error) {
     console.log(error);
   }

    }

    user();

 
  },[])




  return (
    <div>buyer</div>
  )
}

export default buyer