"use client"

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";

const Confirm = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem, addItem } = useCartStore();

  //-----------------------------extrahování dat--------------------------------

  type CartItem = {
    productName: string;
    quantity: number;
    tax: number;
    price: number;
  };

  type CheckoutData = {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    carrier: string;
    zasilkovna_ID: String;
    postCode: String;
    deliveryAddress: string;
    invoiceAddress: string;
    payType: string;
    payId: string; // tady možná změnit, protože payID beru od platební brány
    payStatus: string;
    status: string;
    cartItems: CartItem[];

    cenaDopravy: Number;
  };

  const [data, setData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const checkoutData = localStorage.getItem('checkoutData');
    if (checkoutData) {
        setData(JSON.parse(checkoutData));
    }
  }, []);

  // --------------------------------------------------------------------------

  //--------------------------------Platba-------------------------------------
  // TEMPORARY 3 ČÁSTI PLATBY
  // skládá se z 3 částí: init, createOrder, process
  // init - zahájení platby - vrátí payId a dttm
  // createOrder - vytvoření objednávky - vytvoří objednávku v databázi - vrátí ok
  // process - zpracování platby - zpracuje platbu - vrátí taky paidId a podpis
  // pak složím url z payId, dttm a podpisu a přesměruji na platební bránu

  // Nový přístup - 4 části
  // getOrderNumber
  // init
  // createOrder
  // process

  // další přístup
  // createOrder - vrátí orderNO
  // getPayId - ??
  // init - sem hodím orderNO
  // process
  
  const handleCreateOrder = async () => {
    
    //test
    try {
          const res = await fetch('https://api.wapit.cz/api/Shop/createOrder', {
              method:"PUT",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify({
                "name": data?.name,
                "lastName": data?.lastName,
                "phone": data?.phone,
                "email": data?.email,
                "carrier": data?.carrier,
                "zasilkovna_ID": data?.zasilkovna_ID,
                "postCode": data?.postCode,
                "deliveryAddress": data?.deliveryAddress,
                "invoiceAddress": data?.invoiceAddress,
                "payType": data?.payType,
                "payStatus": data?.payStatus,
                "status": data?.status,
                "cartItems": data?.cartItems,
              }),
            })
        
            if (!res.ok) {
                  throw new Error('Chyba při odesílání dat / Chyba při vytváření objednávky');
            }
        
            const responseData = await res.json();
            //console.log(responseData);

            handlePaymentInit(responseData.toString());
          
        } catch (err) {
            console.error(err)
        }
        console.log(data)
          
    }

  const handlePaymentInit = async (Id: string) => {

    console.log(Id);

    const payData = {
      "merchantId": "A5191cWVB1",
      "orderNo": Id,
      "totalAmount": ((Number((cart as any).subtotal?.amount) || 0) + Number(data?.cenaDopravy || 0)) * 100,
      "currency": "CZK",
      "returnUrl": `https://wapit.cz/pokladna/${Id}`,
      "itemName": "Košík",
      "language": "cs",
      "signature": "null",
    }
    //console.log(payData)

    try {
      const res = await fetch('https://api.wapit.cz/api/Payment/init', {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(payData),
      })

      if (!res.ok) {
          throw new Error('Chyba při odesílání dat v inicializaci platby');
      }

      const data = await res.json();
      //console.log("success");
      //console.log(data.payId);
      
      handleAddPayId(Id, data.payId, data.dttm);

    } catch (err) {
        console.error(err)
    }

  }

  const handleAddPayId = async (Id: string, payId: string, dttm: number) => {

    try {
      const res = await fetch('https://api.wapit.cz/api/Shop/addPayId', {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          "id": Number(Id), 
          "payId": payId,
        }),
      })

      if (!res.ok) {
          throw new Error('Chyba při odesílání dat');
      }

      //console.log("success2");

      handlePaymentProcess(payId, dttm);
      
    } catch (err) {
      console.error(err)
    }

  }
    
    const handlePaymentProcess = async (payId: string, dttm: number) => {
        try {
          const res = await fetch('https://api.wapitshop.vercel.app/api/Payment/process', {
              method:"POST",
              headers:{"Content-Type": "application/json"},
              body: JSON.stringify({
                  "dttm": dttm,
                  "payId": payId,
              }),
          })

          if (!res.ok) {
              throw new Error('Chyba při odesílání dat');
          }

          const responseData = await res.json();

          const url = `https://iapi.iplatebnibrana.csob.cz/api/v1.9/payment/process/A5191cWVB1/${payId}/${dttm}/${responseData.signature}`
          window.location.href = url;

        } catch (err) {
            console.log(err)
        }
    }

    //----------------------------------------------------------------------------

  return (
    <div className='flex flex-col justify-between flex-wrap lg:flex-row mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48'>
    {/* Levá část */}
        {data && (
          <div className='flex flex-col w-[60%]'>
              <h2>Kontrola objednávky:</h2>
              <p>Jméno: {data.name}</p>
              <p>Příjmení: {data.lastName}</p>
              <p>Telefon: {data.phone}</p>
              <p>Email: {data.email}</p>
              <p>Dopravce: {data.carrier}</p>
              <p>Doručovací adresa: {data.deliveryAddress}</p>
              <p>Fakturační adresa: {data.invoiceAddress}</p>
              <p>Typ platby: {data.payType}</p>
              <p>ID platby: {data.payId}</p>
              <p>Status platby: {data.payStatus}</p>
              <p>Status objednávky: {data.status}</p>
              <p>Obsah košíku:</p>
              <ul>
                  {data.cartItems.map((item, index) => (
                      <li key={index}>
                          <p>Název: {item.productName}</p>
                          <p>Množství: {item.quantity}</p>
                          <p>Cena: {item.price}</p>
                      </li>
                  ))}
              </ul>

          </div>
        )}

        {/* Pravá část */}
        <div className="w-[30%] lg:sticky">
            <div className="p-6 font-semibold">
                <div className="flex justify-between">
                    <h3 className="">Mezisoučet</h3>
                    <div>{(cart as any).subtotal?.amount || 0} Kč</div>
                </div>
                <div className="flex justify-between">
                    <h3 className="">Doprava</h3>
                    <div>{String(data?.cenaDopravy)} Kč</div>
                </div>
                <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                <div className="flex justify-between mb-6">
                    <h3 className="">Celkem</h3>
                    <div>{(Number((cart as any).subtotal?.amount) || 0) + Number(data?.cenaDopravy || 0)} Kč</div>
                    </div>
                <div className="flex justify-center mb-6">
                        <button
                        className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
                        disabled={isLoading}
                        //onClick={() => handleCreateOrder()}
                        onClick={() => handleCreateOrder()}
                        >
                            Potvrdit
                        </button>
                </div>
                <div className="text-sm mb-4">Přijímáme</div>
                <div className="flex justify-center items-center gap-5">
                    <Image src="/mastercard.png" alt="mastercard" width={60} height={30} className="w-16 h-8"/>
                    <Image src="/visa.png" alt="visa" width={60} height={30} className="w-16 h-8"/>
                    <Image src="/online-platba-kartou.png" alt="online-platba-kartou" width={60} height={40} className="w-20 h-10"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Confirm