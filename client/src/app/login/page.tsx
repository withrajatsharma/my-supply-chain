'use client';

import React, { useContext, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/axiosInstance";
import { useRouter } from "next/navigation";


const Login = () => {

    const {push} = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

//   @ts-ignore
  const handleLogin = async (e) => {

      e.preventDefault();
    const response = await axiosInstance.post("/api/parcels/login",{
        email:email,
        password:password
    },{
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

  };

  return (
    <>
      <div className="flex items-center justify-center sm:justify-evenly flex-row-reverse mt-20 sm:mt-28 ">
        <div
        
          className="md:w-96 w-[90vw] md:max-w-96 max-w-80  rounded bg-white px-7 py-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <form >
            <h4 className="text-2xl mb-7">Login</h4>

            <div className="flex flex-col gap-4">

            <Input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
            />

</div>


            {/* {error && <p className=" text-red-500 text-xs pb-1">{error}</p>} */}

            <Button onClick={handleLogin} className="mt-8 w-full">
              Login
            </Button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link href="/signup" className="font-semibold text-black underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>

      </div>
    </>
  );
};

export default Login;
