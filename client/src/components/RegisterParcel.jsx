"use client";
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

import web3 from "../../services/web3";
import supplyChain from "../../services/supplyChain"


const RegisterParcel = () => {


  const {push}  = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [numCheckpoints, setNumCheckpoints] = useState();
  const [locations, setLocations] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewLocation();
    }
  };

  const addNewLocation = () => {
    if (inputValue.trim() !== "") {
      setLocations([...locations, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await supplyChain.methods.registerParcel(
     name,
     description,
      location,
      service,
      numCheckpoints,
      locations
    ).send({ from: accounts[0] });

    

    const data = {
      name,
      description,
      location,
      service,
      numCheckpoints,
      locations,
    };
    // const data = { name, description, location, service, numCheckpoints, locations: locations.split(',') };
    try {
      const response = await registerParcel(data);
      console.log("Parcel registered:", response);
    } catch (error) {
      console.error("Error registering parcel:", error);
    }

    push('/buyer');
  };

  return (
   
    <Card className=" ">
      <form >
        <CardHeader>
          <CardTitle>Register Parcel</CardTitle>
          <CardDescription>
            Register your new parcel in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" ">
            <div>
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
            <div>
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
                  onChange={(e) => setNumCheckpoints(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="locations">all location</Label>

                {locations && (
                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    {locations.map((location, index) => (
                      <span
                        key={index}
                        className=" flex items-center text-sm text-slate-900 bg-slate-100 py-1 rounded"
                      >
                        {location}--
                      </span>
                    ))}
                  </div>
                )}

                <Input
                  type="text"
                  id="locations"
                  placeholder="locations"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeydown}
                />
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
  );
};

export default RegisterParcel;
