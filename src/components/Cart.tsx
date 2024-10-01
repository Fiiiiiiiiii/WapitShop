"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useState, useEffect } from "react";
import Link from "next/link";

import { CiCircleInfo } from "react-icons/ci";

const Cart = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem, addItem } = useCartStore();

  //   const [totalQuantity, setTotalQuantity] = useState(0);
  //   useEffect(() => {
  //     const totalQuantity = (cart as any)?.lineItems?.reduce(
  //       (sum: number, item: any) => sum + item.quantity,
  //       0
  //     );
  //     setTotalQuantity(totalQuantity);
  //   }, [cart]);

  const calculatePrice = (item: any) => {
    return item.price?.amount! * item.quantity!;
  };

  //console.log(cart);

  return (
    <div className="flex flex-col justify-between flex-wrap lg:flex-row mt-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
      {/* PRODUKTY */}
      <div className="flex flex-col w-[60%] px-6">
        <h2 className="text-3xl mb-6 font-bold">
          Váš nákupní košík (položky: {cart.lineItems?.length})
        </h2>
        {/* ITEM */}
        {cart.lineItems?.map((item) => (
          <div className="flex gap-4 py-6" key={item._id}>
            {item.image && (
              <Image
                src={wixMedia.getImageUrl(item.image).url}
                alt="Image"
                width={180}
                height={240}
                className="object-contain rounded-md"
              />
            )}
            <div className="flex flex-col justify-between gap-3 w-full">
              {/* TOP */}
              <div className="">
                {/* TITLE */}
                <div className="flex items-center justify-between gap-8">
                  <h3 className="font-semibold text-lg">
                    {item.productName?.original}
                  </h3>

                  {/* <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                    {item.quantity && item.quantity > 1 && (
                      <div className="text-xs text-green-500">
                        {item.quantity}&nbsp;x
                      </div>
                    )}
                    {item.price?.amount},-
                  </div> */}
                  {/* <div className="flex bg-gray-100 py-2 px-4 rounded-2xl items-center justify-between w-16">
                    {item.quantity}
                    <div className="flex flex-col">
                        <button className="cursor-pointer text-xl h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                        <button className="cursor-pointer text-xl h-6 items-center justify-center">
                        -
                        </button>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* PRICE */}
              {item.quantity && item.quantity > 1 && (
                <div className="font-medium rounded-sm flex items-center gap-2 text-base">
                  <div className="text-xs text-green-500">
                    {item.quantity}&nbsp;x
                  </div>
                  <div>{item.price?.amount} Kč</div>
                </div>
              )}
              <div className="font-bold rounded-sm flex items-center gap-2 text-xl">
                {calculatePrice(item)} Kč
              </div>
              {/* DESC
              <div className="text-xs text-gray-500">
                {item.availability?.status}
              </div> */}
              {/* BOTTOM */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">
                  Mnž. {item.quantity}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <span
                className="text-blue-600 text-sm"
                style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                onClick={() => removeItem(wixClient, item._id!)}
              >
                Odstranit
              </span>
            </div>
          </div>
        ))}

        <div className="flex items-center pt-20"><CiCircleInfo />&nbsp;Položky v tomto nákupním košíku nejsou rezervovány.</div>
      </div>

      {/* SEČTENÍ CEN */}
      <div className="w-[30%]">
            <div className="py-6 px-6 font-semibold bg-gray-100">
                <div className="flex justify-between">
                    <h3 className="">Mezisoučet</h3>
                    <div>{(cart as any).subtotal?.amount || 0} Kč</div>
                </div>
                <div className="w-full h-[1px] bg-gray-300 my-4"></div>
                <div className="flex justify-between mb-6">
                    <h3 className="">Celkem</h3>
                    <div>{(cart as any).subtotal?.amount || 0} Kč</div>
                </div>
                <div className="flex justify-center mb-6">
                    <Link href="/pokladna" className="w-full">
                      <button
                      className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
                      disabled={isLoading}
                      >
                          Přejít k pokladně
                      </button>
                    </Link>
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
  );
};

export default Cart;
