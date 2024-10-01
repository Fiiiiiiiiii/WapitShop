"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import Link from "next/link";

const CartModel = ({ setIsCartOpen }: { setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // TEMPORARY
  // const cartItem = true;

  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleClose = () => {
    setIsCartOpen(false);
  };

  // console.log(cart);

  return (
    <div className="w-[380px] absolute p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20" onMouseLeave={handleClose}>
      {!cart.lineItems ? (
        <div className="">Košík je prázdný</div>
      ) : (
        <>
          <h2 className="text-xl">Nákupní košík</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {!cart.lineItems.length && (
              <div className="text-lg">Košík je prázdný</div>
            )}
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="object-contain rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold text-sm">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity}&nbsp;x
                          </div>
                        )}
                        {item.price?.amount},-
                      </div>
                    </div>
                  </div>
                  {/* DESC */}
                  <div className="text-xs text-gray-500">
                    {item.availability?.status}
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">
                      Mnž. {item.quantity}
                    </span>
                    <span
                      className="text-blue-600 text-sm"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Odstranit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Celkem</span>
              <span className="">{(cart as any).subtotal?.amount || 0},-</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Doprava a platba bude u pokladny
            </p>
            <div className="flex justify-center text-sm">
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 w-11/12"
                disabled={isLoading}
              >
                <Link href="/kosik" onClick={handleClose}>Přejít do nákupního košíku</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModel;
