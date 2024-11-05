"use client"

import ReturnUrl from '@/components/ReturnUrl'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

const ReturnUrlSlug = () => {

    const pathname = usePathname();
    const [isSuccess, setIsSuccess] = useState(false);

    const wixClient = useWixClient();
    const { cart, isLoading, removeItem, removeAllItem } = useCartStore();

    useEffect(() => {
        handlePaymentStatus();
    }, [pathname])

    const handlePaymentStatus = async () => {

        const segments = pathname.split('/');
        const lastSegment = segments[segments.length - 1];
  
        try {
          const res = await fetch('https://api.wapit.cz/api/Payment/status', {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
              "dttm": null, 
              "payId": lastSegment,
            }),
          })
    
          if (!res.ok) {
              throw new Error('Chyba při odesílání dat');
          }
    
          console.log("success: odpověd serveru je 200");
          setIsSuccess(true); 
          removeAllItem(wixClient);
          
        } catch (err) {
          console.error(err)
          setIsSuccess(false);
        }
    
    }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-16">
      {isSuccess ? ( 
        <div className="text-2xl font-bold">
          Děkujeme za objednávku. Fakturu jsme Vám odeslali na email.
        </div>
      ) : (
        <div className="text-2xl font-bold flex gap-2">
          <p>Čekáme na potvrzení platby</p>
          <Image src="/spinner_gear.svg" alt="spinner" width={20} height={20} className="w-8 h-8"/>
        </div>
      )}
    </div>
  )
}

export default ReturnUrlSlug
