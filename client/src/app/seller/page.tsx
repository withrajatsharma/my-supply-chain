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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DrawerBox from "@/components/DrawerBox"

export default function Home() {

  

    const {push} = useRouter();

  const [parcelCount, setParcelCount] = useState(0);
  const [parcelId , setParcelId] = useState("");

  const [parcel,setParcel] = useState({
    name:"",
    description:"",
    location:"",
    service:"",
    checkPoints :0,
    allLocations : [""],
  });


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
        else{
          push("/")
        }
      
   } catch (error) {
     console.log(error);
   }

    }

    user();

    getCount();
  }, []);

  // const getParcelHistory = async () =>{

  //   // @ts-ignore
  //   const accounts = await web3.eth.getAccounts();
  //  const address = await supplyChain.methods.getParcelHistory(
  //   0
  //   ).send({ from: accounts[0] });

  //   console.log(address);

  // }

      // @ts-ignore
      const checkParcelStatus = async (e) =>{
        // e.preventDefault();
    
    // @ts-ignore
    const accounts = await web3.eth.getAccounts();
        const details = await supplyChain.methods.getParcelDetails(
          parcelId
        ).call({from: accounts[0]});
    
        console.log(parseInt(details.latestCheckpoint));
        setParcel({
            name:details.name,
            description:details.description,
            location:details.location,
            service:details.service,
            checkPoints :  parseInt(details.checkpointCount.toString()),
            allLocations :details.allLocations ,
        })
    
    }
    
 
  

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-xl font-bold mb-10">
          Total Parcels: {parcelCount}{" "}
        </h1>

        <RegisterParcel parcelCount />

        <div className="flex gap-2 mt-10 items-center justify-center">

        <Input
        className=" border-zinc-300"
          placeholder="enter parcel id"
          value={parcelId}
          onChange={(e)=>setParcelId(e.target.value)}
        >
        </Input>

        {/* <Button onClick={checkParcelStatus} >
            check parcel status
        </Button> */}

        <DrawerBox parcel={parcel} checkParcelStatus={checkParcelStatus} />


        </div>

        {/* <div >
            
        </div> */}

      </div>
    </main>
  );
}
