"use client";
import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from './ui/button'
import supplyChain from "../../services/supplyChain"
// @ts-ignore
import web3 from "../../services/web3.js"
  

// @ts-ignore
const drawer = ({parcel,checkParcelStatus}) => {

 


  return (
    <Drawer>
        
     
  <DrawerTrigger
    onClick={checkParcelStatus}
  className=' whitespace-nowrap px-4 hover:bg-zinc-800 py-2 font-thin bg-black rounded-lg text-white' >check parcel status </DrawerTrigger>
       
  <DrawerContent className='px-8 py-5 pb-10'>
    <DrawerHeader>
      <DrawerTitle className='text-4xl font-bold mb-4'>{parcel.name}</DrawerTitle>
      <DrawerDescription className='text-xl'>{parcel.description}</DrawerDescription>
    </DrawerHeader>
    <div className='flex px-4 gap-14 mt-10  justify-between  '>
        <div className='w-1/2 text-lg flex flex-col gap-10 '>
            <p>LOCATION : {parcel.location}</p>
            <p>SERVICE : {parcel.service}</p>
            <p>CHECK POINTS : {parcel.checkPoints}</p>

        </div>


    {/* <div className='w-1/2 flex  items-center'> */}
        <div className='w-1/2 flex flex-col gap-12 pl-10'>
    {/* @ts-ignore */}
        {parcel.allLocations.map((loc,idx)=> <div className='flex justify-center items-center rounded-lg w-[50%] h-12 bg-zinc-900 text-white text-base'>
            {loc}
        </div>)}

           
            
          
        </div>
{/*         
        <div className='bg-red-400 flex flex-col gap-20 '>
           {parcel.allLocations.map((loc,idx)=><p>{loc}</p>)}
        </div> */}
    

        {/* </div> */}
    </div>
    {/* <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter> */}
  </DrawerContent>
</Drawer>

  )
}

export default drawer