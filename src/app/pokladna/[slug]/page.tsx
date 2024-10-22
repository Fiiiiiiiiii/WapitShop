"use client"

import ReturnUrl from '@/components/ReturnUrl'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReturnUrlSlug = () => {

    const pathname = usePathname();
    const [isSuccess, setIsSuccess] = useState(false);

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
        <div className="text-2xl font-bold">
          Čekáme na potvrzení platby...
        </div>
      )}
    </div>
  )
}

export default ReturnUrlSlug
