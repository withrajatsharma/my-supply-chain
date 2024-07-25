"use client";
import Image from "next/image";
import RegisterParcel from "../components/RegisterParcel";
import { useEffect, useState } from "react";
import supplyChain from "../../services/supplyChain";
import { getParcelCount, getParcelDetails } from "../api/index";
// @ts-ignore
import web3 from "../../services/web3";

export default function Home() {
  const [parcelCount, setParcelCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      // try {
      //   const response = await getParcelCount();
      //   setParcelCount(response.count);
      // } catch (error) {
      //   console.error("Error while getting parcel count:", error);
      // }

     const count =  await supplyChain.methods.getParcelCount().call();

      const no = parseInt(count.toString());

      setParcelCount(no);

    };

    getCount();
  }, []);

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-xl font-bold mb-10">
          Total Parcels: {parcelCount}{" "}
        </h1>

        <RegisterParcel parcelCount />


      </div>
    </main>
  );
}
