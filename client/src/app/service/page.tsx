
"use client"
import React, { useState } from 'react'

// @ts-ignore
import web3 from '../../../services/web3';
import supplyChain from "../../../services/supplyChain";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DrawerBoxService from "@/components/DrawerBoxService"

const page = () => {


    const [parcelId , setParcelId] = useState("");
    const [detail,setDetail] = useState(false);
    

    const handletransferParcel = async() => {
        try {
            
             // @ts-ignore
    const accounts = await web3.eth.getAccounts();
    const details = await supplyChain.methods.getParcelDetails(
      parcelId
    ).call({from: accounts[0]});

   

    
   
if(!(parseInt(details.latestCheckpoint)+1 === parseInt(details.checkpointCount))){
// @ts-ignore
            // const accounts = await web3.eth.getAccounts();
            await supplyChain.methods.transferParcel(
              parcelId,
              parseInt(details.latestCheckpoint)+1

          ).send({ from: accounts[0] });
}else{
  setDetail(true);
}


            
            
            // console.log('response:', response);
        } catch (error) {
            console.error('Error fetching parcel details:', error);
        }

    }
    
  


  return (
    <div className='flex p-20  gap-10'>

<Input
        className=" border-zinc-300 w-[30%]"
          placeholder="enter parcel id"
          value={parcelId}
          onChange={(e)=>setParcelId(e.target.value)}
        >
        </Input>

{
  detail?<Button >
  no more check points
</Button>: <Button onClick={handletransferParcel} >
            transfer parcel
        </Button>
}
       
        {/* <Button onClick={handletransferParcel} >
            next check point
        </Button> */}

        <DrawerBoxService parcelId={parcelId} />
    </div>

    
  )
}

export default page