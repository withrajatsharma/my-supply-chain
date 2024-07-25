
"use client"
import React from 'react'

// @ts-ignore
import web3 from '../../../services/web3';
import supplyChain from "../../../services/supplyChain";

const page = () => {



    const handletransferParcel = async() => {
        try {
            
        
            // @ts-ignore
            const accounts = await web3.eth.getAccounts();
            await supplyChain.methods.transferParcel(
                0,
                1
            ).send({ from: accounts[0] });
            
            // console.log('response:', response);
        } catch (error) {
            console.error('Error fetching parcel details:', error);
        }

    }
    
  


  return (
    // <div>
       <button onClick={handletransferParcel}>
        transfer Parcel
       </button>
    // </div>

    
  )
}

export default page