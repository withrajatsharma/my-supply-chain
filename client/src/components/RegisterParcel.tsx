"use client";

import { Command } from 'commander';

import React, { useEffect, useState } from "react";
import { registerParcel } from "../api/index";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getParcelCount } from "../api/index";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// @ts-ignore
import web3 from "../../services/web3";
import supplyChain from "../../services/supplyChain"

// @ts-ignore
const RegisterParcel = ({parcelCount}) => {


  const {push}  = useRouter();
 
  const [code, setCode] = useState(0);


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [numCheckpoints, setNumCheckpoints] = useState();
  const [locations, setLocations] = useState([]);

  // const [name, setName] = useState("phone");
  // const [description, setDescription] = useState("description  of the device");
  // const [location, setLocation] = useState("chandigarh");
  // const [service, setService] = useState("flipkart");
  // const [numCheckpoints, setNumCheckpoints] = useState(4);
  // const [locations, setLocations] = useState(["delhi","haryana","gurgaon","chandigarh"]);

  const [inputValue, setInputValue] = useState("");

  // @ts-ignore
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewLocation();
    }
  };


  
  const addNewLocation = () => {
    if (inputValue.trim() !== "") {
      // @ts-ignore
      setLocations([...locations, inputValue.trim()]);
      setInputValue("");
    }
  };
// @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    // @ts-ignore
    const accounts = await web3.eth.getAccounts();
    await supplyChain.methods.registerParcel(
     name,
     description,
      location,
      service,
      numCheckpoints,
      locations
    ).send({ from: accounts[0] });


    // const x = await supplyChain.methods.getCode().call();

    // setCode(x);

    

    // const data = {
    //   name,
    //   description,
    //   location,
    //   service,
    //   numCheckpoints,
    //   locations,
    // };
    // try {
    //   const response = await registerParcel(data);
    //   console.log("Parcel registered:", response);
    // } catch (error) {
    //   console.error("Error registering parcel:", error);
    // }

    // push('/buyer');
  };

  // const getCode=async()=>{
    
  //   const x = await supplyChain.methods.getCode().call();
  //   console.log(x);
  //   // setCode(x);

  // }

  return (

    <div>

   
   
    <Card className="  w-[50vw] flex justify-center items-center ">
      <form >
        <CardHeader>
          <CardTitle>Register Parcel</CardTitle>
          <CardDescription>
            Register your new parcel in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent className='' >
          <div className=" flex justify-center gap-20 ">
            <div className='w-[20vw] flex flex-col gap-4'>
              <div className="flex flex-col space-y-1.5 ">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name of your parcel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="desc">Description</Label>
                <Input
                  type="text"
                  id="desc"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="loc">Location</Label>
                <Input
                  type="text"
                  id="loc"
                  placeholder="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className=' w-[20vw] flex flex-col gap-4'>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="service">Service</Label>
                <Input
                  type="text"
                  id="service"
                  placeholder="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cp">checkPoints</Label>
                <Input
                  type="number"
                  id="cp"
                  placeholder="checkpoints"
                  value={numCheckpoints}
                  // @ts-ignore
                  onChange={(e) => setNumCheckpoints(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="locations">all location</Label>

               

                <Input
                  type="text"
                  id="locations"
                  placeholder="locations"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeydown}
                />

{locations && (
                  <div className="flex  justify-center gap-0 flex-wrap ">
                    {locations.map((location, index) => (
                      <span
                        key={index}
                        className="  text-sm text-slate-900 bg-slate-100 py-1 mt-4  rounded"
                      >
                        {location}--
                      </span>
                    ))}
                  </div>
                )}

              </div>

              <div></div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleSubmit} >Register</Button>
        </CardFooter>
      </form>
    </Card>

    

                {/* <div
                onClick={getCode}
                >
                  code : {code}</div> */}


    </div>


  );
};

export default RegisterParcel;
