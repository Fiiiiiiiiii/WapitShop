"use client"

import ReturnUrl from '@/components/ReturnUrl'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ReturnUrlSlug = () => {

    const pathname = usePathname();

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
    
        console.log("success3");
          
        } catch (err) {
          console.error(err)
        }
    
    }

  return (
    <div className='h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-16'>
      <div className='text-2xl font-bold'>
        Děkujeme za objednávku. Fakturu jsme Vám odeslali na email.
      </div>
    </div>
  )
}

export default ReturnUrlSlug
