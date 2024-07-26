"use client";
import Image from "next/image";
import RegisterParcel from "../../components/RegisterParcel";
import { useEffect, useState } from "react";
import supplyChain from "../../../services/supplyChain";
// import { getParcelCount, getParcelDetails } from "../api/index";
// @ts-ignore
import web3 from "../../../services/web3";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axiosInstance";

export default function Home() {

    const {push} = useRouter();

  const [parcelCount, setParcelCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
     const count =  await supplyChain.methods.getParcelCount().call();
      const no = parseInt(count.toString());
      setParcelCount(no);

    };
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
        
     } catch (error) {
       console.log(error);
     }
  
      }
  
      user();

    getCount();
  }, []);

  const getParcelHistory = async () =>{

    // @ts-ignore
    const accounts = await web3.eth.getAccounts();
   const address = await supplyChain.methods.getParcelHistory(
    0
    ).send({ from: accounts[0] });

    console.log(address);

  }

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-xl font-bold mb-10">
          Total Parcels: {parcelCount}{" "}
        </h1>

        <RegisterParcel parcelCount />


        {/* <div onClick={getParcelHistory}>
          get parcel history
        </div> */}


      </div>
    </main>
  );
}
